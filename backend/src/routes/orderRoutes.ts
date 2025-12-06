import { Router } from 'express';
import { createOrder, getAllOrdersAdmin, getOrderById, getUserOrders, updateOrderStatus } from '../controllers/orderController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { adminMiddleware } from '../middlewares/adminMiddleware';

const router = Router();

router.use(authMiddleware);

router.post('/', authMiddleware, createOrder);
router.get('/myorders', authMiddleware, getUserOrders);
router.get('/:id', authMiddleware, getOrderById);

router.get('/admin/all', authMiddleware, adminMiddleware, getAllOrdersAdmin);
router.patch('/admin/:id/status', authMiddleware, adminMiddleware, updateOrderStatus);

export default router;
