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

    res.send("ok")
});

router.get('/protected', passport.authenticate('jwt', { session: false }), function(req, res) {
    res.json({ msg: 'Congrats! You are seeing this because you are authorized'});
});

module.exports = router;