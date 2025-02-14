import 'dotenv/config';

import { Env, EnvType } from './_lib/env.js';

const env = Env.string('NODE_ENV', 'development') as EnvType;

const db = {
  development: {
    client: 'postgresql',
    connection: {
      database: Env.string('DATABASE_DB', 'node_test_models_dev'),
      port: Env.number('DATABASE_PORT', 5432),
      user: Env.string('DATABASE_USER', 'postgres'),
      password: Env.string('DATABASE_PASSWORD', 'postgres'),
      host: Env.string('DATABASE_HOST', '127.0.0.1'),
    },
  },

  test: {
    client: 'postgresql',
    connection: {
      database: Env.string('TEST_DATABASE_DB', 'node_test_models_test'),
      port: Env.number('TEST_DATABASE_PORT', 5432),
      user: Env.string('TEST_DATABASE_USER', 'postgres'),
      password: Env.string('TEST_DATABASE_PASSWORD', 'postgres'),
      host: Env.string('TEST_DATABASE_HOST', '127.0.0.1'),
    },
  },
} as const;

const config = { env, db };

type Config = typeof config;

export { config };
export type { Config };
