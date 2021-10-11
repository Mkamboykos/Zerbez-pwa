const express = require('express');
const router = express.Router();
const {Admin} = require('../models');
const {Manager} = require('../models');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const {validateToken} = require('../middlewares/AuthMiddleware');

// verify authentication of JWT token
router.get('/UserAuth', validateToken, (req, res) => {
res.send("Token works!");
})

// Check if user has logged in already
router.get('/Login', (req, res) => {
    if(req.session.user) {
        res.send({LoggedIn: true, user: req.session.user})
    }else{
        res.send({LoggedIn: false});
    }
})

// Authenticate login credentials
router.post('/Login',  async (req, res) => {
    // Input from Home in client
    const {username, password} = req.body;

    //check for Admin user in Database
    const adminUser = await Admin.findOne({where: {username: username}});

    //check for Manager user in Database
    const managerUser = await Manager.findOne({where: {username: username}}); 

    //check if users exist and then check password in Database
    if(adminUser){
        bcrypt.compare(password, adminUser.password).then((match) =>{
            if(!match){
                res.status(422).send({error:'Wrong Username or Password combination!'});
            }else{  
                // get the id and username of the user in the database
                const sessionUser ={id: adminUser.id, username: adminUser.username}

                // create the token, with expiration
                const accessToken = jwt.sign({sessionUser}, process.env.TOKEN_SECRET, {
                    expiresIn: 500, 
                });
                
                // create a session for this user
                req.session.user = accessToken;

                res.json({auth: true});
                // res.header('auth-token', token);
                // console.log(token);
                
                // res.send("Logged in!").json
            }
        }).catch(error =>{
            res.status(422).send(error)
        });
    }else if (managerUser){
        bcrypt.compare(password, managerUser.password).then((match) =>{
            if(!match){
                res.status(422).send({error:'Wrong Username or Password combination!'});
            }else{
                req.session.user = managerUser;
                console.log(req.session.user);
                res.send("Logged in!").json
            }
        }).catch(error =>{
            res.status(422).send(error)
        });
    }else{
        res.status(422).send({error:'Wrong Username or Password combination!'});
    }
});




module.exports = router;