import express from "express";
const router = express.Router();
import { createCategory, updateCategory, deleteCategory, listCategories, getCategory } from "../controllers/categoryControllers.js";
import { authenticate, authorizeAdmin } from "../middlewares/auth.js";


router.route('/').post(authenticate, authorizeAdmin, createCategory);
router.route('/:categoryId').put(authenticate, authorizeAdmin, updateCategory);
router.route('/:categoryId').delete(authenticate, authorizeAdmin, deleteCategory);
router.route('/categories').get(listCategories);
router.route('/:id').get(getCategory);

export default router;