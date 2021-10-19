const express = require('express');
const router = express.Router();
const {Admin} = require('../models');
const {Manager} = require('../models');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const {authenticateToken} = require('../middlewares/verifyTokenMiddleware');

// Capcha authentication
router.get('/Login', authenticateToken, (req, res) => {
    if('Authorized'){

        console.log(req.user)
        return res.json({LoggedIn: true})
    } 
});

// logout and remove refresh token
// router.delete('/logout', (req, res) => {
//     refreshTokens = refreshTokens.filter(token => token !== req.body.token)
//     res.sendStatus(204)
// })
 
// Authenticate login credentials
router.post('/Login',  async (req, res) => {
    // Input from Home page in client
    const {username, password} = req.body;

    //check for Admin user in Database
    const adminUser = await Admin.findOne({where: {username: username}});

    if(adminUser){
        bcrypt.compare(password, adminUser.password).then((match) =>{
            if(!match){
                res.status(422).send({error:'Wrong Username or Password combination!'});
            }else{ 
                // get the username of the user in the database
                const user = {name: adminUser.username};

                // create accessToken and refreshToken with user
                const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
                const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
                

                // create refresh cookie with refreshToken, expires in 24 hours
                res.cookie("refresh", refreshToken, {
                    maxAge: 86400000, // 24 hours
                    httpOnly: true,
                })

                // create access cookie with accessToken, expires in 15 seconds
                res.cookie("access", accessToken, {
                    maxAge: 15000, // 15 seconds
                    httpOnly: true,
                })
                res.json({auth: true});
            }
        }).catch(error =>{
            res.status(422).send(error)
        });
    }

    //check for Manager user in Database
    if(!adminUser){
        const managerUser = await Manager.findOne({where: {username: username}}); 
        
        bcrypt.compare(password, managerUser.password).then((match) =>{
            if(!match){
                res.status(422).send({error:'Wrong Username or Password combination!'});
            }else{
                // get the username of the user in the database
                const user = {name: managerUser.username};

                // create accessToken and refreshToken with user
                const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
                const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)

                // create access cookie with accessToken, expires in 15 seconds
                res.cookie("access", accessToken, {
                    maxAge: 15000, // 15 seconds
                    httpOnly: true,
                })

                // create refresh cookie with refreshToken, expires in 24 hours
                res.cookie("refresh", refreshToken, {
                    maxAge: 86400000, // 24 hours
                    httpOnly: true,
                })

                res.json({auth: true});
            }
        }).catch(error =>{
            res.status(422).send(error)
        });
    }
});


module.exports = router;