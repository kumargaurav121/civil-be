const router = require("express").Router();
const configs = require("dotenv");
const passport = require("passport");

const { validSubscription } = require("../validation/subscriptionValidation");
const { addProjectValidation } = require("../validation/projectValidation");
const { validateLimit } = require("../utils/fieldChecks");

configs.config();

// MySQL Connection
const connection = require("../config/mysqlConfig");

// Routers
router.post(
  "/add",
  passport.authenticate("jwt", { session: false }),
  validSubscription,
  addProjectValidation,
  async (req, res) => {
    let {
      name,
      description,
      status,
      client_id,
      client_name,
      client_add,
      client_ph,
      client_email,
    } = req.body;
    console.log(req.body);

    // Check if client id present, if not then create client
    if (!client_id) {
      try {
        [rows, fields] =
          await connection.query(`INSERT INTO clients(user_id, name, email, phone, address) VALUES
                                                    ('${req.user.id}', '${client_name}', '${client_email}', '${client_ph}', '${client_add}')`);
        client_id = rows.insertId;
      } catch (e) {
        return res.status(400).send({
          success: false,
          message: "Can't create the client",
          error: e,
        });
      }
    }

    // Add Project
    try {
      [rows2, fields2] =
        await connection.query(`INSERT INTO projects(user_id, name, description, status, client_id) VALUES
                                                ('${req.user.id}', '${name}', '${description}', '${status}', ${client_id})`);

      if (!rows2.insertId || rows2.insertId < 0) {
        return res.status(400).send({
          success: false,
          message: "Can't create the project",
          error: "Can't create the project",
        });
      }
    } catch (e) {
      return res.status(400).send({
        success: false,
        message: "Can't create the project",
        error: e,
      });
    }

    // Deduct Credit
    try {
      [rows3, fields3] = await connection.query(
        `UPDATE credits SET credit_count = credit_count-1 where user_id = ${req.user.id}`
      );

      if (!rows3.affectedRows || rows2.affectedRows < 0) {
        return res.status(400).send({
          success: false,
          message: "Can't update the credit score",
          error: "Can't update the credit score",
        });
      }
    } catch (e) {
      return res.status(400).send({
        success: false,
        message: "Can't update the credit score",
        error: e,
      });
    }

    return res.status(201).send({
      success: true,
      message: name + " is registered as a new Project",
      error: null,
    });
  }
);

router.get(
  "/list",
  passport.authenticate("jwt", { session: false }),
  validSubscription,
  async (req, res) => {
    let { limit, offset } = validateLimit(req.query);
    let status = req.query.status;
    let query = null;

    if (!status) {
      status = "Pitched";
    }
    query = `SELECT * FROM projects WHERE status = '${status}' LIMIT ${offset}, ${limit}`;
    if (status == "All") {
      query = `SELECT * FROM projects LIMIT ${offset}, ${limit}`;
    }

    try {
      [rows, fields] = await connection.query(query);
      return res.status(201).send({
        success: true,
        message: "Projects list fetched!",
        clients: rows,
        error: null,
      });
    } catch (e) {
      return res
        .status(400)
        .send({ success: false, message: "Something went wrong", error: e });
    }
  }
);

router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    let project_id = req.params.id;

    try {
      query_for_project_id = `SELECT * FROM projects WHERE id = ${project_id}`;
      [rows, fields] = await connection.query(query_for_project_id);

      if (rows.length === 0) {
        return res
          .status(404)
          .send({ success: false, message: "Project not found", error: null });
      }

      query_for_project_details = `SELECT 
      c.id as client_id,
      c.name as client_name,
      c.email as client_email,
      c.address as client_address,
      c.phone as client_phone,
      p.id as project_id,
      p.name as project_name,
      p.status as project_status,
      p.description as project_description,
      r.id as room_id,
      r.name as room_name,
      r.length as room_length,
      r.width as room_width,
      r.height as room_height,
      r.price as room_price,
      r.discount as room_discount,
      r.updated_at as last_update
      from projects p
      join clients c on c.id = p.client_id
      left join rooms r on p.id = r.project_id
      where p.id = ${project_id};`;

      [rows, fields] = await connection.query(query_for_project_details);

      if (rows.length === 0) {
        return res
          .status(404)
          .send({ success: false, message: "Project not found", error: null });
      }

      return res.status(200).send({
        success: true,
        message: "Project rooms list fetched!",
        rooms: rows,
        error: null,
      });
    } catch (e) {
      return res
        .status(400)
        .send({ success: false, message: "Something went wrong", error: e });
    }
  }
);

router.get(
  "/:pid/room/:rid",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    let project_id = req.params.pid;
    let room_id = req.params.rid;

    try {
      query_for_project_id = `SELECT * FROM projects WHERE id = ${project_id}`;
      [rows, fields] = await connection.query(query_for_project_id);

      if (rows.length === 0) {
        return res
          .status(404)
          .send({ success: false, message: "Project not found", error: null });
      }

      query_for_room_id = `SELECT * FROM rooms WHERE id = ${room_id}`;
      [rows1, fields1] = await connection.query(query_for_room_id);

      if (rows1.length === 0) {
        return res
          .status(404)
          .send({ success: false, message: "Room not found", error: null });
      }

      query_for_calculations_details = `SELECT 
      cal.id as id,
      cal.category_id as category_id,
      cal.sub_category_id as sub_category_id,
      c.name as category,
      s.name as sub_category,
      cal.wastage as wastage,
      cal.counts as counts,
      cal.cost_per_unit as cost_per_unit,
      cal.price as price
      FROM calculations cal
      left join category c on cal.category_id = c.id
      left join sub_category s on cal.sub_category_id = s.id
      WHERE cal.room_id = ${room_id};`;

      [rows, fields] = await connection.query(query_for_calculations_details);

      if (rows.length === 0) {
        return res.status(404).send({
          success: false,
          message: "Calculations not found",
          error: null,
        });
      }

      return res.status(200).send({
        success: true,
        message: "Room details fetched!",
        calculations: rows,
        error: null,
      });
    } catch (e) {
      console.log(e);
      return res
        .status(400)
        .send({ success: false, message: "Something went wrong", error: e });
    }
  }
);

router.get(
  "/rooms/calulations/categories",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    let project_id = req.params.pid;
    let room_id = req.params.rid;

    try {
      query = `SELECT
      s.id,
      s.category_id,
      c.name as category_name,
      s.name,
      s.unit
      from sub_category s
      LEFT JOIN category c ON s.category_id = c.id;`;

      [rows, fields] = await connection.query(query);

      if (rows.length === 0) {
        return res
          .status(404)
          .send({ success: false, message: "Categories", error: null });
      }

      let cat_array = []; // {category_name: "xyz", category_id: 1, sub_category_name: "xyz", sub_category_id: 1}

      rows.map((item) => {
        let cat = cat_array.filter(
          (x) => x.category_name === item.category_name
        );
        if (cat.length === 0) {
          cat_array.push({
            category_name: item.category_name,
            category_id: item.category_id,
            sub_category: [
              {
                sub_category_name: item.name,
                sub_category_id: item.id,
                unit: item.unit,
              },
            ],
          });
        } else {
          cat_array.map((row) => {
            if (row.category_name === item.category_name) {
              row.sub_category.push({
                sub_category_name: item.name,
                sub_category_id: item.id,
                unit: item.unit,
              });
            }
          });
        }
      });

      // return res.send(cat_array);

      return res.status(200).send({
        success: true,
        message: "Categories fetched!",
        calculations: cat_array,
        error: null,
      });
    } catch (e) {
      console.log(e);
      return res
        .status(400)
        .send({ success: false, message: "Something went wrong", error: e });
    }
  }
);

router.get(
  "/protected",
  passport.authenticate("jwt", { session: false }),
  validSubscription,
  function (req, res) {
    res.json({
      msg: "Congrats! You are seeing this because you are authorized",
    });
  }
);

module.exports = router;
