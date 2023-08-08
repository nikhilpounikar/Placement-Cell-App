const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;

const crypto = require('crypto');

const User = require('../models/User');
const env = require('./environment');

// tell passport to use a new strategy for google login
passport.use(new googleStrategy({
        clientID: env.google_client_id, // e.g. asdfghjkkadhajsghjk.apps.googleusercontent.com
        clientSecret: env.google_client_secret, // e.g. _ASDFA%KFJWIASDFASD#FAD-
        callbackURL: env.google_call_back_url,
    },

    async function(accessToken, refreshToken, profile, done){

        try {

            let user = await User.findOne({email: profile.emails[0].value});

            console.log(accessToken, refreshToken);
            console.log(profile);

            if (user){
                // if found, set this user as req.user
                return done(null, user);
            }else{
                // if not found, create the user and set it as req.user
                let user = await User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                });

                if(user){
                    return done(null, user);
                }else{
                    console.log('error in creating user google strategy-passport'); return;
                }
            
            }

        } catch (error) {
            console.log('error in google strategy-passport', err);
            return;
        }
        // find a user
       
    }


));