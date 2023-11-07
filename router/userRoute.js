const router = require('express').Router();
const bcrypt = require('bcryptjs');
const configs = require('dotenv');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { changePasswordValidation } = require('../validation/userValidation');

let salt = bcrypt.genSaltSync(10);

configs.config();

// MySQL Connection
const connection = require('../config/mysqlConfig')

// Routers

router.post('/change-password', passport.authenticate('jwt', { session: false }), changePasswordValidation, async (req, res) => {

    const new_password = req.body.new_password;

    await bcrypt.genSalt(10, async (err, salt) => {
        await bcrypt.hash(new_password, salt, async (err, hash) => {
            if (err) throw err;
            password = hash;

            [rows, fields] = await connection.query(`UPDATE users SET password = '${password}' WHERE id = ${req.user.id}`)
            if (rows.affectedRows > 0){
                return res.status(200).send({"success": true, "message": "Password Updated", "error": null});
            } else {
                res.status(400).send({"success": false, "message": "Something went wrong, please try again later", "error": null})
            }
        })
    });
});

router.get('/protected', passport.authenticate('jwt', { session: false }), function(req, res) {
    res.json({ msg: 'Congrats! You are seeing this because you are authorized'});
});

module.exports = router;