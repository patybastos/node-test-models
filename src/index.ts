import { makeDatabase } from './database/database.js';
import { clean } from 'knex-cleaner';

const database = makeDatabase();

database
  .connect()
  .then(async () => {
    clean(database.connection()).then(async () => {
      console.log('Database cleaned successfully.');
    });
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
