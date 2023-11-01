const router = require('express').Router();
const bcrypt = require('bcryptjs');
const configs = require('dotenv');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const {registerValidation} = require('../validation/authValidation');// MySQL Connection

let salt = bcrypt.genSaltSync(10);

configs.config();

// MySQL Connection
const connection = require('../config/mysqlConfig')

// Routers
router.post('/register', registerValidation, async (req, res) => {
    try{
        let password = null;
        await bcrypt.genSalt(10, async (err, salt) => {
            await bcrypt.hash(req.body.password, salt, async (err, hash) => {
                if (err) throw err;
                password = hash;

                try{
                        
                    // Starting the transaction
                    await connection.beginTransaction();

                    let user_id = null;

                    const [rows1, fields1] = await connection.query(`SELECT email FROM users where email = '${req.body.email}'`);
                    if (rows1.length > 0) {
                        return res.status(422).send({"success": false, "message": "User already exists", "error": null}); 
                    }

                    const [rows2, fields2] = await connection.query(`INSERT INTO users (email, password) VALUES ('${req.body.email}', '${password}')`);

                    const [rows3, fields3] = await connection.query(`SELECT id FROM users where email = '${req.body.email}'`);

                    user_id = rows3[0].id;

                    const [rows4, fields4] = await connection.query(`INSERT INTO credits (user_id) VALUES (${user_id})`);

                    await connection.commit();

                    return res.status(201).send({"success": true, "message": "User created. Please login!", "error": null});
                    
                } catch(e) {
                    await connection.rollback();
                    return res.status(400).send({"success": false, "message": "Something went wrong", "error": e});
                }

            });
        });
    } catch(e) {
        return res.status(400).send({"success": false, "message": "Something went wrong", "error": e});
    }
});

router.post('/login', registerValidation, async (req, res) => {

    connection.query(`Select * from users where email = '${req.body.email}'`)
    .then(([rows, fields]) => {
        if (rows.length == 0) {
            return res.status(422).send({"success": false, "message": "User not found", "error": null}); 
        }
        bcrypt.compare(req.body.password, rows[0].password, function(err, response) {
            if (!response){
                return res.status(422).send({"success": false, "message": "Wrong Password", "error": null});
            }
            let token = jwt.sign(rows[0], process.env.SECRET_JWT);
            res.status(200).send({"success": true, "token": token, "message": "User created. Please login!", "error": null});
        });
    })
    .catch(err => {
        return res.status(400).send({"success": false, "message": "Something went wrong", "error": err});
    })
});

router.get('/protected', passport.authenticate('jwt', { session: false }), function(req, res) {
    res.json({ msg: 'Congrats! You are seeing this because you are authorized'});
});

module.exports = router;