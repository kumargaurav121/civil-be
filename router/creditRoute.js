const router = require('express').Router();
const configs = require('dotenv');
const passport = require('passport');

const { validSubscription } = require('../validation/subscriptionValidation');

configs.config();

// MySQL Connection
const connection = require('../config/mysqlConfig')

// Routers
router.post('/add', passport.authenticate('jwt', { session: false }), async (req, res) => {
    let { user_id, credit_type } = req.body;

    // Check if the user who is updating this is KG 
    // TO DO

    // Check if user id was passed
    if (!user_id) res.status(422).send({"success": false, "message": "User not provided", "error": null});

    // Check if the user exists for whch we want to update the credits
    await connection.query(`SELECT * from users where id = ${user_id}`)
    .then(([rows, fields]) => {
        if (rows.length == 0){
            return res.status(422).send({"success": false, "message": "User not found", "error": null});
        }
    })
    .catch(err => res.status(400).send({"success": false, "message": "Something went wrong", "error": err}))

    // Chech if the credit type was provided
    if (!credit_type) return res.status(422).send({"success": false, "message": "Credit type not provided", "error": null});

    //  Logic to add credits, Also check if the credit type is correct
    let credits = 0
    if (credit_type == 'month'){
        credits = 10
    }
    else if(credit_type == 'quarter'){
        credits = 50
    }
    else if(credit_type == 'year'){
        credits = 200
    }
    else{
        return res.status(422).send({"success": false, "message": "Credit type not incorrect", "error": null});
    }

    // Update the credits
    // let today = (new Date()).toJSON().slice(0, 19).replace('T', ' ');
    // console.log(today)
    await connection.query(`UPDATE credits SET credit_count = ${credits}, credit_type = '${credit_type}' where user_id=${user_id}`)
    .then(([rows, fields]) => {
        if (rows.affectedRows == 1){
            return res.status(200).send({"success": true, "message": "Credits Updated", "error": null});
        }
        else{
            res.status(400).send({"success": false, "message": "Something went wrong, please try again later", "error": err})
        }
    })
    .catch(err => res.status(400).send({"success": false, "message": "Something went wrong", "error": err}))

});

router.get('/protected', passport.authenticate('jwt', { session: false }), validSubscription, function(req, res) {
    res.json({ msg: 'Congrats! You are seeing this because you are authorized'});
});

module.exports = router;