import db from '../database';
import { ParsedNewTestData } from '../types/testTypes';

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
                  TeacherDiscipline: { select: { Teacher: { select: { name: true } } } }
                }
              }
            }
          }
        }
      }
    }
  });

  // Reorganizes results as [ {termNumber, [ {disciplineName, Tests[]} ]} ]
  // by listing all tests under each TeacherDiscipline in a single array.
  const reorganized: {
    number: number,
    disciplines: {
      name: string,
      tests: {
        id: number,
        name: string,
        pdfUrl: string,
        teacher: string,
        category: string
      }[]
    }[]
  }[] = [];
  for (const term of results) {
    const disciplines = [];
    for (const discipline of term.Discipline) {
      const tests = [];
      for (const teacherDiscipline of discipline.TeacherDiscipline) {
        for (const test of teacherDiscipline.Test) {
          const testObj = {
            id: test.id,
            name: test.name,
            pdfUrl: test.pdfUrl,
            teacher: test.TeacherDiscipline.Teacher.name,
            category: test.Category.name
          };
          tests.push(testObj);
        }
      }
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
    number: number;
    disciplines: {
      name: string,
      categories: {
        name: string,
        tests: {
          id: number,
          name: string,
          pdfUrl: string,
          teacher: string,
          category: string
        }[]
      }[]
    }[]
  }[] = [];
  for (const term of reorganized) {
    const disciplines = [];
    for (const discipline of term.disciplines) {
      const categories = [];
      const tests = [...discipline.tests];
      while (tests.length > 0) {
        const categoryName: string = tests[tests.length - 1].category;
        const categoryTests = [];
        let i: number = tests.length - 1;
        while (i >= 0) {
          if (tests[i].category === categoryName) {
            categoryTests.push(tests[i]);
            tests.splice(i, 1);
          }
          i--;
        }
        categories.push({
          name: categoryName,
          tests: categoryTests
        });
      }
      disciplines.push({
        name: discipline.name,
        categories
      })
    }
    rereorganized.push({
      number: term.number,
      disciplines
    });
  }

  return rereorganized;
}