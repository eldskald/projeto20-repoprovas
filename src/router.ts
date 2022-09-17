import { Router } from 'express';
import authRouter from './routers/authRouter';

const router = Router();
router.use(authRouter);
export default router;