import { Router } from 'express';
import * as orderController from '../controllers/orderController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.use(authMiddleware);

router.post('/', orderController.createOrder);
router.get('/myorders', orderController.getUserOrders);

export default router;
