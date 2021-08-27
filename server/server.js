// const database = require('./config/DatabaseConfig');
const Sequelize = require('sequelize');
const express = require('express');
const app = express();
const database = require("./models");
const cors = require('cors'); 
const port = process.env.PORT || 3001;

// This is to allow our api to receive data from a client app
app.use(express.urlencoded({extended: true}));

// This is to allow our api for parsing json
app.use(express.json());

// This is to allow our api for cross-origin resource sharing
app.use(cors());

// Import Routes
const authRoute = require('./Routes/Authentication');
const signupRoute = require('./Routes/signup');

// Route Middlewares
app.use('/Auth', authRoute);
app.use('/SignUp', signupRoute);

// Test database connection is working
const sequelize = new Sequelize('time_waiter_db', 'root', 'password', {
    dialect: 'mysql',
});

sequelize.authenticate().then(() => {
    console.log("\n*** Successfully connected to database ***\n");
}).catch((err) => {
    console.log(err);
})

// set port, listen for requests
database.sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log("\n*** " + `Listening at http://localhost:${port}` + " ***\n");
    });
})
