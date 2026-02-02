import { getCurrentUser, setupCrypto } from '@/controller';
import { authMiddleware } from '@/middleware';
import { Router } from 'express';

const userRouter = Router({ mergeParams: true });

userRouter.get('/current-user', authMiddleware, getCurrentUser);

userRouter.patch('/setup-crypto', authMiddleware, setupCrypto);

export { userRouter };
