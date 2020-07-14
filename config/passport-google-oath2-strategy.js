const passport= require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto= require('crypto');
const User=require('../models/user');


passport.use(new googleStrategy({
        clientID: "217187460365-mb77o0latfhod3mtof0bgregu5ctfno1.apps.googleusercontent.com",
        clientSecret: "eSjKgcpatsieAMFteC905sIt",
        callbackURL: "http://localhost:8000/users/auth/google/callback",
    },

    function(accesssToken, refreshToken, profile, done){
        User.findOne({email:profile.emails[0].value})
    }

))