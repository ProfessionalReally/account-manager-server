import { getCategories, addCategory, updateCategory, deleteCategory } from '@/controller';
import { authMiddleware } from '@/middleware';
import { Router } from 'express';

const categoryRouter = Router({ mergeParams: true });

categoryRouter.get('/', authMiddleware, getCategories);

categoryRouter.post('/', authMiddleware, addCategory);

categoryRouter.patch('/:id', authMiddleware, updateCategory);

categoryRouter.delete('/:id', authMiddleware, deleteCategory);

export { categoryRouter };
