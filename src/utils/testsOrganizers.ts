import { Test } from '@prisma/client';

export type ParsedTest = {
  id: number,
  name: string,
  pdfUrl: string,
  teacher: string,
  discipline: string,
  category: string
};

export type ParsedCategory = {
  name: string,
  tests: ParsedTest[]
};

export function getTestsFromTeacherDiscipline(
  arr: { 
    Test: (
      Test &
      {
        Category: { name: string; },
        TeacherDiscipline: {
          Teacher: { name: string; },
          Discipline: { name: string; }
        }
      }
    )[]
  }[]
): ParsedTest[] {
  const tests: ParsedTest[] = [];
  for (const teacherDiscipline of arr) {
    for (const test of teacherDiscipline.Test) {
      const testObj = {
        id: test.id,
        name: test.name,
        pdfUrl: test.pdfUrl,
        teacher: test.TeacherDiscipline.Teacher.name,
        discipline: test.TeacherDiscipline.Discipline.name,
        category: test.Category.name
      };
      tests.push(testObj);
    }
  }
  return tests;
}

export function groupTestsByCategories(arr: ParsedTest[]): ParsedCategory[] {
  const categories: ParsedCategory[] = [];
  const tests = [...arr];
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
  return categories;
}