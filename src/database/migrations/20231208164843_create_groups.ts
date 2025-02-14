import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('groups', (t) => {
    t.increments('id');
    t.string('name').notNullable();
    t.integer('tournamentId').unsigned().notNullable().references('id').inTable('tournaments');
    t.timestamps(true, true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('groups');
}
