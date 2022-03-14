const express = require('express');
const { newOrder } = require('../controllers/paymentsController');
const { isAuthenticated } = require('../middleware/auth');
const router = express.Router();

router.route('/newOrder').post(isAuthenticated,newOrder);

module.exports =router;
