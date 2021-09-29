const express = require('express');
const nodemailer = require("nodemailer");
const router = express.Router();
const {Manager} = require('../models');
const dotenv = require('dotenv').config();

//check if username exists in signup
router.post('/Email', async (req, res) => {
    const {email} = req.body;
    const emailExist = await Manager.findOne({ where: {email: email} });

    //create random 4 digit code generator
    var randomCode = Math.floor(1000 + Math.random() * 9000);
    console.log(randomCode);
    code = randomCode;

    if(emailExist && email === emailExist.email){
        try{
            let transporter = await nodemailer.createTransport({
                host: process.env.MAIL_HOST,
                port: process.env.MAIL_PORT,
                auth: {
                    user: process.env.MAIL_USER, 
                    pass: process.env.MAIL_PASS,
                },
            });
        
            transporter.verify(function(error, success) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Server is ready to take our messages');
                }
            });

            const msg = {
                from: `"Time Waiter Team" <${process.env.MAIL_FROM}>`, // sender address
                to: email, // list of receivers
                subject: "Forgot Password Code", // Subject line
                text: `Hey there, it’s our first message sent with Nodemailer ;) `, // plain text body
                html: `<b>Hey there! </b><br> Here is your code ${code}`
            }
            // send mail with defined transport object
            const info = await transporter.sendMail(msg);
        
            console.log("Message sent: %s", info.messageId);
            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        
            //console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
            
        } catch (err) {
            console.log(err);
        }

        // send both email and random code back
        res.send({email: emailExist, code: code}).body

    }else{
        res.status(404).send({error:'Email could not be found!'});
    }
});





module.exports = router;