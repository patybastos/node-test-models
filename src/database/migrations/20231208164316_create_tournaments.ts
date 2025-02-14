import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('tournaments', (t) => {
    t.increments('id');
    t.string('name').notNullable();
    t.dateTime('startsAt');
    t.dateTime('endsAt');

    t.timestamps(true, true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('tournaments');
}
