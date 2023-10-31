const { validateEmail } = require('../utils/fieldChecks')

registerValidation = (req, res, next) => {
    // console.log(req.body)
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

module.exports = {registerValidation}