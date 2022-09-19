import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import db from '../../src/database';
config();

const SECRET = process.env.JWT_SECRET as string;

export async function createUser(user: {email: string, password: string}): Promise<void> {
  const passwordHash = await bcrypt.hash(user.password, 10);
  await db.user.create({
    data: {
      email: user.email,
      password: passwordHash
    }
  });
}

export function createToken(userId: number): string {
  const token: string = jwt.sign(
    { userId },
    SECRET,
    { expiresIn: 60 * 60 * 24 * 30 }
  );
  return 'Bearer ' + token;
}