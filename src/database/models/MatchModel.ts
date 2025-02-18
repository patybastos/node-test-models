import { JSONSchema, ModelObject, RelationMappings } from 'objection';
import { BaseModel } from './BaseModel.js';
import { TournamentModel, TournamentSchema } from './TournamentModel.js';
import { TeamModel, TeamSchema } from './TeamModel.js';
import { BetModel } from './BetModel.js';

class MatchModel extends BaseModel {
  static tableName = 'matches';

  id!: number;
  startsAt?: string;
  location?: string;
  phase?: string;
  status!: string;

  tournamentId!: number;
  tournament?: TournamentSchema;

  teamAId!: number;
  teamA?: TeamSchema;
  teamAScore!: number;

  teamBId!: number;
  teamB?: TeamSchema;
  teamBScore!: number;

  static get relationMappings(): RelationMappings {
    return {
      tournament: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: TournamentModel,
        join: {
          from: 'matches.tournamentId',
          to: 'tournaments.id',
        },
      },

      teamA: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: TeamModel,
        join: {
          from: 'matches.teamAId',
          to: 'teams.id',
        },
      },

      teamB: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: TeamModel,
        join: {
          from: 'matches.teamBId',
          to: 'teams.id',
        },
      },

      bets: {
        relation: BaseModel.HasManyRelation,
        modelClass: BetModel,
        join: {
          from: 'matches.id',
          to: 'bets.matchId',
        },
      },
    };
  };

  static jsonSchema: JSONSchema = {
    type: 'object',
    required: ['status', 'tournamentId', 'teamAId', 'teamAScore', 'teamBId', 'teamBScore'],
    properties: {
      id: { type: 'integer' },
      tournamentId: { type: 'integer' },
      teamAId: { type: 'integer' },
      teamAScore: { type: 'integer', minimum: 0 },
      teamBId: { type: 'integer' },
      teamBScore: { type: 'integer', minimum: 0 },
    },
  };

  isScheduled() {
    return this.status === 'scheduled';
  };
}

export { MatchModel };
export type MatchSchema = ModelObject<MatchModel>;
