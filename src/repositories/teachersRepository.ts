import db from '../database';
import { Teacher } from '@prisma/client';

export async function findTeacherById(id: number): Promise<Teacher | null> {
  return await db.teacher.findUnique({ where: { id } });
};

export async function findTeacherByName(name: string): Promise<Teacher | null> {
  return await db.teacher.findUnique({ where: { name } });
};