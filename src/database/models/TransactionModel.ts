import { ModelObject, RelationMappings } from 'objection';
import { BaseModel } from './BaseModel.js';
import { UserModel, UserSchema } from './UserModel.js';
import { BetModel, BetSchema } from './BetModel.js';

class TransactionModel extends BaseModel {
  static tableName = 'transactions';

  id!: number;
  amount!: number;
  kind!: string;

  userId!: number;
  user?: UserSchema;

  betId?: number;
  bet?: BetSchema;

  static get relationMappings(): RelationMappings {
    return {
      bet: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: BetModel,
        join: {
          from: 'transactions.betId',
          to: 'bets.id',
        },
      },

      user: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: UserModel,
        join: {
          from: 'transactions.userId',
          to: 'users.id',
        },
      },
    };
  };
}

export { TransactionModel };
export type TransactionSchema = ModelObject<TransactionModel>;
