import { expect, describe, it, beforeEach, beforeAll, afterAll } from 'vitest'
import { makeDatabase } from '../../database.js';
import { clean } from 'knex-cleaner';
import { ValidationError } from 'objection';
import { TeamFactory } from '../../../testSupport/factories/TeamFactory.js';
import { TeamModel } from '../TeamModel.js';

const database = makeDatabase();

beforeAll(async () => {
  await database.connect();
});

beforeEach(async () => {
  await clean(database.connection());
});

afterAll(async () => {
  await database.disconnect();
});

describe('TeamModel', () => {
  describe('validations', () => {
    it('throws an error when shortName is not 3 characters long', async () => {
      await expect(TeamFactory.params({ shortName: '1234' }).create()).rejects.toThrow(ValidationError);
    });

    it('throws an error when shortName is not 3 characters long', async () => {
      await expect(TeamFactory.params({ shortName: '12' }).create()).rejects.toThrow(ValidationError);
    });

    it('does not throw an error when is valid', async () => {
      await expect(TeamFactory.create()).resolves.not.toThrow(ValidationError);
    });
  });

  describe('withShortName', () => {
    let team: TeamModel;

    beforeEach(async () => {
      team = await TeamFactory.params({ shortName: 'cri' }).create();
      await TeamFactory.createList(5);
    });

    it('returns the team', async () => {
      const filter = await TeamModel.withShortName('cri').first();

      expect(filter?.id).toBe(team.id);
    });
  });
});
