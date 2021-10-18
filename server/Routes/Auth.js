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
        return res.json({LoggedIn: true})
    } 
});

// Check if Refresh Token exist and creating a new Access Token with it
// router.post('/token', (req, res) => {
//     // const {username} = req.body;
//     // const user = Admin.findOne({where: {username: username}});
//     // const refreshToken = user.token
//     const {token} = req.body;
//     const refreshToken = token
//     if (refreshToken == null) return res.sendStatus(401)
//     if (!refreshToken.includes(refreshToken)) return res.sendStatus(403)
//     const refreshUser = {name: user.username};
//     jwt.verify(refreshUser, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
//         if (err) return res.sendStatus(403).send(err)
//         const accessToken = generateAccessToken({ name: user.name })
//         res.json({ accessToken: accessToken })
//     })
// })



// Creates a new accessToken using the given refreshToken;
// router.post("/refresh", (req, res, next) => {
//     const refreshToken = req.body.token;
//     if (!refreshToken || !refreshTokens.includes(refreshToken)) {
//         return res.json({ message: "Refresh token not found, login again" });
//     }

//     // If the refresh token is valid, create a new accessToken and return it.
//     jwt.verify(refreshToken, "refresh", (err, user) => {
//         if (!err) {
//             const accessToken = jwt.sign({ name: user.username }, process.env.ACCESS_TOKEN_SECRET, {
//                 expiresIn: 15000
//             });
//             return res.json({ success: true, accessToken });
//         } else {
//             return res.json({
//                 success: false,
//                 message: "Invalid refresh token"
//             });
//         }
//     });
// });


// Protected route, can only be accessed when user is logged-in
// router.post("/protected", auth, (req, res) => {
//     return res.json({ message: "Protected content!" });
// });




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

                // create accessToken and refreshToken with user
                const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
                const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)

                // create access cookie with accessToken, expires in 15 seconds
                res.cookie("access", accessToken, {
                    maxAge: 15000, // 15 seconds
                    httpOnly: false,
                })

                // create refresh cookie with refreshToken, expires in 24 hours
                res.cookie("refresh", refreshToken, {
                    maxAge: 86400000, // 24 hours
                    httpOnly: false,
                })

                // update database by adding the refreshToken 
                //     adminUser.update(
                //         { token: refreshToken },
                //         { where: {id: adminUser.id} }
                //    ).then(token => {
                //         console.log(token);
                //    }).catch(err => console.log('error: ' + err));


                res.json({auth: true});
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

                // create accessToken and refreshToken with user
                const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
                const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)

                // create access cookie with accessToken, expires in 15 seconds
                res.cookie("access", accessToken, {
                    maxAge: 15000, // 15 seconds
                    httpOnly: false,
                })

                // create refresh cookie with refreshToken, expires in 24 hours
                res.cookie("refresh", refreshToken, {
                    maxAge: 86400000, // 24 hours
                    httpOnly: false,
                })

                res.json({auth: true});
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
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' })
}

module.exports = router;