const express = require('express');

// MySQL Connection
const connection = require('./config/mysqlConfig')

// Routers
const authRoute = require('./router/authRoute');

var app = express();

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