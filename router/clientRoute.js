const router = require('express').Router();
const passport = require('passport');

const { addClientValidation, editClientValidation } = require('../validation/clientValidation');
const { validateLimit } = require('../utils/fieldChecks');

// MySQL Connection
const connection = require('../config/mysqlConfig')

// Routers
router.post('/add', passport.authenticate('jwt', { session: false }), addClientValidation, async (req, res) => {
    const {name, email, phone, address} = req.body;

    try{
        [rows, fields] = await connection.query(`INSERT INTO clients(user_id, name, email, phone, address) VALUES
                ('${req.user.id}', '${name}', '${email}', '${phone}', '${address}')`)
        return res.status(201).send({"success": true, "message": name + " is registered as client", "error": null});
    } catch (e) {
        return res.status(400).send({"success": false, "message": "Something went wrong", "error": e});
    }

});

router.get('/list', passport.authenticate('jwt', { session: false }), async (req, res) => {
    let {limit, offset} = validateLimit(req.query);
    
    try{
        [rows, fields] = await connection.query(`SELECT * FROM clients limit ${offset}, ${limit}`)
        return res.status(201).send({"success": true, "message": "Client list fetched!", clients: rows, "error": null});
    } catch (e) {
        return res.status(400).send({"success": false, "message": "Something went wrong", "error": e});
    }

});

router.patch('/edit', passport.authenticate('jwt', { session: false }), editClientValidation, async (req, res) => {
    
    try{
        [rows, fields] = await connection.query(`SELECT * FROM clients where id = ${req.body.id}`)
        data = rows[0];
        let name = req.body.name || data.name;
        let email = req.body.email || data.email;
        let phone = req.body.phone || data.phone;
        let address = req.body.address || data.address;

        [rows1, fields1] = await connection.query(`UPDATE clients SET name = '${name}', email = '${email}',
                            phone = '${phone}', address = '${address}' WHERE id = ${req.body.id}`)
        
        if (rows1.affectedRows == 1) {
            return res.status(201).send({"success": true, "message": "Client updated!", "error": null});
        }
    } catch (e) {
        return res.status(400).send({"success": false, "message": "Something went wrong", "error": e});
    }

});

module.exports = router;