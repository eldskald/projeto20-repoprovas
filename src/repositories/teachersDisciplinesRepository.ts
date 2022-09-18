import db from '../database';
import { TeacherDiscipline } from '@prisma/client';

export async function findTDById(id: number): Promise<TeacherDiscipline | null> {
  return await db.teacherDiscipline.findUnique({ where: { id } });
}

export async function findTDByNames(teacher: string, discipline: string): Promise<TeacherDiscipline | null> {
  return await db.teacherDiscipline.findFirst({
    where: {
      Teacher: { name: teacher },
      Discipline: { name: discipline }
    }
  });
}