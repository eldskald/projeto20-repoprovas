import { Router } from 'express';
import schemaValidation from '../middlewares/schemaValidation';
import tokenValidation from '../middlewares/tokenValidation';
import { postTest, getByCategory, getByTeacher } from '../controllers/testsController';
import testSchema from '../schemas/testSchema';

const testsRouter = Router();
testsRouter.post(
  '/tests',
  tokenValidation,
  schemaValidation(testSchema),
  postTest
);
testsRouter.get(
  '/tests/by-discipline',
  tokenValidation,
  getByCategory
);
testsRouter.get(
  '/tests/by-teacher',
  tokenValidation,
  getByTeacher
);
export default testsRouter;