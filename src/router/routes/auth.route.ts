import { getCurrentUser, loginUser, logoutUser, registerUser } from '@/controller';
import { authMiddleware } from '@/middleware';
import { Router } from 'express';

const authRouter = Router({ mergeParams: true });

authRouter.post('/register', registerUser);

authRouter.post('/login', loginUser);

authRouter.post('/logout', logoutUser);

export { authRouter };
