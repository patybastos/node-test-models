import { ModelObject } from 'objection';
import { BaseModel } from './BaseModel.js';
import { TransactionModel } from './TransactionModel.js';

class UserModel extends BaseModel {
  static tableName = 'users';

  id!: number;
  email!: string;
  encryptedPassword!: string;
  password!: string;
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
  }
}

export { UserModel };
export type UserSchema = ModelObject<UserModel>;
