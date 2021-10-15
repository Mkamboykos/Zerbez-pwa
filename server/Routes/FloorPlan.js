const express = require('express');
const router = express.Router();
const {authenticateToken} = require('../middlewares/verifyTokenMiddleware');


module.exports = router;