const express = require('express');
const { registerUser, getUsers, loginUser, logout, forgotPassword, resetpassword, getUserDetails, updatePassword, updateProfile, userDetails, updateUserRole, deleteUser } = require('../controllers/userController');
const Router = express.Router();
const {isAuthenticated, authorizedRoles} = require('../middleware/auth');

Router.route('/newUserRegister').post(registerUser);
Router.route('/admin/allUsers').get(isAuthenticated,authorizedRoles("admin"),getUsers);
Router.route('/login').post(loginUser);
Router.route('/logout').post(logout);
Router.route('/password/forgot').post(forgotPassword);
Router.route('/password/reset/:token').put(resetpassword);
Router.route('/profile').get(isAuthenticated, getUserDetails);
Router.route('/profile/updatePassword').get(isAuthenticated, updatePassword);
Router.route('/profile/updateProfile').put(isAuthenticated, updateProfile);
Router.route('/admin/userProfile/:id').get(isAuthenticated, authorizedRoles("admin"),userDetails);
Router.route('/admin/userActions/:id').put(isAuthenticated, authorizedRoles("admin"),updateUserRole)
.delete(isAuthenticated, authorizedRoles("admin"),deleteUser);

module.exports = Router;