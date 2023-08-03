const passport = require('passport');
const jwtStrategy = require('passport-jwt').Strategy;
const extractJwt = require('passport-jwt').ExtractJwt;
const Employee = require('../models/Employee');
const env = require('./environment');

var opts ={

    jwtFromRequest : extractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : env.jwt_secret,
} 

passport.use(new jwtStrategy(opts, async function(jwt_payload, done) {

    try {
        let employee = await Employee.findOne({id: jwt_payload.sub});

        if(!employee){
            return done(null, false);
        }

        return done(null, employee);
       
    } catch (error) {
        //req.flash('error','Internal Server Error');
        console.log("Error in passport jwt");
        return done(error,false);
    }
   
}));

module.exports = passport;