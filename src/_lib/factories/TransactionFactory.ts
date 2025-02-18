import { Factory } from 'fishery';
import { faker } from '@faker-js/faker';
import { TransactionModel, TransactionSchema } from '../../database/models/TransactionModel.js';
import { UserFactory } from './UserFactory.js';

const TransactionFactory = Factory.define<TransactionSchema, never, TransactionModel>(({ onCreate, sequence, params }) => {
  onCreate(async (transaction) => {
    if (!params.userId) {
      transaction.user = await UserFactory.create({ id: transaction.userId });
    }

    return await TransactionModel.query().insert(transaction);
  });

  const {
    id = sequence,
    amount = faker.number.int({ min: 1, max: 1000 }),
    kind = 'deposit',
    userId = UserFactory.build().id,
    betId,
    createdAt = new Date().toISOString(),
    updatedAt = new Date().toISOString(),
  } = params;

  return {
    id,
    amount,
    kind,
    userId,
    betId,
    createdAt,
    updatedAt,
  };
});

export { TransactionFactory };
