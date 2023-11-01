const jwt = require('jsonwebtoken');
// import passport and passport-jwt modules
const passport = require('passport');
const passportJWT = require('passport-jwt');
const configs = require('dotenv');

// MySQL Connection
const connection = require('../config/mysqlConfig')

configs.config();

// ExtractJwt to help extract the token
let ExtractJwt = passportJWT.ExtractJwt;
// JwtStrategy which is the strategy for the authentication
let JwtStrategy = passportJWT.Strategy;
let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = process.env.SECRET_JWT;

// lets create our strategy for web token
passport.use(new JwtStrategy(jwtOptions, (jwt_payload, done) => {
    connection.query(`SELECT id, email FROM users where id = '${jwt_payload.id}'`)
    .then(([user, fields]) => {
        if (user.length > 0) {
            return done(null, user[0]);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    })
    .catch(err => done(err, false))
}));

// use the strategy
// passport.use(strategy);

// module.exports = {passport};