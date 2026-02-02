import { Router } from 'express';
import { authMiddleware } from '@/middleware';
import { addAccount, deleteAccount, getAccount, getAccounts, updateAccount } from '@/controller';

const accountRouter = Router({ mergeParams: true });

accountRouter.get('/', authMiddleware, getAccounts);

accountRouter.get('/:id', authMiddleware, getAccount);

accountRouter.post('/', authMiddleware, addAccount);

accountRouter.patch('/:id', authMiddleware, updateAccount);

accountRouter.delete('/:id', authMiddleware, deleteAccount);

export { accountRouter };
