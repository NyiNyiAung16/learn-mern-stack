const nodemailer = require("nodemailer");
const ejs = require('ejs');


const sendEmail = async ({view,data = {},from,to,subject}) => {
    try{
        const transport = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PROT,
            auth: {
              user: process.env.MAIL_USER,
              pass: process.env.MAIL_PASS
            }
        });
    
        let dataString = await ejs.renderFile(`./views/${view}.ejs`,data);
        const info = await transport.sendMail({
            from,
            to,
            subject,
            html: dataString,
        });
    }catch(e) {
        throw new Error(e);
    }
    
}

module.exports = sendEmail;