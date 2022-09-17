import { Router } from 'express';
import { signIn, signUp } from '../controllers/authController';
import schemaValidation from '../middlewares/schemaValidation';
import signInSchema from '../schemas/signInSchema';
import signUpSchema from '../schemas/signUpSchema';

const authRouter = Router();
authRouter.post('/sign-in', schemaValidation(signInSchema), signIn);
authRouter.post('/sign-up', schemaValidation(signUpSchema), signUp);
export default authRouter;