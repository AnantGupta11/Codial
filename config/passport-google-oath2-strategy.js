const passport= require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto= require('crypto');
const User=require('../models/user');
const env = require('./environment');
//tell passport to use a new strategy for google login
passport.use(new googleStrategy({
        clientID: env.google_client_id,
        clientSecret: env.google_client_secret,
        callbackURL: env.google_call_back_url,
    },

    function(accesssToken, refreshToken, profile, done){
        //find a user
        User.findOne({email:profile.emails[0].value}).exec(function(err, user){
            if(err){
                console.log("Error in google strstegy",err);
                return;
            }

                console.log(profile);
                if(user){
                    //if found set user as request.user
                    return done(null, user);
                }else{
                    //if not found create the user and set it req.user
                    user.create({
                        name: profile.displayName,
                        email:profile.emails[0].value,
                        password: crypto.randomBytes(20).toString('hex')
                    },function(err, user){
                        if(err){
                            console.log("Error in Creating user google strstegy",err);
                            return;
                        }
                        return done(null, user);
                    })
                }
            }
        )
    }

))

module.exports=passport;