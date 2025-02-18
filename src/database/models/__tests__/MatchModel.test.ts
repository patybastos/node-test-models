import { expect, describe, it, beforeEach, beforeAll, afterAll } from 'vitest'
import { makeDatabase } from '../../database.js';
import { clean } from 'knex-cleaner';
import { ValidationError } from 'objection';
import { MatchModel } from '../MatchModel.js';
import { MatchFactory } from '../../../testSupport/factories/MatchFactory.js';

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

describe('MatchModel', () => {
  describe('validations', () => {
    it('throws an error when teamAScore is less than zero', async () => {
      await expect(MatchFactory.params({ teamAScore: -4 }).create()).rejects.toThrow(ValidationError);
    });

    it('throws an error when teamBScore is less than zero', async () => {
      await expect(MatchFactory.params({ teamBScore: -1 }).create()).rejects.toThrow(ValidationError);
    });

    it('does not throw an error when is valid', async () => {
      await expect(MatchFactory.create()).resolves.not.toThrow(ValidationError);
    });
  });

  describe('isScheduled', () => {
    let match: MatchModel;

    beforeEach(async () => {
      match = await MatchFactory.create();
    });

    it('returns false', () => {
      expect(match.isScheduled()).toBeFalsy();
    });

    describe('when status is scheduled', () => {
      beforeEach(async () => {
        match = await MatchFactory.params({ status: 'scheduled' }).create();
      });

      it('returns true', () => {
        expect(match.isScheduled()).toBeTruthy();
      });
    });
  });
});
