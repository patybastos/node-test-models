import { Factory } from 'fishery';
import { MatchModel, MatchSchema } from '../../database/models/MatchModel.js';
import { faker } from '@faker-js/faker';
import { TeamFactory } from './TeamFactory.js';
import { TournamentFactory } from './TournamentFactory.js';

const MatchFactory = Factory.define<MatchSchema, never, MatchModel>(({ onCreate, sequence, params }) => {
  onCreate(async (match) => {
    if (!params.tournamentId) {
      match.tournament = await TournamentFactory.create({ id: match.tournamentId });
    }

    if (!params.teamAId) {
      match.teamA = await TeamFactory.create({ id: match.teamAId });
    }

    if (!params.teamBId) {
      match.teamB = await TeamFactory.create({ id: match.teamBId });
    }

    return await MatchModel.query().insert(match)
  });

  const {
    id = sequence,
    status = 'Crazy',
    startsAt = new Date().toISOString(),
    location = faker.location.city(),
    phase = 'Group',
    teamAScore = faker.number.int({ min: 0, max: 10 }),
    teamBScore = faker.number.int({ min: 0, max: 10 }),
    tournamentId = TournamentFactory.build().id,
    teamAId = TeamFactory.build().id,
    teamBId = TeamFactory.build().id,
    createdAt = new Date().toISOString(),
    updatedAt = new Date().toISOString(),
  } = params;

  return {
    id,
    status,
    startsAt,
    location,
    phase,
    tournamentId,
    teamAScore,
    teamAId,
    teamBScore,
    teamBId,
    createdAt: createdAt || new Date().toISOString(),
    updatedAt: updatedAt || new Date().toISOString(),
  };
});

export { MatchFactory };
