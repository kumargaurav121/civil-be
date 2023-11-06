const bcrypt = require('bcryptjs');

// MySQL Connection
const connection = require('../config/mysqlConfig')

const changePasswordValidation = async (req, res, next) => {
    const old_password = req.body.old_password;
    const new_password = req.body.new_password;

    if (!old_password || old_password == "") {
        return res.status(422).send({"success": false, "message": "Old password not given", "error": null});
    }
    else if (old_password.old_password < 8) {
        return res.status(422).send({"success": false, "message": "Old password length should be at least 8 characters", "error": null});
    }
    else if (!new_password || new_password == "") {
        return res.status(422).send({"success": false, "message": "New password not given", "error": null});
    }
    else if (new_password.length < 8) {
        return res.status(422).send({"success": false, "message": "New password length should be at least 8 characters", "error": null});
    }

    if(old_password == new_password){
        return res.status(422).send({"success": false, "message": "Passwords can't be same", "error": null});
    }

    try {
        [rows, fields] = await connection.query(`SELECT * FROM users WHERE id = ${req.user.id}`)
        if (rows.length < 0){
            return res.status(422).send({"success": false, "message": "Something went wrong, user not found", "error": e});
        }
        let password = rows[0].password;
        bcrypt.compare(old_password, password, (err, response) => {
            if (!response){
                return res.status(422).send({"success": false, "message": "Wrong Password", "error": null});
            }
            next()
        });
    } catch (e) {
        return res.status(422).send({"success": false, "message": "Something went wrong", "error": e});
    }
}

module.exports = { changePasswordValidation }