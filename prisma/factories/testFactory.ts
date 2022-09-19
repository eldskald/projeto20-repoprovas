import { faker } from '@faker-js/faker';
import { Test } from '@prisma/client';

function testFactory(): Omit<Test, 'id'> {
  return {
    name: faker.lorem.words(2),
    pdfUrl: faker.internet.url(),
    categoryId: 1 + Math.floor(Math.random() * 3),
    teacherDisciplineId: 1 + Math.floor(Math.random() * 6)
  };
}

export default testFactory;