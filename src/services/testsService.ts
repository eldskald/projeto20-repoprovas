import { insertTest, findByDiscTermCat } from '../repositories/testsRepository';
import { findCategoryByName } from '../repositories/categoryRepository';
import { findTDByNames } from '../repositories/teachersDisciplinesRepository';
import { NewTestData, ParsedNewTestData } from '../types/testTypes';

export async function newTest(data: NewTestData): Promise<void> {
  const category = await findCategoryByName(data.category);
  if (!category) throw { type: 'Not Found', message: 'Category not found' };
  const teacherDiscipline = await findTDByNames(data.teacher, data.discipline);
  if (!teacherDiscipline) throw { type: 'Not Found', message: 'Teacher-discipline combination not found' };
  const parsedData: ParsedNewTestData = {
    name: data.name,
    pdfUrl: data.pdfUrl,
    categoryId: category.id,
    teacherDisciplineId: teacherDiscipline.id
  };
  await insertTest(parsedData);
}

export async function listByDisciplines() {
  return await findByDiscTermCat();
}