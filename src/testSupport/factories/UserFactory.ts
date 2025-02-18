import { Factory } from 'fishery';
import { faker } from '@faker-js/faker';
import { UserModel, UserSchema } from '../../database/models/UserModel.js';

const UserFactory = Factory.define<UserSchema, never, UserModel>(({ onCreate, sequence, params }) => {
  onCreate(async (user) => await UserModel.query().insert(user));

  const {
    id = sequence,
    email = faker.internet.email(),
    encryptedPassword = faker.internet.password(),
    role = 'admin',
    createdAt = new Date().toISOString(),
    updatedAt = new Date().toISOString()
  } = params;

  return {
    id,
    email,
    encryptedPassword,
    role,
    createdAt: createdAt,
    updatedAt: updatedAt,
  };
});

export { UserFactory };
