import express from 'express';
import formidable from 'express-formidable';
import { addProduct, updateProduct, deleteProduct, fetchProducts, fetchProductById, fetchAllProducts, addProductReview, fetchTopProducts, fetchNewProducts, filterProducts } from '../controllers/productControllers.js';
import { authenticate, authorizeAdmin } from '../middlewares/auth.js';
import checkId from '../middlewares/checkId.js';
import { upload } from '../routes/uploadRoutes.js';

const router = express.Router();

router.route('/')
    .post(authenticate, authorizeAdmin, formidable(), addProduct)
    .get(fetchProducts);
    
router.route('/allproducts').get(fetchAllProducts);

router.route('/top').get(fetchTopProducts);
router.route('/new').get(fetchNewProducts);
router.route('/:id')
    .get(fetchProductById)
    .put(authenticate, authorizeAdmin, upload.single('image'), updateProduct)
    .delete(authenticate, authorizeAdmin, deleteProduct);

router.route('/:id/reviews').post(authenticate, checkId, addProductReview);

router.route('/filtered-products').post(filterProducts)
export default router;
