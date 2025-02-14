import { JSONSchema, ModelObject, RelationMappings } from 'objection';
import { BaseModel } from './BaseModel.js';
import { MatchModel, MatchSchema } from './MatchModel.js';
import { UserModel, UserSchema } from './UserModel.js';

class BetModel extends BaseModel {
  static tableName = 'bets';

  id!: number;
  teamAScore!: number;
  teamBScore!: number;
  kind!: string;

  matchId!: number;
  match!: MatchSchema;

  userId!: number;
  user!: UserSchema;

  static get relationMappings(): RelationMappings {
    return {
      match: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: MatchModel,
        join: {
          from: 'bets.matchId',
          to: 'matches.id',
        },
      },

      user: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: UserModel,
        join: {
          from: 'bets.userId',
          to: 'users.id',
        },
      },
    };
  }

  static jsonSchema: JSONSchema = {
    type: 'object',
    required: ['teamAScore', 'teamBScore', 'kind', 'matchId', 'userId'],
    properties: {
      id: { type: 'integer' },
      teamAScore: { type: 'integer', minimum: 0 },
      teamBScore: { type: 'integer', minimum: 0 },
      kind: { type: 'string' },
      matchId: { type: 'integer' },
      userId: { type: 'integer' },
    },
  };
}

export { BetModel };
export type BetSchema = ModelObject<BetModel>;
