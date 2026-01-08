import { addService, deleteService, getService, getServices, updateService } from '@/controller';
import { authMiddleware } from '@/middleware';
import { Router } from 'express';

const serviceRouter = Router({ mergeParams: true });

serviceRouter.get('/:id', authMiddleware, getService);

serviceRouter.get('/', authMiddleware, getServices);

serviceRouter.post('/', authMiddleware, addService);

serviceRouter.patch('/:id', authMiddleware, updateService);

serviceRouter.delete('/:id', authMiddleware, deleteService);

export { serviceRouter };
