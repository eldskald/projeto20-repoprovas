import supertest from 'supertest';
import app from '../../src/app';
import userFactory from '../../prisma/factories/userFactory';
import testFactory from '../../prisma/factories/testFactory';
import { createUser, createToken, parseTestData } from './utils';
import db from '../../src/database';

beforeEach(async () => {
  await db.$queryRaw`TRUNCATE TABLE tests CASCADE`;
  await db.$queryRaw`ALTER SEQUENCE tests_id_seq RESTART WITH 1`;
  await db.$queryRaw`TRUNCATE TABLE users CASCADE`;
  await db.$queryRaw`ALTER SEQUENCE users_id_seq RESTART WITH 1`;
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
});

describe('Tests test creation', () => {
  it('Correct creation data, must return 201', async () => {
    await createUser(userFactory());
    const token = createToken(1);
    const data = parseTestData(testFactory());
    const response = await supertest(app)
      .post('/tests')
      .set({ Authorization: `Bearer ${token}` })
      .send(data);
    expect(response.status).toBe(201);
  });
  it('Wrong token, must return 401', async () => {
    const token = createToken(1);
    const data = parseTestData(testFactory());
    const response = await supertest(app)
      .post('/tests')
      .set({ Authorization: `Bearer ${token}` })
      .send(data);
    expect(response.status).toBe(401);
  });
});

describe('Tests listing tests by discipline', () => {
  it('Must return 200 and an empty array', async() => {
    await createUser(userFactory());
    const token = createToken(1);
    const response = await supertest(app)
      .get('/tests/by-discipline')
      .set({ Authorization: `Bearer ${token}` });
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });
  it('Wrong token, must return 401', async() => {
    const token = createToken(1);
    const response = await supertest(app)
      .get('/tests/by-discipline')
      .set({ Authorization: `Bearer ${token}` });
    expect(response.status).toBe(401);
  });
});

describe('Tests listing tests by teacher', () => {
  it('Must return 200 and an empty array', async() => {
    await createUser(userFactory());
    const token = createToken(1);
    const response = await supertest(app)
      .get('/tests/by-teacher')
      .set({ Authorization: `Bearer ${token}` });
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });
  it('Wrong token, must return 401', async() => {
    const token = createToken(1);
    const response = await supertest(app)
      .get('/tests/by-teacher')
      .set({ Authorization: `Bearer ${token}` });
    expect(response.status).toBe(401);
  });
});