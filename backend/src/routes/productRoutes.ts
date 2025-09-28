import { Router } from 'express';
import * as productController from '../controllers/productController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { adminMiddleware } from '../middlewares/adminMiddleware';

const router = Router();

// Rotas Públicas (Read)
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);

// Rotas Protegidas para Admins (Create, Update, Delete)
router.post('/', authMiddleware, adminMiddleware, productController.createProduct);
router.put('/:id', authMiddleware, adminMiddleware, productController.updateProduct);
router.delete('/:id', authMiddleware, adminMiddleware, productController.deleteProduct);

export default router;
