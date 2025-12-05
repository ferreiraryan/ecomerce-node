import { Router } from 'express';
import { createOrder, getOrderById, getUserOrders } from '../controllers/orderController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.use(authMiddleware);

router.post('/', authMiddleware, createOrder);
router.get('/myorders', authMiddleware, getUserOrders);
router.get('/:id', authMiddleware, getOrderById);

export default router;
