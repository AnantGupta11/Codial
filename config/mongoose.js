const mongoose =require('mongoose');

mongoose.connect('mongodb://localhost/codial_development',{useNewUrlParser:true, useUnifiedTopology:true});

const db= mongoose.connection;

db.on('error', console.error.bind(console,"Error Connecting to MongoDB"));

db.once('open', function(){
    console.log('Connected to Database :: MongoDB');
});


module.exports=db;