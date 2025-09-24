import { Router } from 'express';
import { registerUser } from '../ontrollers/authController';

const router = Router();

router.post('/register', registerUser);

export default router;
