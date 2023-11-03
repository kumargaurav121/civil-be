const configs = require('dotenv');

configs.config();

const validAdmin = async (req, res, next) => {
    const email = req.user.email;
    const admins = process.env.ADMINS;

    if (admins.includes(email)){
        next();
    } else {
        return res.status(401).send({"success": false, "message": "Only ADMIN can make this change.", "error": null});
    }
}

module.exports = {validAdmin}