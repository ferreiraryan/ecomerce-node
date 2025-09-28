import { Router } from 'express';
import { getProfile, loginUser, registerUser } from '../controllers/authController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', authMiddleware, getProfile);

export default router;
