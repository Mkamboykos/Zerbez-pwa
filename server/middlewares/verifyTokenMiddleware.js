const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next){

    const headersExist = req.headers['cookie']

    // check if headers for cookies exists
    if (headersExist){ 
        // check if there are more then one cookie
        const authHeaderAccess = req.headers['cookie'].split(' ')[1]
        
        // if the second cookie is the access cookie, slice it
        if (authHeaderAccess){
            const authHeaderAccessSlided = authHeaderAccess.slice(7)
            req.accessToken = authHeaderAccessSlided;
        }else{
            // if there is no second cookie, pass the first one to avoid errors
            const authHeader = req.headers['cookie']
            req.accessToken = authHeader;
        }

        // verify access token (sliced)
        jwt.verify(req.accessToken, process.env.ACCESS_TOKEN_SECRET, (err, authData) => {

            // if access token fails verification, verify refresh token
            if (err) {
                const authHeaderRefresh = req.headers['cookie'].slice(8)
                req.refreshToken = authHeaderRefresh
                jwt.verify(req.refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, verifiedRefresh) => {

                    if (err){
                        res.json({message: "Invalid Resfresh Token"});
                    } else if (verifiedRefresh){

                        // if refresh token passes verification, create new access token and verify
                        const accessToken = jwt.sign({name: verifiedRefresh.name}, process.env.ACCESS_TOKEN_SECRET)
                                    
                        res.cookie("access", accessToken, {
                            maxAge: 15000, // 15 seconds
                            httpOnly: true,
                        })
                        
                        jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, authData) => {

                            if (err){
                                res.json({message: "Invalid Access Token"});
                            }else if(authData){
                                console.log("New Access Token Valid")
                                req.user = authData
                                next()
                            }
                        })
                    }
                })
            }else if (authData){
                console.log("Access Token Valid ")
                // if access token is verified, pass the user information from the token to the req.user
                req.user = authData
                next()
            }
        })
    }else{
        // if both access or refresh token are missing, send 404
        res.json({message: "Page Not Found"});
    }
}

module.exports = {authenticateToken};    




    // const authHeader = req.headers['authorization']
    // if (authHeader !== 'undefined'){
    //     const authToken = authHeader.split(' ')[1]
    //     req.token = authToken
    // }