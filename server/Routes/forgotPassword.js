const express = require('express');
const router = express.Router();
const {Manager} = require('../models');

//check if username exists in signup
router.post('/Email', async (req, res) => {
    const {email} = req.body;
    const emailExist = await Manager.findOne({ where: {email: email} });
    
    if(emailExist && email === emailExist.email){
        res.send(emailExist).json
    }else{
        res.status(404).send({error:'Email could not be found!'});
    }
});

module.exports = router;