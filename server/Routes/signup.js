const express = require('express');
const router = express.Router();
const {Manager} = require('../models');
const bcrypt = require('bcrypt');
const ManagerService = require('../Service/ManagerService');
const {body, validationResult} = require('express-validator');
const ValidationException = require('../Exceptions/ValidationException');


// Post API for when a manager signs up
router.post('/Manager',[
    body('first_name').trim().notEmpty().withMessage('Field cannot be empty!').bail().isAlpha().withMessage('Field can only have letters!').bail(),
    body('last_name').trim().notEmpty().withMessage('Field cannot be empty!').bail().isAlpha().withMessage('Field can only have letters!').bail(),
    body('username').trim().notEmpty().withMessage('Field cannot be empty!').bail().isAlphanumeric().withMessage('Field can only have letters and numbers!').bail()
        .custom( async (username) => {
            const usernameExist = await ManagerService.findByUsername(username);

            if(usernameExist){
                throw new Error('Username already exist!');
            }
        }),
    body('email').trim().notEmpty().withMessage('Field cannot be empty!').bail().isEmail().withMessage('This is not a valid email!').bail().normalizeEmail()
        .custom( async (email) => {
            const emailExist = await ManagerService.findByEmail(email);

            if(emailExist){
                throw new Error('This email is already being used!');
            }
        }),
    body('password').trim().notEmpty().withMessage('Field cannot be empty!').bail().isLength({min: 8}).withMessage('Password is too short!').bail().isLength({max:20}).withMessage('Password is too long!').bail(),
    body('restaurant_name').trim().notEmpty().withMessage('Field cannot be empty!').bail(),
    body('restaurant_address').trim().notEmpty().withMessage('Field cannot be empty!').bail(),
    body('restaurant_city').trim().notEmpty().withMessage('Field cannot be empty!').bail().isAlpha().withMessage('Field cannot have numbers!'),
    body('restaurant_state').trim().notEmpty().withMessage('Field cannot be empty!').bail(),
    body('restaurant_zip').trim().notEmpty().withMessage('Field cannot be empty!').bail().isNumeric().withMessage('ZIP Code can only have numbers!').bail()
], async (req, res, next) => {
    const {first_name, last_name, username, email, password, restaurant_name, restaurant_address, restaurant_city, restaurant_state, restaurant_zip} = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return next(new ValidationException(errors.array()));
    }

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