import { makeDatabase } from './database/database.js';

const database = makeDatabase();

database
  .connect()
  .then(async () => {
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
