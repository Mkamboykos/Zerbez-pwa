const express = require('express');
const router = express.Router();
const {Manager} = require('../models');
const bcrypt = require("bcrypt");

//check if username exists in signup
router.post('/username', async (req, res) => {
    const {username} = req.body;
    const usernameExist = await Manager.findOne({ where: {username: username} })
    usernameExist ? res.send(usernameExist).json : res.json("");
});

// check if email exists in signup
router.post('/email', async (req, res) => {
    const {email} = req.body;
    const emailExist = await Manager.findOne({ where: {email: email} })
    emailExist ? res.send(emailExist).json : res.json("");
});

// Post API for when a manager signs up
router.post('/Manager', async (req, res) => {
    const {first_name, last_name, username, email, password, restaurant_name, restaurant_address, restaurant_city, restaurant_state, restaurant_zip} = req.body;
    await bcrypt.hash(password, 10).then((hash) =>{
        Manager.create({
            first_name: first_name,
            last_name: last_name,
            username: username,
            email: email,
            password: hash,
            restaurant_name: restaurant_name,
            restaurant_address: restaurant_address,
            restaurant_city: restaurant_city,
            restaurant_state: restaurant_state,
            restaurant_zip: restaurant_zip
        })
    })

    if (res.status(200)){
        res.json("SUCCESS");
    }else(
        console.log(res.status)
    )
});

module.exports = router;