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
// router.get('/Login', authenticateToken, (req, res) => {
//     if(req.session.user) {
//         res.send({LoggedIn: true, user: req.session.user})
//     }else{
//         res.send({LoggedIn: false});
//     }
// })

router.get('/Login', authenticateToken, (req, res) => {
    if('Authorized') return res.send({LoggedIn: true})
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
                const user = {name: adminUser.username};

                // create the access token, with expiration of 5 seconds
                const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
                    expiresIn: 5000, 
                });
                
                // create refresh token with expiration of 24 hours
                const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
                    expiresIn: 86400000,
                });

                // set accessToken in cookie
                // res.cookie("accessToken", accessToken, {
                //     maxAge: 300000, // 5 minutes
                //     httpOnly: true,
                // });

                // set refreshToken in cookie
                // res.cookie("refreshToken", refreshToken, {
                //     maxAge: 86400000, // 24 hours
                //     httpOnly: true,
                // });


                // create a session for this user
                // req.session.user = accessToken;

                res.json({auth: true, accessToken: accessToken});
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


function authenticateToken(req, res, next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) =>{
        if(err) return res.sendStatus(403)
        req.user = user
        next()
    })
}


module.exports = router;