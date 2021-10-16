const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return next({status:401,message:'authorization missing'})

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) =>{
        if(err) return next({status:403,message:err.message})
        req.user = user
        next()
    })
}

module.exports = {authenticateToken};