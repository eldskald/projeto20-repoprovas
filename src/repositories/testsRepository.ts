import db from '../database';
import {
  getTestsFromTeacherDiscipline,
  groupTestsByCategories,
  ParsedTest,
  ParsedCategory
} from '../utils/testsOrganizers';
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

export async function findByDiscTermCat() {
  const results = await db.term.findMany({
    select: {
      number: true,
      Discipline: {
        select: {
          name: true,
          TeacherDiscipline: {
            select: {
              Test: {
                include: {
                  Category: { select: { name: true } },
                  TeacherDiscipline: {
                    select: {
                      Teacher: { select: { name: true } },
                      Discipline: { select: { name: true } }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  });

  // Reorganizes results as [ {termNumber, [ {disciplineName, ParsedTest[]} ]} ]
  // by listing all tests under each TeacherDiscipline in a single array.
  const reorganized: {
    number: number,
    disciplines: {
      name: string,
      tests: ParsedTest[]
    }[]
  }[] = [];
  for (const term of results) {
    const disciplines = [];
    for (const discipline of term.Discipline) {
      const tests = getTestsFromTeacherDiscipline(discipline.TeacherDiscipline);
      disciplines.push({
        name: discipline.name,
        tests
      });
    }
    reorganized.push({
      number: term.number,
      disciplines
    });
  }

  // Group tests on the array above by category.
  const rereorganized: {
    number: number,
    disciplines: {
      name: string,
      categories: ParsedCategory[]
    }[]
  }[] = [];
  for (const term of reorganized) {
    const disciplines = [];
    for (const discipline of term.disciplines) {
      const categories = groupTestsByCategories(discipline.tests);
      disciplines.push({
        name: discipline.name,
        categories
      });
    }
    rereorganized.push({
      number: term.number,
      disciplines
    });
  }
  return rereorganized;
}

export async function findByTeacherCat() {
  const results = await db.teacher.findMany({
    select: {
      name: true,
      TeacherDiscipline: {
        select: {
          Test: {
            include: {
              Category: { select: { name: true } },
              TeacherDiscipline: {
                select: {
                  Teacher: { select: { name: true } },
                  Discipline: { select: { name: true } }
                }
              }
            }
          }
        }
      }
    }
  });

  // Reorganize results type to [teacherName, ParsedTests[] ] by listing
  // all tests on each TeacherDiscipline pair on a single array of tests.
  const reorganized: {
    name: string,
    tests: ParsedTest[]
  }[] = [];
  for (const teacher of results) {
    const tests = getTestsFromTeacherDiscipline(teacher.TeacherDiscipline);
    reorganized.push({
      name: teacher.name,
      tests
    });
  }

  // Reorganize array above to group tests by category.
  const rereorganized: {
    name: string,
    categories: ParsedCategory[]
  }[] = [];
  for (const teacher of reorganized) {
    const categories = groupTestsByCategories(teacher.tests);
    rereorganized.push({
      name: teacher.name,
      categories
    });
  }
  return rereorganized;
}