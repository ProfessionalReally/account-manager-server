import { Router } from 'express';
import { authRouter } from './routes';

const router = Router({ mergeParams: true });

router.use('/auth', authRouter);

export { router };
