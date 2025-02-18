import { JSONSchema, ModelObject, RelationMappings } from 'objection';
import { BaseModel } from './BaseModel.js';
import { MatchModel } from './MatchModel.js';

class TeamModel extends BaseModel {
  static tableName = 'teams';

  id!: number;
  name!: string;
  shortName!: string;

  static get relationMappings(): RelationMappings {
    return {
      matchesAsA: {
        relation: BaseModel.HasManyRelation,
        modelClass: MatchModel,
        join: {
          from: 'teams.id',
          to: 'matches.teamAId',
        },
      },

      matchesAsB: {
        relation: BaseModel.HasManyRelation,
        modelClass: MatchModel,
        join: {
          from: 'teams.id',
          to: 'matches.teamBId',
        },
      },
    };
  };

  static jsonSchema: JSONSchema = {
    type: 'object',
    required: ['name', 'shortName'],
    properties: {
      id: { type: 'integer' },
      name: { type: 'string' },
      shortName: { type: 'string', minLength: 3, maxLength: 3 },
    },
  };

  static withShortName(shortName: string) {
    return this.query().where({ shortName });
  }
}

export { TeamModel };

export type TeamSchema = ModelObject<TeamModel>;
