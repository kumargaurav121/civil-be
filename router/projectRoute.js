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
      join rooms r on p.id = r.project_id
      join clients c on c.id = p.client_id
      where r.user_id = 1;`;

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
