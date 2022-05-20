const express = require('express');
const router = express.Router();
const {Manager} = require('../models');
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const jwt = require('jsonwebtoken');
const ManagerService = require('../Service/ManagerService');
const {authenticateUser, authenticateEmail} = require('../middlewares/verifyTokenMiddleware');

// verify email in forgot password page
router.post('/verify', async (req, res) => {

    const {email} = req.body;
    const emailExist = await ManagerService.findByEmail(email);

    if (emailExist){
        const user = {name: emailExist.username, email: emailExist.email};
        
        const emailToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);

        res.cookie("email", emailToken, {
            maxAge: 900000, // 15 minutes
            httpOnly: true,
        });

        res.status(200).send({user: emailExist.username});
    }else{
        res.status(404).send({error:'Email could not be found!'});
    }
})


router.get('/auth', authenticateEmail, async (req, res) => {
 
    if('Authorized'){
        if(req.user.name){
            res.json({
                auth: true,
                username: req.user.name,
                email: req.user.email,
            })
        }else{
            res.json({
                auth: true,
                username: req.user.verifiedRefresh.name,
                email: req.user.verifiedRefresh.email,
            })
        }
    }
});


// send email and 4-digit code in EnterCode page
router.post('/send', authenticateEmail, async (req, res) => {

    if(req.user.email){
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
    
        //create random 4 digit code generator
        var randomCode = Math.floor(1000 + Math.random() * 9000);
        console.log(randomCode);
        code = randomCode;
    
        const msg = {
            from: `"Time Waiter Team" <${process.env.MAIL_FROM}>`, // sender address
            to: req.user.email, // list of receivers
            subject: "Forgot Password Code", // Subject line
            text: `Hey there, it’s our first message sent with Nodemailer ;) `, // plain text body
            html: `<b>Hey there!</b> <br/> Here is your code ${code}`
        }
        // send mail with defined transport object
        const info = await transporter.sendMail(msg);
        
        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        
        //console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        
        res.json({code: code});
    }else{
        res.sendStatus(401);
    }
    
});


router.post('/validate', authenticateEmail, async (req, res) => {

    const {code, nodesTogether} = req.body;

    if('Authorized'){
        if (parseInt(code) === parseInt(nodesTogether)){
            res.json({auth: true});
        }else if (parseInt(code) !== parseInt(nodesTogether)){
            res.status(400).send({error:'Incorrect code!'})
        }
    }
    
});


//Reset Password - update new password
router.put('/Email', authenticateUser, async (req, res) => {

    const {newPassword} = req.body;

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await Manager.findOne({ where: {username: req.user.name} })
    .then(user => {
        
        if (!user) {
            throw new Error('No record found')
        }else if (user){

            let values = {
                password: hashedPassword
            }

            user.update(values).then( updatedRecord => {
                console.log(`updated record ${JSON.stringify(updatedRecord,null,2)}`)
                // login into your DB and confirm update
            })

            return res.clearCookie('access').json({auth: true});
        }
    }).catch((error) => {
      // do something with the error
      throw new Error(error)
    })
});


module.exports = router;