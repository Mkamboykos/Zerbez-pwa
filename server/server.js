// const database = require('./config/DatabaseConfig');
const Sequelize = require('sequelize');
const express = require('express');
const app = express();
const database = require("./models");
const cors = require('cors'); 
const dotenv = require('dotenv').config()
const DB_DATABASE = process.env.DB_DATABASE;
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const PORT = process.env.PORT;

// This is to allow our api to receive data from a client app
app.use(express.urlencoded({extended: true}));

// This is to allow our api for parsing json
app.use(express.json());

// This is to allow our api for cross-origin resource sharing
app.use(cors());

// Import Routes
const authRoute = require('./Routes/Authentication');
const signupRoute = require('./Routes/signUp');
const forgotPasswordRoute = require('./Routes/forgotPassword');

// Route Middlewares
app.use('/Auth', authRoute);
app.use('/SignUp', signupRoute);
app.use('/ForgotPassword', forgotPasswordRoute);

// Test database connection is working
const sequelize = new Sequelize(DB_DATABASE, DB_USERNAME, DB_PASSWORD, {
    dialect: 'mysql',
});

sequelize.authenticate().then(() => {
    console.log("\n*** Successfully connected to database ***\n");
}).catch((err) => {
    console.log(err);
})

// set port, listen for requests
database.sequelize.sync().then(() => {
    app.listen(process.env.PORT || PORT, () => {
        console.log("\n*** " + `Listening at http://localhost:${PORT}` + " ***\n");
    });
})
