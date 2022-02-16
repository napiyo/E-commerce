const express = require('Express');
const { getAllProducts, createProduct, updateProduct, DeleteProduct, getSingleProduct } = require('../controllers/productController.js');


const router = express.Router();

router.route('/').get(getAllProducts)
router.route('/:id').get(getSingleProduct)
router.route('/addProduct').post(createProduct);
router.route('/updateProduct/:id').put(updateProduct).delete(DeleteProduct);


module.exports = router;