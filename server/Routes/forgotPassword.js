const express = require('express');
const router = express.Router();
const {Manager} = require('../models');

//check if username exists in signup
router.post('/Email', async (req, res) => {
    const {email} = req.body;
    const emailExist = await Manager.findOne({ where: {email: email} })
    emailExist ? res.send(emailExist).json : res.json("");
});

module.exports = router;