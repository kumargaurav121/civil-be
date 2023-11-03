// MySQL Connection
const connection = require('../config/mysqlConfig')

const validSubscription = async (req, res, next) => {
    let credit_type = null;
    let credited_on = null;
    await connection.query(`SELECT credit_type, credited_on FROM credits where user_id = ${req.user.id}`)
    .then(([rows, fields]) => {
        credit_type =  rows[0].credit_type;
        credited_on =  rows[0].credited_on;
    })
    .catch(err => {
        return res.status(400).send({"success": false, "message": "Something went wrong", "error": err})
    })

    const today = new Date();
    const diffTime = await Math.abs(today - credited_on);
    const diffDays = await Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if ((credit_type == 'month' && diffDays > 30) ||
    (credit_type == 'quarter' && diffDays > 90) ||
    (credit_type == 'year' && diffDays > 365)) {
        await connection.query(`UPDATE credits SET credit_count = 0 where user_id = ${req.user.id}`)
        .then(([rows, fields]) => {
            return res.status(400).send({"success": false, "message": "Subscription has ended. Please renew it!", "error": null});
        })
        .catch(err => {
            return res.status(400).send({"success": false, "message": "Something went wrong", "error": err})
        });
    } else{
        next();
    }
}

module.exports = {validSubscription}