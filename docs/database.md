# Database

The API uses TypeORM `0.3.x` with PostgreSQL.

## Shape

- Runtime configuration lives in `apps/api/src/database/typeorm.options.ts`.
- The standalone CLI data source lives in `apps/api/src/database/data-source.ts`.
- Entities live in `apps/api/src/database/entities`.
- Migrations live in `apps/api/src/database/migrations` and are committed as TypeScript migration classes.
- Seeds live in `apps/api/src/database/seed`.

## Commands

```shell
pnpm db:up
pnpm db:migrate
pnpm db:seed
pnpm db:reset
pnpm db:migration:revert
```

Create or generate migrations from the API package when changing entities:

```shell
pnpm --filter api db:migration:create src/database/migrations/AddExample
pnpm --filter api db:migration:generate src/database/migrations/AddExample
```

## Conventions

- `synchronize` stays `false`; schema changes go through migrations.
- `DataSource` is the shared entrypoint for CLI and seed work.
- Repositories and query builders are preferred over deprecated global helpers.
- `TYPEORM_LOGGING=true` enables SQL logging during local learning/debugging.
- `invalidWhereValuesBehavior` is configured to throw for `null` and `undefined`, matching the stricter behavior expected in TypeORM 1.0.
