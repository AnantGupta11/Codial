const nodemailer= require('nodemailer');
const path= require('path');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: sanant91225, // generated ethereal user
      pass: Anant/123, // generated ethereal password
    },
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