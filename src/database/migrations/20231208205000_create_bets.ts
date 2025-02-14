import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('bets', (t) => {
    t.increments('id');
    t.integer('teamAScore').notNullable();
    t.integer('teamBScore').notNullable();
    t.string('kind').notNullable();

    t.integer('matchId').unsigned().notNullable().references('id').inTable('matches');
    t.integer('userId').unsigned().notNullable().references('id').inTable('users');

    t.timestamps(true, true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('bets');
}
