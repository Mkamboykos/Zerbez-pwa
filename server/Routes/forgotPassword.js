const express = require('express');
const nodemailer = require("nodemailer");
const router = express.Router();
const {Manager} = require('../models');
const dotenv = require('dotenv').config();

//check if username exists in signup
router.post('/Email', async (req, res) => {
    const {email} = req.body;
    const emailExist = await Manager.findOne({ where: {email: email} });

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
                from: '"Time Waiter Team" <No-Reply@timewaiter.com>', // sender address
                to: email, // list of receivers
                subject: "Forgot Password Code", // Subject line
                text: `Hey there, it’s our first message sent with Nodemailer ;) `, // plain text body
                html: `<b>Hey there! </b><br> This is our first message sent with Nodemailer`
            }
            // send mail with defined transport object
            const info = await transporter.sendMail(msg);
        
            console.log("Message sent: %s", info.messageId);
            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        
            //console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

        } catch (err) {
            console.log(err);
        }

        res.send(emailExist).json

    }else{
        res.status(404).send({error:'Email could not be found!'});
    }
});


module.exports = router;