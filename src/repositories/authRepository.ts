import db from '../database';
import { User, NewUserData } from '../types/userTypes';

export async function findUserById(id: number): Promise<User | null> {
  return await db.user.findUnique({
    where: {
      id: id
    }
  });
}

export async function findUserByEmail(email: string): Promise<User | null> {
  return await db.user.findUnique({
    where: {
      email: email
    }
  });
}

export async function insertUser(data: NewUserData): Promise<void> {
  await db.user.create({
    data: {
      email: data.email,
      password: data.password
    }
  });
}