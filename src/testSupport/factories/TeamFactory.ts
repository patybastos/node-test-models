import { Factory } from 'fishery';
import { faker } from '@faker-js/faker';
import { TeamModel, TeamSchema } from '../../database/models/TeamModel.js';

const TeamFactory = Factory.define<TeamSchema, never, TeamModel>(({ onCreate, sequence, params }) => {
  onCreate(async (team) => await TeamModel.query().insert(team));

  const {
    id = sequence,
    name = faker.person.firstName(),
    shortName = 'tes',
    createdAt = new Date().toISOString(),
    updatedAt = new Date().toISOString(),
  } = params;

  return {
    id,
    name,
    shortName,
    createdAt,
    updatedAt,
  };
});

export { TeamFactory };
