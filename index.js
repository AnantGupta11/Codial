const express=require('express');
const env= require('./config/environment');
const logger= require('morgan');

const cookieParser = require ('cookie-parser');
const app=express();
require('./config/view-helpers')(app);
const port=8000;
const expressLayouts=require('express-ejs-layouts');
const db= require('./config/mongoose');

//used for session cookie
const session=require('express-session');
const passport= require('passport');
const passportLocal =require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');
const passportGoogle= require('./config/passport-google-oath2-strategy');
const MongoStore = require('connect-mongo')(session);
const sassMiddleware = require('node-sass-middleware');
const flash= require('connect-flash');
const customMware = require('./config/middleware');

//setup the chat server to be with the socket .io
const chatServer = require('http').Server(app);
const chatSockets= require('./config/chat_sockets').chatSockets(chatServer);
chatServer.listen(5000);
console.log('Chat Server is Listining the port:5000 ');
const path = require('path');

if(env.name=='development'){
    app.use(sassMiddleware({
        src: path.join(__dirname, env.asset_path,'scss'),
        dest: path.join(__dirname, env.asset_path,'css'),
        debug: true,
        outputStyle: 'extended',
        prefix: '/css'
    }));
    
}

app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static(env.asset_path));

app.use(logger(env.morgan.mode, env.morgan.options));
app.use('/uploads', express.static(__dirname + '/uploads'));
//make the uplaods part available for browser


app.use(expressLayouts);

//extract style and scripts from sub pages into layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


// set up the view engine
app.set('view engine','ejs');
app.set('views','./views');

//mongo store is used to store the session cookie in the db
app.use(session({
    name: 'codeial',
    //ToDo Change the secret before deployment in production mode
    secret: env.session_cookie_key ,
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: new MongoStore(
        {
            mongooseConnection:db,
            autoRemoved: 'disabled'
        },
        function(err){
            console.log(err || 'connect-mondodb setup ok');
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);

// use express router
app.use('/', require('./routes'));


app.listen(port, function(err){
    if(err){
        console.log(`Error in running server : ${err}`);

    }
    console.log(`Server is running on port: ${port}`);
})