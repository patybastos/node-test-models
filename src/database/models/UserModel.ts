import { JSONSchema, ModelObject } from 'objection';
import { BaseModel } from './BaseModel.js';
import { TransactionModel } from './TransactionModel.js';

class UserModel extends BaseModel {
  static tableName = 'users';

  id!: number;
  email!: string;
  encryptedPassword!: string;
  role!: string;

  static get relationMappings() {
    return {
      transactions: {
        relation: BaseModel.HasManyRelation,
        modelClass: TransactionModel,
        join: {
          from: 'users.id',
          to: 'transactions.userId',
        },
      },
    };
  };

  static jsonSchema: JSONSchema = {
    type: 'object',
    required: ['email', 'role'],
    properties: {
      id: { type: 'integer' },
      email: { type: 'string' },
      password: { type: 'string' },
      role: { type: 'string' },
    },
  };

  async getBalance() {
    const result = await this.$relatedQuery<TransactionModel & { sum: number }>('transactions')
      .sum('amount')
      .as('balance')
      .first()
      .throwIfNotFound();

    return result.sum;
  };
}

export { UserModel };
export type UserSchema = ModelObject<UserModel>;
