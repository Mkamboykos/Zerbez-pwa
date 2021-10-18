const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next){
    const authHeader = req.headers['authorization']
    if (authHeader !== 'undefined'){
        const authToken = authHeader.split(' ')[1]
        req.token = authToken
    }

    jwt.verify(req.token, process.env.ACCESS_TOKEN_SECRET, (err, authData) => {
        if (err) {
            // res.sendStatus(403); //forbidden
            res.send(err)
        }else if (authData){
            next()
        }
    })
}

module.exports = {authenticateToken};






// function authenticateToken(req, res, next){
//     const authHeader = req.headers['authorization']
//     if (authHeader !== 'undefined'){
//         const authToken = authHeader.split(' ')[1]
//         req.token = authToken
//         next()
//     }else{
//         res.sendStatus(403) //forbidden
//     }
    
// }






// const jwt = require("jsonwebtoken");

// async function auth(req, res, next) {
//     const authHeader = req.headers['authorization'];
//     const token = authHeader && authHeader.split(' ')[1]
//     console.log(authHeader);
    

//     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
//         if (user) {
//             req.user = user;
//             next();
//         } else if (err.message === "jwt expired") {
//             return res.json({success: false,message: "Access token expired"});
//         } else {
//             console.log(err);
//             return res.status(403).json({ err, message: "User not authenticated" });
//         }
//     });
// }

// module.exports = {auth};