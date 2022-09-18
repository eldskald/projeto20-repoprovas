import { validateToken } from '../services/authService';
import { Request, Response, NextFunction } from 'express';

async function tokenValidation(req: Request, res: Response, next: NextFunction) {
  if (!req.headers.authorization) throw { type: 'Unauthorized' };
  const auth: string = req.headers.authorization;
  if (auth.slice(0, 7) != 'Bearer ') throw { type: 'Unauthorized' };
  res.locals.user = await validateToken(auth.replace('Bearer ', ''))
  next();
}

export default tokenValidation;