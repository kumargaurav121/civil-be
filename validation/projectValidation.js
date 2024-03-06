const { validateEmail } = require('../utils/fieldChecks')

// MySQL Connection
const connection = require('../config/mysqlConfig')

const addProjectValidation = async (req, res, next) => {
    const { name, description, status, client_id, client_name, client_add, client_ph, client_email } = req.body;

    if (!name || name == "") {
        return res.status(422).send({"success": false, "message": "Name not given", "error": null});
    }
    else if (name.length < 3) {
        return res.status(422).send({"success": false, "message": "Name length should be at least 3 characters", "error": null});
    }
    else if (!description || description == "") {
        return res.status(422).send({"success": false, "message": "Description not given", "error": null});
    }
    else if (description.length < 10) {
        return res.status(422).send({"success": false, "message": "Description length should be at least 10 characters", "error": null});
    }
    else if (!status || status == "") {
        return res.status(422).send({"success": false, "message": "Status not given", "error": null});
    }
    else if (status != 'Pitched' && status != 'In-Progress' && status != 'Completed') {
        return res.status(422).send({"success": false, "message": "Not a valid status", "error": null});
    }

    if(!client_id){
        if (!client_name || client_name == "") {
            return res.status(422).send({"success": false, "message": "Client name not given", "error": null});
        }
        else if (client_name.length < 3) {
            return res.status(422).send({"success": false, "message": "Client name length should be at least 3 characters", "error": null});
        }
        else if (!client_email || client_email == "") {
            return res.status(422).send({"success": false, "message": "Client email ID not given", "error": null});
        }
        else if(!validateEmail(client_email)){
            return res.status(422).send({"success": false, "message": "Not a valid Email ID", "error": null});
        }
        else if (!client_ph || client_ph == "") {
            return res.status(422).send({"success": false, "message": "Client phone number not given", "error": null});
        }
        else if (client_ph.length < 10) {
            return res.status(422).send({"success": false, "message": "Phone length should be at least 10 characters", "error": null});
        }
        else if (!client_add || client_add == "") {
            return res.status(422).send({"success": false, "message": "Client address number not given", "error": null});
        }
        else if (client_add.length < 10) {
            return res.status(422).send({"success": false, "message": "Not a valid address", "error": null});
        }
    } else{
        [rows, fields] = await connection.query(`SELECT * FROM clients WHERE id = ${client_id}`);
        result = rows[0]
        if (!result){
            return res.status(422).send({"success": false, "message": "Client not found", "error": null});
        } else if (result.user_id != req.user.id){
            return res.status(422).send({"success": false, "message": "You are not authorised to create the project under this client", "error": null});
        }
    }

    next()
}

module.exports = { addProjectValidation }