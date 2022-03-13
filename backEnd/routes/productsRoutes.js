const express = require('Express');
const { getAllProducts, createProduct, updateProduct, DeleteProduct, getSingleProduct, addReview, getReview, deleteReview, getTopSellingProducts, getAllCategories, getOutOfStockProducts } = require('../controllers/productController.js');
const { isAuthenticated, authorizedRoles } = require('../middleware/auth.js');


const router = express.Router();

router.route('/topSellingProducts/:count').get(getTopSellingProducts)
router.route('/addProduct').post(isAuthenticated,authorizedRoles("admin"),createProduct);
router.route('/updateProduct/:id').put(isAuthenticated,authorizedRoles("admin"),updateProduct)
.delete(isAuthenticated,authorizedRoles("admin"),DeleteProduct);
router.route('/addReview/:id').post(isAuthenticated,addReview).delete(isAuthenticated,authorizedRoles("admin"),deleteReview);
router.route('/allCategories').get(getAllCategories);
router.route('/outofstock').get(getOutOfStockProducts);
router.route('/:id').get(getSingleProduct)
router.route('/').get(getAllProducts)



module.exports = router;