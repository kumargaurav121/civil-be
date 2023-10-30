const router = require('express').Router();
const {registerValidation} = require('../validation/authValidation');

// MySQL Connection
const connection = require('../config/mysqlConfig')

// Routers
router.post('/register', registerValidation, (req, res) => {
    res.send('------>Register');
});

module.exports = router;