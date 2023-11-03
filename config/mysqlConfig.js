// get the client
const mysql = require('mysql2');
const configs = require('dotenv');

configs.config();

// create the connection to database
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  timezone: 'local'
});

// Promise connection
const connectionPromise = connection.promise();

// // simple query
// connectionPromise.query("SET time_zone='+05:50';", error => {
//   if(error){
//       throw error
//   }
//   console(" Timezone is updated to IST")
// })


// with placeholder
// connection.query(
//   'SELECT * FROM `table` WHERE `name` = ? AND `age` > ?',
//   ['Page', 45],
//   function(err, results) {
//     console.log(results);
//   }
// );

module.exports = connectionPromise