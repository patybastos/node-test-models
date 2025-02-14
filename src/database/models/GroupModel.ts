import { JSONSchema, ModelObject, RelationMappings } from 'objection';
import { BaseModel } from './BaseModel.js';
import { TournamentModel } from './TournamentModel.js';
import { TeamModel, TeamSchema } from './TeamModel.js';

class GroupModel extends BaseModel {
  static tableName = 'groups';

  id!: number;
  name!: string;

  tournamentId!: number;

  teams!: TeamSchema[];

  static get relationMappings(): RelationMappings {
    return {
      tournament: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: TournamentModel,
        join: {
          from: 'groups.tournamentId',
          to: 'tournaments.id',
        },
      },

      teams: {
        relation: BaseModel.ManyToManyRelation,
        modelClass: TeamModel,
        join: {
          from: 'groups.id',
          through: {
            from: 'groupsTeams.groupId',
            to: 'groupsTeams.teamId',
          },
          to: 'teams.id',
        },
      },
    };
  }

  static jsonSchema: JSONSchema = {
    type: 'object',
    required: ['name'],
    properties: {
      id: { type: 'integer' },
      name: { type: 'string' },
    },
  };
}

export { GroupModel };
export type GroupSchema = ModelObject<GroupModel>;
