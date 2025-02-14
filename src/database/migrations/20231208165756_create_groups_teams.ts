import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('groupsTeams', (t) => {
    t.increments('id');
    t.integer('teamId').unsigned().notNullable().references('id').inTable('teams');
    t.integer('groupId').unsigned().notNullable().references('id').inTable('groups');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('groupsTeams');
}
