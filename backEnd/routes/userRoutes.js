const express = require('express');
const { registerUser, getUsers, loginUser } = require('../controllers/userController');
const Router = express.Router();

Router.route('/newUserRegister').post(registerUser);
Router.route('/allUsers').get(getUsers);
Router.route('/login').post(loginUser);

module.exports = Router;