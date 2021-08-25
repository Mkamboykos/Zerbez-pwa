const database = require('../Config/DatabaseConfig');
const express = require('express');
const router = express.Router();


//check if username exists in signup
router.post('/username', (req, res) => {
    const username = req.body.username;
    database.query("SELECT username FROM sign_up_manager WHERE username = ?",[username],
        (err, results) => {
            !err ? res.send(results).json : res.json(err);
        }
    );
});

//check if email exists in signup
router.post('/email', (req, res) => {
    const email = req.body.email;
    database.query("SELECT email FROM sign_up_manager WHERE email = ?",[email],
        (err, results) => {
            !err ? res.send(results).json : res.json(err);
        }
    );
});

// Post API for when a manager signs up
router.post('/user', (req, res) => {

    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const retypePassword = req.body.retypePassword;
    const restaurant_name = req.body.restaurant_name;
    const restaurant_address = req.body.restaurant_address;
    const restaurant_city = req.body.restaurant_city;
    const restaurant_state = req.body.restaurant_state;
    const restaurant_zip = req.body.restaurant_zip;

    database.query("INSERT INTO sign_up_manager (first_name, last_name, username, email, password, confirm_password, restaurant_name, restaurant_address, restaurant_city, restaurant_state, restaurant_zip) VALUES (?,?,?,?,?,?,?,?,?,?,?)",
        [first_name, last_name, username, email, password, retypePassword, restaurant_name, restaurant_address, restaurant_city, restaurant_state, restaurant_zip],
        (err, results) => {
            !err ? res.json(results) : res.json(err);
        });
});


module.exports = router;