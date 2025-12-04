import { Router } from 'express';
import { createOrder, getUserOrders } from '../controllers/orderController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.use(authMiddleware);

router.post('/', authMiddleware, createOrder);
router.get('/myorders', getUserOrders);

export default router;
