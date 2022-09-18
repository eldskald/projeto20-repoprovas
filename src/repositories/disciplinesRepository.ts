import db from '../database';
import { Discipline } from '@prisma/client';

export async function findDisciplineById(id: number): Promise<Discipline | null> {
  return await db.discipline.findUnique({ where: { id } });
}

export async function findDisciplineByName(name: string): Promise<Discipline | null> {
  return await db.discipline.findUnique({ where: { name }});
}