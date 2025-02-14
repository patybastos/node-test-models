import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('transactions', (t) => {
    t.increments('id');
    t.integer('amount');
    t.string('kind');

    t.integer('betId').unsigned().nullable().references('id').inTable('bets');
    t.integer('userId').unsigned().notNullable().references('id').inTable('users');

    t.timestamps(true, true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('transactions');
}
