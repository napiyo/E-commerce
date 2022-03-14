const express = require('express');
const { makeOrder, getSingleOrder, getMyOrders, getAllOrders, updateOrderStatus, cancelMyOrder } = require('../controllers/orderController');
const {isAuthenticated,authorizedRoles} = require('../middleware/auth');
const Router = express.Router();

Router.route('/newOrder').post(isAuthenticated,makeOrder)
Router.route('/details/:id').get(isAuthenticated,authorizedRoles("admin"),getSingleOrder)
Router.route('/myOrders').get(isAuthenticated,getMyOrders);
Router.route('/allOrders').get(isAuthenticated,authorizedRoles("admin"),getAllOrders);
Router.route('/updateOrderStatus/:id').put(isAuthenticated,authorizedRoles("admin"),updateOrderStatus);
Router.route('/cancelMyOrder/:id').put(isAuthenticated,cancelMyOrder);
module.exports =Router;