const express = require('express');
const router = express.Router();
const {User} = require('../models');
const bcrypy = require("bcrypt");

router.post('/Login', (req, res) => {
    const {username, password} = req.body;
    const user = await User.findOne({ where: {username: username} });
    user ? res.send(user).json : res.json("");
});

module.exports = router;