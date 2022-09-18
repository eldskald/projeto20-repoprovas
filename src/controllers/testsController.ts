import * as service from '../services/testsService';
import sendResponse from '../repositories/responseRepository';
import { Request, Response } from 'express';
import { NewTestData } from '../types/testTypes';

export async function newTest(req: Request, res: Response) {
  await service.newTest(req.body as NewTestData);
  return sendResponse({ type: 'Created' }, res);
}