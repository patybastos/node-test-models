import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('teams', (t) => {
    t.increments('id');
    t.string('name').notNullable();
    t.string('shortName').notNullable();
    t.timestamps(true, true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('teams');
}
