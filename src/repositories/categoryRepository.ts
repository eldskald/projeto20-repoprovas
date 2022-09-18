import db from '../database';
import { Category } from '@prisma/client';

export async function findCategoryById(id: number): Promise<Category | null> {
  return await db.category.findUnique({ where: { id } });
}

export async function findCategoryByName(name: string): Promise<Category | null> {
  return await db.category.findUnique({ where: { name }});
}