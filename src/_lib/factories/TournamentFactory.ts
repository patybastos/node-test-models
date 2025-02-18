import { Factory } from 'fishery';
import { fa, faker } from '@faker-js/faker';
import { TournamentModel, TournamentSchema } from '../../database/models/TournamentModel.js';

const TournamentFactory = Factory.define<TournamentSchema, never, TournamentModel>(({ onCreate, sequence, params }) => {
  onCreate(async (tournament) => await TournamentModel.query().insert(tournament));

  const {
    id = sequence,
    name = faker.person.firstName(),
    startsAt = new Date().toISOString(),
    endsAt = new Date().toISOString(),
    createdAt = new Date().toISOString(),
    updatedAt = new Date().toISOString(),
  } = params;

  return {
    id,
    name,
    startsAt,
    endsAt,
    createdAt,
    updatedAt,
  };
});

export { TournamentFactory };
