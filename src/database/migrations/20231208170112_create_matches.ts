import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('matches', (t) => {
    t.increments('id');
    t.dateTime('startsAt');
    t.string('location');
    t.string('phase');
    t.string('status').notNullable().defaultTo('scheduled');

    t.integer('tournamentId').unsigned().notNullable().references('id').inTable('tournaments');

    t.integer('teamAId').unsigned().notNullable().references('id').inTable('teams');
    t.integer('teamAScore').unsigned().notNullable().defaultTo(0);

    t.integer('teamBId').unsigned().notNullable().references('id').inTable('teams');
    t.integer('teamBScore').unsigned().notNullable().defaultTo(0);

    t.timestamps(true, true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('matches');
}
