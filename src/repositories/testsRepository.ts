import db from '../database';
import { Test, ParsedNewTestData } from '../types/testTypes';

export async function insertTest(data: ParsedNewTestData): Promise<void> {
  await db.test.create({
    data: {
      name: data.name,
      pdfUrl: data.pdfUrl,
      categoryId: data.categoryId,
      teacherDisciplineId: data.teacherDisciplineId
    }
  });
}