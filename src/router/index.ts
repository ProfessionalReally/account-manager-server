import { Router } from 'express';
import { accountRouter, authRouter, categoryRouter, serviceRouter, userRouter } from './routes';

const router = Router({ mergeParams: true });

router.use('/auth', authRouter);
router.use('/categories', categoryRouter);
router.use('/services', serviceRouter);
router.use('/accounts', accountRouter);
router.use('/user', userRouter);

export { router };
