import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { config } from 'dotenv';
import { findUserByEmail, findUserById, insertUser } from '../repositories/authRepository';
import { User, SignInData, SignUpData, NewUserData } from '../types/userTypes';
config()

const SECRET = process.env.JWT_SECRET as string;

export function generateToken(userId: number): string {
  return jwt.sign(
    { userId },
    SECRET,
    { expiresIn: 60 * 60 * 24 * 30 }
  );
}

export async function validateToken(token: string): Promise<User> {
  try {
    const payload: any = jwt.verify(token, SECRET)
    const user: User | null = await findUserById(payload.userId);
    if (!user) throw { type: 'Unauthorized' };
    return user;
  } catch (err) {
    throw { type: 'Unauthorized' };
  }
}

export async function signUpUser(data: SignUpData): Promise<void> {
  const checkEmail: User | null = await findUserByEmail(data.email);
  if (checkEmail) throw { type: 'Unauthorized' };
  const confirmPassword: boolean = data.passwordConfirm === data.password;
  if (!confirmPassword) throw { type: 'Unprocessable', message: 'Confirm password correctly' };
  const passwordHash: string = await bcrypt.hash(data.password, 10);
  const newData: NewUserData = { email: data.email, password: passwordHash };
  await insertUser(newData);
}

export async function validateCredentials(data: SignInData): Promise<User> {
  const user: User | null = await findUserByEmail(data.email);
  if (!user) throw { type: 'Unauthorized' };
  const passwordCheck: boolean = await bcrypt.compare(data.password, user.password);
  if (!passwordCheck) throw { type: 'Unauthorized' };
  return user;
}