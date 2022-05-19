const express = require('express');
const router = express.Router();
const {authenticateUser} = require('../middlewares/verifyTokenMiddleware');


module.exports = router;