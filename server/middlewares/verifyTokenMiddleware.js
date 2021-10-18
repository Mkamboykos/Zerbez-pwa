const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next){

    const headersExist = req.headers['cookie']

    if (headersExist){
        const authHeaderAccess = req.headers['cookie'].split(' ')[0].slice(7).slice(0, -1)
        req.accessToken = authHeaderAccess;
        jwt.verify(req.accessToken, process.env.ACCESS_TOKEN_SECRET, (err, authData) => {
            if (err) {
                const authHeaderRefresh = req.headers['cookie'].slice(8);
                req.refreshToken = authHeaderRefresh
                jwt.verify(req.refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, verifiedRefresh) => {
                    if (err){
                        res.json({message: "logout"});
                    } else if (verifiedRefresh){
                                    
                        const accessToken = jwt.sign({name: verifiedRefresh.name}, process.env.ACCESS_TOKEN_SECRET)
                                    
                        res.cookie("access", accessToken, {
                            maxAge: 15000, // 15 seconds
                            httpOnly: true,
                        })

                        jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, authData) => {
                            if (err){
                                res.json({message: "logout"});
                            }else if(authData){
                                console.log("New Access token worked with refresh token")
                                req.user = authData
                                next()
                            }
                        })
                    }
                })
            }else if (authData){
                console.log("Access token worked")
                req.user = authData
                next()
            }
        })
    }else{
        res.json({message: "logout"});
    }
}

module.exports = {authenticateToken};    




    // const authHeader = req.headers['authorization']
    // if (authHeader !== 'undefined'){
    //     const authToken = authHeader.split(' ')[1]
    //     req.token = authToken
    // }