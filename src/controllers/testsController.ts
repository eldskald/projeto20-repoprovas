import { newTest, listByDisciplines } from '../services/testsService';
import sendResponse from '../repositories/responseRepository';
import { Request, Response } from 'express';
import { NewTestData } from '../types/testTypes';

export async function postTest(req: Request, res: Response) {
  await newTest(req.body as NewTestData);
  return sendResponse({ type: 'Created' }, res);
}

export async function getByCategory(_req: Request, res: Response) {
  const list = await listByDisciplines();
  return sendResponse({ type: 'Ok', message: list }, res);
}