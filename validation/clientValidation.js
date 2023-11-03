const { validateEmail } = require('../utils/fieldChecks')

// MySQL Connection
const connection = require('../config/mysqlConfig')

const addClientValidation = (req, res, next) => {
    const {name, email, phone, address} = req.body;

    if (!name || name == "") {
        return res.status(422).send({"success": false, "message": "Name not given", "error": null});
    }
    else if (name.length < 3) {
        return res.status(422).send({"success": false, "message": "Name length should be at least 3 characters", "error": null});
    }
    else if (!email || email == "") {
        return res.status(422).send({"success": false, "message": "Email ID not given", "error": null});
    }
    else if(!validateEmail(email)){
        return res.status(422).send({"success": false, "message": "Not a valid Email ID", "error": null});
    }
    else if (!phone || phone == "") {
        return res.status(422).send({"success": false, "message": "Phone number not given", "error": null});
    }
    else if (phone.length < 10) {
        return res.status(422).send({"success": false, "message": "Phone length should be at least 10 characters", "error": null});
    }
    else if (!address || address == "") {
        return res.status(422).send({"success": false, "message": "Address number not given", "error": null});
    }
    else if (address.length < 10) {
        return res.status(422).send({"success": false, "message": "Not a valid address", "error": null});
    }

    next()
}

const editClientValidation = async (req, res, next) => {
    const id = req.body.id;

    if (!id || id == ""){
        return res.status(422).send({"success": false, "message": "Client ID not given", "error": null});
    }

    try{
        [rows, fields] = await connection.query(`SELECT * FROM clients where id = ${id}`)
        if (rows.length == 0){
            return res.status(422).send({"success": false, "message": "Wrong Client ID", "error": null});
        }
        if (rows[0].user_id != req.user.id){
            return res.status(422).send({"success": false, "message": "You can\'t change this client", "error": null});
        }
    } catch (e) {
        return res.status(400).send({"success": false, "message": "Something went wrong", "error": e});
    }

    next();
}

module.exports = { addClientValidation , editClientValidation }