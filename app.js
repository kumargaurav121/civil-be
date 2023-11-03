const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');

// MySQL Connection
const connection = require('./config/mysqlConfig');

// Routers
const authRoute = require('./router/authRoute');
const creditRoute = require('./router/creditRoute');
const projectRoute = require('./router/projectRoute');
const clientRoute = require('./router/clientRoute');

var app = express();
// parse application/json
app.use(bodyParser.json());
//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
    cors({
        origin: ['http://localhost:3000'],
        methods: ['GET', 'POST'],
        credentials: true,
    })
);

// JWS Strategy
app.use(passport.initialize());
require('./config/jwtStrategy');

// Create DB Connection
const mysqlConnection = async () => {
    await connection.connect().then(x => console.log("Successfully Connected to MySQL...")).catch(e => console.log("Error in connection:::", e));

    // await connection.query("SET time_zone='+05:50'").then(x => console.log("Timezone is updated to IST")).catch(e => console.log("Error in connection:::", e))
}
mysqlConnection()

app.use('/api/user', authRoute)
app.use('/api/credit', creditRoute)
app.use('/api/project', projectRoute)
app.use('/api/client', clientRoute)

// Routers
app.get('/', (req, res) => {
    return connection.query("Select count(*) from users", (err, rows) => {
        if (err) throw err;
        res.send('Hello World! '+ JSON.stringify(rows));
    })
});

// Server
app.listen(3000, async() => {
    console.log('Example app listening on port 3000!');
});