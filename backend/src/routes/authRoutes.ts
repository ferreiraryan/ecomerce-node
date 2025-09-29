import { Router } from 'express';
import { getProfile, loginUser, registerUser } from '../controllers/authController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { validate } from '../middlewares/validateMiddleware';
import { loginSchema, registerSchema } from '../schemas/authSchemas';

const router = Router();

router.post('/register', validate(registerSchema), registerUser);
router.post('/login', validate(loginSchema), loginUser);

router.get('/profile', authMiddleware, getProfile);

export default router;
