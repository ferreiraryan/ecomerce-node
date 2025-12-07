import { Router } from 'express';
import { getAllCategories, createCategory, deleteCategory } from '../controllers/categoryController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { adminMiddleware } from '../middlewares/adminMiddleware';

const router = Router();

router.use();

router.get('/', getAllCategories);

router.post('/', authMiddleware, adminMiddleware, createCategory);

router.delete('/:id', authMiddleware, adminMiddleware, deleteCategory);


export default router;
