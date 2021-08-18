const express = require("express");
const app = express();
const cors = require('cors');

const mysql = require('mysql');

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'password',
    database: 'time_waiter_db'
});

// app.get('/', (request, response) => {
//     const username = request.body.username;
//     const password = request.body.password;

//     db.query('SELECT * FROM Login')
// });


// Post API for when a manager signs up
app.post('/SignUp', (req, res) => {

    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const confirm_password = req.body.confirm_password;
    const restaurant_name = req.body.restaurant_name;
    const restaurant_address = req.body.restaurant_address;
    const restaurant_city = req.body.restaurant_city;
    const restaurant_state = req.body.restaurant_state;
    const restaurant_zip = req.body.restaurant_zip;

    db.query("INSERT INTO sign_up_manager (first_name, last_name, username, email, password, confirm_password, restaurant_name, restaurant_address, restaurant_city, restaurant_state, restaurant_zip) VALUES (?,?,?,?,?,?,?,?,?,?,?)",
        [first_name, last_name, username, email, password, confirm_password, restaurant_name, restaurant_address, restaurant_city, restaurant_state, restaurant_zip],
        (err, result) => {
            if (err) {
                console.log(err);
            }else{
                response.send("Values Inserted");
            }
        }
    );
});


// set port, listen for requests
// const PORT = process.env.PORT || 3001;
// app.listen(PORT, () => {
//     console.log(`Your server is running on port ${PORT}.`);
// });
app.listen(3001, () => {
    console.log("Your server is running on port 3001");
});