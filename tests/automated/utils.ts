import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import db from '../../src/database';
import { User, Test } from '@prisma/client'
import { NewTestData } from '../../src/types/testTypes';
config();

const SECRET = process.env.JWT_SECRET as string;

export async function createUser(data: Omit<User, 'id'>): Promise<void> {
  const passwordHash = await bcrypt.hash(data.password, 10);
  await db.user.create({
    data: {
      email: data.email,
      password: passwordHash
    }
  });
}

export function createToken(userId: number): string {
  return jwt.sign(
    { userId },
    SECRET,
    { expiresIn: 60 * 60 * 24 * 30 }
  );
}

export function parseTestData(test: Omit<Test, 'id'>): NewTestData {
  let categoryName: string = '';
  let teacherName: string = '';
  let disciplineName: string = '';
  switch(test.categoryId) {
    case 1:
      categoryName = 'Projeto';
      break;
    case 2:
      categoryName = 'Prática';
      break;
    case 3:
      categoryName = 'Recuperação';
      break;
  }
  switch(test.teacherDisciplineId) {
    case 1:
      teacherName = 'Diego Pinho';
      disciplineName = 'HTML e CSS';
      break;
    case 2:
      teacherName = 'Diego Pinho';
      disciplineName = 'JavaScript';
      break;
    case 3:
      teacherName = 'Diego Pinho';
      disciplineName = 'React';
      break;
    case 4:
      teacherName = 'Bruna Hamori';
      disciplineName = 'Humildade';
      break;
    case 5:
      teacherName = 'Bruna Hamori';
      disciplineName = 'Planejamento';
      break;
    case 6:
      teacherName = 'Bruna Hamori';
      disciplineName = 'Autoconfiança';
      break;
  }
  return {
    name: test.name,
    pdfUrl: test.pdfUrl,
    category: categoryName,
    teacher: teacherName,
    discipline: disciplineName
  };
}