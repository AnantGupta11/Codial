const passport= require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto= require('crypto');
const User=require('../models/user');

//tell passport to use a new strategy for google login
passport.use(new googleStrategy({
        clientID: "217187460365-mb77o0latfhod3mtof0bgregu5ctfno1.apps.googleusercontent.com",
        clientSecret: "eSjKgcpatsieAMFteC905sIt",
        callbackURL: "http://localhost:8000/users/auth/google/callback",
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