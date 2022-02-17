const express = require('express');
const { registerUser, getUsers, loginUser, logout } = require('../controllers/userController');
const Router = express.Router();

Router.route('/newUserRegister').post(registerUser);
Router.route('/allUsers').get(getUsers);
Router.route('/login').post(loginUser);
Router.route('/logout').post(logout);

module.exports = Router;