# Testing models with factories

- [fishery](https://github.com/thoughtbot/fishery): Used to defined factories
- [knex-cleaner](https://github.com/steven-ferguson/knex-cleaner): Database clean
- [@faker-js/faker](https://fakerjs.dev): Fake data to factories

## How to run locally

```console
docker-compose up
npm run db
```

### Run app

```console
npm run db:create:dev
npm run db:migrate:dev
npm run db:seed:dev
npm run dev
```

### Run tests

```console
npm run db:create:test
npm run db:migrate:test
npm run test
```
