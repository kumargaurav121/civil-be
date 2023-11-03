const { validateEmail } = require('../utils/fieldChecks')

registerValidation = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    const phone = req.body.phone;

    if (!email || email == "") {
        return res.status(422).send({"success": false, "message": "Email ID not given", "error": null});
    }
    else if(!validateEmail(email)){
        return res.status(422).send({"success": false, "message": "Not a valid Email ID", "error": null});
    }
    else if (!password || password == "") {
        return res.status(422).send({"success": false, "message": "Password not given", "error": null});
    }
    else if (password.length < 8) {
        return res.status(422).send({"success": false, "message": "Password length should be at least 8 characters", "error": null});
    }
    else if (!name || name == "") {
        return res.status(422).send({"success": false, "message": "Name not given", "error": null});
    }
    else if (name.length < 3) {
        return res.status(422).send({"success": false, "message": "Name length should be at least 3 characters", "error": null});
    }
    else if (!phone || phone == "") {
        return res.status(422).send({"success": false, "message": "Phone number not given", "error": null});
    }
    else if (phone.length < 10) {
        return res.status(422).send({"success": false, "message": "Phone length should be at least 10 characters", "error": null});
    }
    next()
}

loginValidation = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || email == "") {
        return res.status(422).send({"success": false, "message": "Email ID not given", "error": null});
    }
    else if(!validateEmail(email)){
        return res.status(422).send({"success": false, "message": "Not a valid Email ID", "error": null});
    }
    else if (!password || password == "") {
        return res.status(422).send({"success": false, "message": "Password not given", "error": null});
    }
    else if (password.length < 8) {
        return res.status(422).send({"success": false, "message": "Password length should be at least 8 characters", "error": null});
    }
    
    next()
}

module.exports = {registerValidation, loginValidation}