import express from 'express';
import {createUser, userLogin, logoutUser, getAllUsers, getProfile, updateUser, deleteUser, getUserById, updateUserById} from '../controllers/userControllers.js';
import { authenticate, authorizeAdmin} from '../middlewares/auth.js'
const router = express.Router();

router.route('/').post(createUser);
router.route('/').get(authenticate, authorizeAdmin, getAllUsers);
router.post('/auth', userLogin);
router.post('/logout', logoutUser);
router.route('/profile').get(authenticate, getProfile).put(authenticate, updateUser);
router.route('/:_id').delete(authenticate, authorizeAdmin, deleteUser).get(authenticate, authorizeAdmin, getUserById).put(authenticate, authorizeAdmin, updateUserById);

export default router;