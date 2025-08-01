import express from "express";
const router = express.Router()

import {authenticate, authorizeAdmin} from '../middlewares/auth.js';
import { createOrder, getUserOrders } from "../controllers/orderControllers.js";

router.route('/').post(authenticate, createOrder);
router.route('/mine').get(authenticate, getUserOrders);
// router.route('/total-orders').get(countTotalOrders)

export default router;