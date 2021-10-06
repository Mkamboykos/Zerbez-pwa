const express = require('express');
const router = express.Router();
const {Admin} = require('../models');
const {Manager} = require('../models');
const bcrypt = require("bcrypt");

// Authenticate login credentials
router.post('/Login', async (req, res) => {
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
                req.session.user = adminUser;
                console.log(req.session.user);
                res.send(adminUser).json
            }
        }).catch(error =>{
            res.status(422).send(error)
        });
    }else if (managerUser){
        bcrypt.compare(password, managerUser.password).then((match) =>{
            if(!match){
                res.status(422).send({error:'Wrong Username or Password combination!'});
            }else{
                res.send(managerUser).json
            }
        }).catch(error =>{
            res.status(422).send(error)
        });
    }else{
        res.status(422).send({error:'Wrong Username or Password combination!'});
    }
});

// Check if user has logged in already
router.get('/Login', (req, res) => {
    if(req.session.user) {
        res.send({loggedIn: true, user: req.session.user})
    }else{
        res.send({loggedIn: false});
    }
})


module.exports = router;