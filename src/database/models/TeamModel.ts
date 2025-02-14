import { JSONSchema, ModelObject, RelationMappings } from 'objection';
import { BaseModel } from './BaseModel.js';
import { GroupModel } from './GroupModel.js';
import { MatchModel } from './MatchModel.js';

class TeamModel extends BaseModel {
  static tableName = 'teams';

  id!: number;
  name!: string;
  shortName!: string;

  static PAGE_SIZE = 12;

  static get relationMappings(): RelationMappings {
    return {
      groups: {
        relation: BaseModel.ManyToManyRelation,
        modelClass: GroupModel,
        join: {
          from: 'teams.id',
          through: {
            from: 'groupsTeams.teamId',
            to: 'groupsTeams.groupsId',
          },
          to: 'groups.id',
        },
      },

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
  }

  static jsonSchema: JSONSchema = {
    type: 'object',
    required: ['name', 'shortName'],
    properties: {
      id: { type: 'integer' },
      name: { type: 'string' },
      shortName: { type: 'string', minLength: 3, maxLength: 3 },
    },
  };

  static inPage(pageNumber = 1) {
    return this.query().page(Math.max(0, pageNumber - 1), this.PAGE_SIZE);
  }

  static withShortName(shortName: string) {
    return this.query().where({ shortName });
  }
}

export { TeamModel };

export type TeamSchema = ModelObject<TeamModel>;
