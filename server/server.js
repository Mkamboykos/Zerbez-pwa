const database = require('./Config/DatabaseConfig');
const express = require('express');
const app = express();
const cors = require('cors'); 
const {body, validationResult } = require('express-validator');
const port = process.env.PORT || 3001;

// This is to allow our api for parsing json
app.use(express.json());

// This is to allow our api for cross-origin resource sharing
app.use(cors());

// This is to allow our api to receive data from a client app
app.use(express.urlencoded({extended: true}));

// Import Routes
const authRoute = require('./Routes/Authentication');
const signupRoute = require('./Routes/signup');

// Route Middlewares
app.use('/user', authRoute);
app.use('/SignUp', signupRoute);

// Home user login
app.post('/login', 
    body('username').isString(),
    body('password').isLength({ min: 8, max: 20 }), 
    (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }

        const username = req.body.username;
        const password = req.body.password;

        database.query("SELECT username, password FROM sign_up_manager WHERE username = ? and password = ?",[username, password],
            (err, results) => {
                !err ? res.send(results).json : res.json(err);
            }
        );
    }
);


// Test server connection is working
// app.get('/', (req, res) => {
//     res.send({
//         msg: 'Connection is working!'
//     });
// });

// test database connection
database.connect((err) => {
    if(err){
      console.log('Error connecting to Db');
      return;
    }
    console.log('Connection established');
});

// set port, listen for requests
app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});