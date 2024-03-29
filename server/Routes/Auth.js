const express = require('express');
const router = express.Router();
const {Admin} = require('../models');
const {Manager} = require('../models');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const {authenticateUser} = require('../middlewares/verifyTokenMiddleware');
const ValidationException = require('../Exceptions/ValidationException');
const ManagerService = require('../Service/ManagerService');
const AdminService = require('../Service/AdminService');

function tokensFunction(res, user){
    // create accessToken and refreshToken with user
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)

    // create access cookie with accessToken, expires in 15 seconds
    res.cookie("access", accessToken, {
        maxAge: 5000, // 5 seconds
        httpOnly: true,
    })

    // create refresh cookie with refreshToken, expires in 24 hours
    res.cookie("refresh", refreshToken, {
        maxAge: 86400000, // 24 hours
        httpOnly: true,
    })

    res.json({auth: true});
}

// Check if user if logged in (authentication) -> used in every routes when logged in 
router.get('/Login', authenticateUser, (req, res) => {

    if('Authorized'){
        if(req.user.name){
            return res.json({
                LoggedIn: true, 
                username: req.user.name,
                id: req.user.id,
                role: req.user.role
            })
        }else{
            return res.json({
                LoggedIn: true, 
                username: req.user.verifiedRefresh.name,
                id: req.user.verifiedRefresh.id,
                role: req.user.verifiedRefresh.role
            })
        }
    }else{
        return res.json({
            LoggedIn: false
        })
    }
});


// logout and remove refresh token
router.post('/logout/:username', (req, res) => {
    try{
        // clear the remembered cookie when logging out
        // It gets redirected when setting username to undefined it sends it straight to do the login page
        return res.clearCookie('refresh').json({username: undefined});
    }catch(e){
        console.log(e);
    }
});


// Authenticate login credentials
router.post('/login', async (req, res) => {
    // Input from Home page in client
    const {username, password} = req.body;

    const adminUser = await AdminService.findByUsername(username);

    if(adminUser){
        await bcrypt.compare(password, adminUser.password).then((match) =>{
            if(!match){
                res.status(422).send({error: 'Wrong username or password combination!'})
            }else if(match){
                // get the username of the user in the database
                const user = {id: adminUser.id, name: adminUser.username, role: adminUser.role};
                tokensFunction(res, user);
            }
        }).catch(e =>{
            console.log(e)
        });
    }

    // if adminUser does not exist try creating managerUser
    const managerUser = await ManagerService.findByUsername(username);
    
    if(managerUser){
        await bcrypt.compare(password, managerUser.password).then((match) =>{
            if(!match){
                res.status(422).send({error:'Wrong username or password combination!'})
            }else if(match){
                // get the username of the user in the database
                const user = {id: managerUser.id, name: managerUser.username, role: managerUser.role};
                tokensFunction(res, user);
            }
        }).catch(e =>{
            console.log(e)
        });
    }
    
    if(adminUser === null && managerUser === null){
        res.status(422).send({error:'  Wrong username or password combination!  '})
    }
    
});



module.exports = router;