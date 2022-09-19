import supertest from 'supertest';
import app from '../../src/app';
import userFactory from '../../prisma/factories/userFactory';
import { createUser, createToken } from './utils';
import db from '../../src/database';

beforeEach(async () => {
  await db.$queryRaw`TRUNCATE TABLE users CASCADE`;
  await db.$queryRaw`ALTER SEQUENCE users_id_seq RESTART WITH 1;`;
});

afterAll(async () => {
  await db.$disconnect();
});

describe('Tests sign up', () => {
  it('Correct sign up data, must return 201', async () => {
    const user = userFactory();
    const response = await supertest(app).post('/sign-up').send({
      email: user.email,
      password: user.password,
      passwordConfirm: user.password
    });
    expect(response.status).toBe(201);
  });
  it('Conflicting sign up data, must return 401', async () => {
    const user = userFactory();
    await createUser(user);
    const response = await supertest(app).post('/sign-up').send({
      email: user.email,
      password: user.password,
      passwordConfirm: user.password
    });
    expect(response.status).toBe(401);
  });
  it('Wrong password confirm, must return 422 with message', async () => {
    const user = userFactory();
    const response = await supertest(app).post('/sign-up').send({
      email: user.email,
      password: user.password,
      passwordConfirm: user.password + 'adkfl'
    });
    expect(response.status).toBe(422);
    expect(response.text).toBe('Confirm password correctly');
  })
});

describe('Tests sign in', () => {
  it('Correct sign in data, must return 200 and token', async () => {
    const user = userFactory();
    await createUser(user);
    const response = await supertest(app).post('/sign-in').send(user);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });
  it('Wrong password, must return 401', async () => {
    const user = userFactory();
    await createUser(user);
    const response = await supertest(app).post('/sign-in').send({
      email: user.email,
      password: user.password + 'ladsjf'
    });
    expect(response.status).toBe(401);
  });
})