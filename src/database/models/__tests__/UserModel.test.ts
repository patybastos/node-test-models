import { expect, describe, it, beforeEach, beforeAll, afterAll } from 'vitest'
import { makeDatabase } from '../../database.js';
import { clean } from 'knex-cleaner';
import { UserFactory } from '../../../_lib/factories/UserFactory.js';
import { UserModel } from '../UserModel.js';
import { TransactionFactory } from '../../../_lib/factories/TransactionFactory.js';

const database = makeDatabase();

beforeAll(async () => {
  await database.connect();
});

beforeEach(async () => {
  await clean(database.connection());
});

afterAll(async () => {
  await database.disconnect();
});

describe('UserModel', () => {
  describe('getBalance', () => {
    let user: UserModel;

    beforeEach(async () => {
      user = await UserFactory.create();
      await TransactionFactory.createList(4, { userId: user.id, amount: 100 });
      await TransactionFactory.create({ userId: user.id, amount: -89 });

      await TransactionFactory.create({ amount: 50 });
    });

    it('returns the balance of the user', async () => {
      expect(await user.getBalance()).toBe("311");
    });
  });
});
