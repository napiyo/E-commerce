const express = require('express');
const { registerUser, getUsers, loginUser, logout, forgotPassword, resetpassword } = require('../controllers/userController');
const Router = express.Router();

Router.route('/newUserRegister').post(registerUser);
Router.route('/allUsers').get(getUsers);
Router.route('/login').post(loginUser);
Router.route('/logout').post(logout);
Router.route('/password/forgot').post(forgotPassword);
Router.route('/password/reset/:token').put(resetpassword);

module.exports = Router;