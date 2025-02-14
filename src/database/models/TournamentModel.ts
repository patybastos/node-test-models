import { JSONSchema, ModelObject, RelationMappings } from 'objection';
import { BaseModel } from './BaseModel.js';
import { GroupModel, GroupSchema } from './GroupModel.js';
import { MatchModel } from './MatchModel.js';

class TournamentModel extends BaseModel {
  static tableName = 'tournaments';

  id!: number;
  name!: string;
  startsAt!: string;
  endsAt!: string;

  groups!: GroupSchema[];

  static get relationMappings(): RelationMappings {
    return {
      groups: {
        relation: BaseModel.HasManyRelation,
        modelClass: GroupModel,
        join: {
          from: 'tournaments.id',
          to: 'groups.tournamentId',
        },
      },

      matches: {
        relation: BaseModel.HasManyRelation,
        modelClass: MatchModel,
        join: {
          from: 'tournaments.id',
          to: 'matches.tournamentId',
        },
      },
    };
  }

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
