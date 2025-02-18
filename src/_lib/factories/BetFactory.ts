import { Factory } from 'fishery';
import { faker } from '@faker-js/faker';
import { BetModel, BetSchema } from '../../database/models/BetModel.js';
import { MatchFactory } from './MatchFactory.js';
import { UserFactory } from './UserFactory.js';

const BetFactory = Factory.define<BetSchema, never, BetModel>(({ onCreate, sequence, params }) => {
  onCreate(async (bet) => {
    if (!params.matchId) {
      bet.match = await MatchFactory.create({ id: bet.matchId });
    }

    if (!params.userId) {
      bet.user = await UserFactory.create({ id: bet.userId });
    }

    return await BetModel.query().insert(bet)
  });

  const {
    id = sequence,
    teamAScore = faker.number.int({ min: 0, max: 10 }),
    teamBScore = faker.number.int({ min: 0, max: 10 }),
    kind = 'test',
    matchId = MatchFactory.build().id,
    userId = UserFactory.build().id,
    createdAt = new Date().toISOString(),
    updatedAt = new Date().toISOString(),
  } = params;

  return {
    id,
    teamAScore,
    teamBScore,
    kind,
    matchId,
    userId,
    createdAt: createdAt || new Date().toISOString(),
    updatedAt: updatedAt || new Date().toISOString(),
  };
});

export { BetFactory };
