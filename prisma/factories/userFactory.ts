import { faker } from '@faker-js/faker';
import { User } from '@prisma/client';

function userFactory(): Omit<User, 'id'> {
  return {
    email: faker.internet.email(),
    password: faker.internet.password()
  };
}

export default userFactory;