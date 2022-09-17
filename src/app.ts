import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import errorHandler from './middlewares/errorHandler';
import router from './router';

const app = express();
app.use(express.json());
app.use(cors());
app.use(router);
app.use(errorHandler);

export default app;