// import Knex from 'knex';
import Knex = require('knex'); // This is a workaround for the import statement
import { config } from '../config.js';
import { BaseModel } from './models/BaseModel.js';

const makeDatabase = () => {
  const knex = Knex.knex({
    ...config.db[config.env],
    debug: true,
  });

  BaseModel.knex(knex);

  return {
    async connect() {
      await knex.raw('SELECT 1');
      console.log('Database connected successfully.');
    },

    async disconnect() {
      await knex.destroy();
      console.log('Database disconnected successfully.');
    },

    connection() { return knex },
  };
};

export { makeDatabase };
