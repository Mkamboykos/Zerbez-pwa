const jwt = require("jsonwebtoken");

const validateToken = (req, res, next) => {
    const accessToken = req.header("accessToken");

    if (!accessToken) return res.json({error: "User not logged in!"});

    try {
        const validToken = jwt.verify(accessToken, process.env.TOKEN_SECRET);

        if (validToken) {
            return next();
        }
    }catch(err){
        return res.json({ error: err})
    }
};

module.exports = {validateToken};