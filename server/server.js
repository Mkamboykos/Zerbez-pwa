// const database = require('./config/DatabaseConfig');
const Sequelize = require('sequelize');
const express = require('express');
const app = express();
const database = require("./models");
const cors = require('cors'); 
const cookieParser = require('cookie-parser');
const session = require('express-session');
const dotenv = require('dotenv').config();
const db_config = require('./config/config');
const PORT = process.env.PORT;
const ErrorHandler = require('./error/ErrorHandler');
const DB_DATABASE = process.env.DB_DATABASE;
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_PORT = process.env.DB_PORT;
const DB_HOST = process.env.DB_HOST;
// Enable cookie dependency
app.use(cookieParser());

// This is to allow our api to receive data from a client app
app.use(express.urlencoded({extended: true}));

// This is to allow our api for parsing json
app.use(express.json());

// This is to allow our api for cross-origin resource sharing

app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["POST, GET, PUT, DELETE"],
    credentials: true
}));
// app.use(cors());

// Create a session that will last up to 24 hours before expiring
// app.use(session({
//     key: "sid",
//     secret: "subscribe",
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//         httpOnly: true,
//         // secure: true,
//         expires: 60 * 60 * 24,
//     },
// }))

// Import Routes
const authRouter = require('./Routes/Auth');
const signupRouter = require('./Routes/signUp');
const forgotRouter = require('./Routes/Forgot');
const floorPlanRouter = require('./Routes/FloorPlan');


// Route Middlewares
app.use('/Auth', authRouter);
app.use('/SignUp', signupRouter);
app.use('/Forgot', forgotRouter);
app.use('./FloorPlan', floorPlanRouter);

// Apply error handler to every call
app.use(ErrorHandler);

// app.use((err, req, res, next) => {
//     res.locals.error = err;
//     const errorStatus = err.status || 500;
//     res.status(errorStatus);
//     res.render('error');
// });

// Test database connection is working
const sequelize = new Sequelize(DB_DATABASE || 'mysql',
                                DB_USERNAME || 'mysql',
                                DB_PASSWORD || '',
                                {
                                    host: DB_HOST,
                                    port: DB_PORT,
                                    dialect: 'mysql',
                                    // dialectOptions: {
                                    //     ssl: DB_SSL == true
                                    // }
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
