const express = require('express');
const router = express.Router();
const {Admin} = require('../models');
const {Manager} = require('../models');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const {authenticateToken} = require('../middlewares/verifyTokenMiddleware');

let refreshTokens = []

router.get('/Login', authenticateToken, (req, res) => {
    if('Authorized') return res.send({LoggedIn: true})
})

// Check if Refresh Token exist and creating a new Access Token with it
router.post('/token', (req, res) => {
    const refreshToken = req.body.token
    if (refreshToken == null) return res.sendStatus(401)
    if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        const accessToken = generateAccessToken({ name: user.name })
        res.json({ accessToken: accessToken })
    })
})

// logout and remove refresh token
router.delete('/logout', (req, res) => {
    refreshTokens = refreshTokens.filter(token => token !== req.body.token)
    res.sendStatus(204)
})
 
// Authenticate login credentials
router.post('/Login',  async (req, res) => {
    // Input from Home page in client
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
                // get the username of the user in the database
                const user = {name: adminUser.username};

                // create the Access Token to login, with expiration of 15 seconds
                const accessToken = generateAccessToken(user)

                // create the refresh token, with no expiration
                const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' })

                // set accessToken in cookie
                res.cookie("accessToken", accessToken, {
                    maxAge: 15000, // 24 hours
                    httpOnly: true,
                });

                // push refresh token to array
                refreshTokens.push(refreshToken)

                // responde with the access token and the refresh token
                res.json({auth: true, refreshToken: refreshToken })
            }
        }).catch(error =>{
            res.status(422).send(error)
        });
    }else if (managerUser){
        bcrypt.compare(password, managerUser.password).then((match) =>{
            if(!match){
                res.status(422).send({error:'Wrong Username or Password combination!'});
            }else{
                 // get the username of the user in the database
                const user = {name: managerUser.username};

                // create the Access Token to login, with expiration of 15 seconds
                const accessToken = generateAccessToken(user)
                
                 // create the refresh token, with no expiration
                const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
                
                // push refresh token to array
                refreshTokens.push(refreshToken)
                
                // responde with the access token and the refresh token
                res.json({auth: true, accessToken: accessToken, refreshToken: refreshToken })
            }
        }).catch(error =>{
            res.status(422).send(error)
        });
    }else{
        res.status(422).send({error:'Wrong Username or Password combination!'});
    }
});

// function to generate a new access token
function generateAccessToken(user) {
    //return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' })
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
}

module.exports = router;