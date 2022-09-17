import { generateToken, signUpUser, validateCredentials } from '../services/authService';
import sendResponse from '../repositories/responseRepository';
import { Request, Response } from 'express';
import { User, SignInData, SignUpData } from '../types/userTypes';

export async function signIn(req: Request, res: Response) {
  const user: User = await validateCredentials(req.body as SignInData);
  const token: string = generateToken(user.id);
  return sendResponse({ type: 'Ok', message: { token } }, res);
};

export async function signUp(req: Request, res: Response) {
  await signUpUser(req.body as SignUpData);
  return sendResponse({ type: 'Created' }, res);
};