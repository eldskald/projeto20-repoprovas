import { Router } from 'express';
import schemaValidation from '../middlewares/schemaValidation';
import tokenValidation from '../middlewares/tokenValidation';
import { newTest } from '../controllers/testsController';
import testSchema from '../schemas/testSchema';

const testsRouter = Router();
testsRouter.post(
  '/tests',
  tokenValidation,
  schemaValidation(testSchema),
  newTest
);
export default testsRouter;