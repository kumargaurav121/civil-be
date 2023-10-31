const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');

// MySQL Connection
const connection = require('./config/mysqlConfig');

// Routers
const authRoute = require('./router/authRoute');

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
app.use(passport.initialize());
require('./config/jwtStrategy');

// Create DB Connection
const mysqlConnection = () => {
    return connection.connect(err => {
        if (err) throw err;
        console.log('Successfully Connected to MySQL...')
    })
}
mysqlConnection()

app.use('/api/user', authRoute)

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