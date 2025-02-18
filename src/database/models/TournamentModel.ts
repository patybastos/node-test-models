import { JSONSchema, ModelObject, RelationMappings } from 'objection';
import { BaseModel } from './BaseModel.js';
import { MatchModel } from './MatchModel.js';

class TournamentModel extends BaseModel {
  static tableName = 'tournaments';

  id!: number;
  name!: string;
  startsAt!: string;
  endsAt!: string;

  static get relationMappings(): RelationMappings {
    return {
      matches: {
        relation: BaseModel.HasManyRelation,
        modelClass: MatchModel,
        join: {
          from: 'tournaments.id',
          to: 'matches.tournamentId',
        },
      },
    };
  };

  static jsonSchema: JSONSchema = {
    type: 'object',
    required: ['name', 'startsAt', 'endsAt'],
    properties: {
      id: { type: 'integer' },
      name: { type: 'string' },
      startsAt: { type: 'string', format: 'date-time' },
      endsAt: { type: 'string', format: 'date-time' },
    },
  };
}

export { TournamentModel };
export type TournamentSchema = ModelObject<TournamentModel>;
