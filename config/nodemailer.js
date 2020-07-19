const nodemailer= require('nodemailer');
const ejs=require('ejs');
const path= require('path');

const { getMaxListeners } = require('process');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
       user: 'Ak8002749@gmail.com', // generated ethereal user
       pass: '321@tnanA' // generated ethereal password
    },
    tls: {
        rejectUnauthorized: false
    }

});

let renderTemplate= (data, relativePath)=>{
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname, '../views/mailers', relativePath),
        data,
        function(err, template){
            if(err){
                console.log('Error in rendering Template', err);
                return;
            }
            mailHTML=template;
        }
    )
    return mailHTML;
}

module.exports = {
    transporter:transporter,
    renderTemplate:renderTemplate
}