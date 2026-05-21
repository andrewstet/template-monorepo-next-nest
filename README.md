# Next/Nest Monorepo Template

Opinionated full-stack starter, intended to be used as a GitHub template repo.

---

## Tech Stack

### Frontend

- [Next.js](https://nextjs.org/docs)
- [React](https://react.dev/reference/react)
- [TypeScript](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html)
- [Tailwind CSS](https://tailwindcss.com/docs/installation/using-postcss)
- [shadcn/ui](https://ui.shadcn.com/docs/installation/next) _(component primitives)_
- [lucide-react](https://lucide.dev/guide/packages/lucide-react) _(icons)_
- [TanStack Query _(React Query)_](https://tanstack.com/query/latest/docs/framework/react/installation) for server state
- [react-hook-form](https://react-hook-form.com/get-started) and [zod](https://zod.dev/#installation) for forms/validation
- Testing:
  - [Vitest](https://vitest.dev/) and [React Testing Library _(RTL)_](https://testing-library.com/docs/react-testing-library/intro/#with-typescript)
  - [Playwright](https://playwright.dev/docs/intro) for end-to-end _(E2E)_

### Backend

- [NestJS](https://docs.nestjs.com/#installation)
  - [@nestjs/schedule](https://docs.nestjs.com/techniques/task-scheduling) _(built-in to Nest)_ for cron-like job scheduling
- [TypeORM](https://typeorm.io/) with [@nestjs/typeorm](https://docs.nestjs.com/techniques/database)
- [PostgreSQL](https://www.postgresql.org/download/)
- [REST API](https://restfulapi.net/)
- [JWT](https://www.jwt.io/introduction#what-is-json-web-token) stored in HTTP-only cookies for auth
- [pino](https://github.com/pinojs/pino?tab=readme-ov-file#install) for logging
- Testing:
  - [Vitest](https://vitest.dev/) for unit tests
  - [Supertest](https://github.com/forwardemail/supertest?tab=readme-ov-file#getting-started) and [Vitest](https://vitest.dev/) for API/integration tests

### Deployment / Infra

- **API and DB**: [Railway](https://docs.railway.com/quick-start)
- **Web**: [Vercel](https://vercel.com/docs/getting-started-with-vercel) (ideal for Next.js)
- **Local development**: [Docker](https://docs.docker.com/get-started/) (API and Postgres, web can be local dev server)
- **Monitoring**: [Sentry](https://docs.sentry.io/platforms/javascript/guides/nextjs/)
- **Linting / Formatting**: [ESLint](https://eslint.org/docs/latest/use/getting-started), [Prettier](https://prettier.io/docs/install), [Husky](https://typicode.github.io/husky/get-started.html)

---

## Initial Template Customization (One-time, optional)

- `package.json`: Change `name` and `description`
- `infra/docker/docker-compose.yml`: Change `container_name` and `volumes` references (_pgdata_db_)
- Find and replace all instances of:
  - `db_user`: DB username
  - `db_password`: DB password
  - `db_name`: DB name

---

## Local Dev

### Prerequisites

- [Node.js](https://nodejs.org/en/download)
- [`pnpm` with workspaces](https://pnpm.io/workspaces) (ideal for monorepo)
- [Docker](https://docs.docker.com/get-started/) (local Postgres runs in Docker)

### One-time setup

- Copy `apps/api/.env.example` to `apps/api/.env` and edit if needed
- Copy `apps/web/.env.example` to `apps/web/.env` and edit if needed

- Install dependencies and run general setup:

  ```shell
  pnpm install
  pnpm approve-builds # Approve everything
  pnpm dev:setup

  # If you'll be running E2E tests (installs browsers, etc.):
  pnpm dev:setup:e2e
  ```

- Init the DB:
  ```shell
  pnpm db:up
  pnpm db:migrate
  pnpm db:seed
  ```

### Start

- Terminal 1 (API):

  ```shell
  pnpm db:up   # If not running already
  pnpm dev:api # Nest
  ```

- Terminal 2 (Web):

  ```shell
  pnpm dev:web # Next
  ```

  - Open browser to http://localhost:3000

### Docs

- With the API running, open Swagger UI at http://localhost:3001/docs
- Raw OpenAPI JSON is served at http://localhost:3001/openapi.json
- Generate the ignored local OpenAPI artifact with:
  ```shell
  pnpm docs:openapi
  ```
- Check docs formatting and OpenAPI generation with:
  ```shell
  pnpm docs:check
  ```
- Architecture notes and the Mermaid workspace diagram live in `docs/architecture.md`
- Database conventions and TypeORM command notes live in `docs/database.md`

### Stop

1. End processes in both terminals (`Ctrl+C`)
2. Bring down DB:
   ```shell
   pnpm db:down
   ```

### Run manual tests

- API:

  ```shell
  pnpm test:api
  ```

- Web:

  ```shell
  pnpm test:web
  ```

- End-to-end
  - Terminal 1 (API):
    ```shell
    pnpm dev:web # Next
    ```
  - Terminal 2 (Web):
    ```shell
    pnpm e2e # Playwright
    ```

### CI parity

- Fast local checks:

  ```shell
  pnpm ci:quick # lint, typecheck, unit/integration tests
  ```

- Local CI before pushing:

  ```shell
  pnpm ci:local # ci:quick plus API and web builds
  ```

- Full CI including Playwright:

  ```shell
  pnpm ci:full
  ```

- The pre-push hook runs `pnpm ci:local` so most GitHub CI failures are caught locally without making every push wait for Playwright.
- GitHub Actions runs on pull requests to `main`, pushes to any branch, and manual `workflow_dispatch` runs. For solo development, push a feature branch or run the workflow manually to get CI without opening a self-PR.

### Debug

- DB:

  ```shell
  pnpm db:migrate # Run pending TypeORM migrations
  pnpm db:migration:revert # Revert the latest TypeORM migration
  pnpm db:logs # Tail Postgres logs
  pnpm db:reset # Reset DB (drop, migrate, reseed)
  ```

- Manual linting, formatting, and typechecks:

  ```shell
  pnpm lint     # Lint all
  pnpm lint:web # Lint just web
  pnpm lint:api # Lint just api

  pnpm format   # Format all

  pnpm typecheck     # Typecheck all
  pnpm typecheck:web # Typecheck just web
  pnpm typecheck:api # Typecheck just api
  ```

- Manual build:
  ```shell
  pnpm build     # Build all
  pnpm build:web # Build just web
  pnpm build:api # Build just api
  ```

### Observability

- API and Web errors are captured by Sentry when `SENTRY_DSN` is set
- API logs are structured JSON via `pino`

### Customization

- Add new `shadcn` components:
  ```shell
  cd apps/web
  pnpm dlx shadcn@latest add {component} {component} ...
  ```
