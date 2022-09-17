import pkg from "@prisma/client";

export type User = pkg.User;

export type SignInData = {
  email: string;
  password: string;
};

export type SignUpData = {
  email: string;
  password: string;
  passwordConfirm: string;
};

export type NewUserData = Omit<SignUpData, 'passwordConfirm'>;