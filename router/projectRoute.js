const router = require('express').Router();
const configs = require('dotenv');
const passport = require('passport');

const { validSubscription } = require('../validation/subscriptionValidation');

configs.config();

// MySQL Connection
const connection = require('../config/mysqlConfig')

// Routers
router.post('/add', passport.authenticate('jwt', { session: false }), validSubscription, async (req, res) => {
    res.send("Project add")

});

router.get('/protected', passport.authenticate('jwt', { session: false }), validSubscription, function(req, res) {
    res.json({ msg: 'Congrats! You are seeing this because you are authorized'});
});

module.exports = router;