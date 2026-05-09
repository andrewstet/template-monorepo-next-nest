# Architecture

This template is a pnpm workspace with a Next web app, a Nest API, shared packages, and local infrastructure helpers.

```mermaid
flowchart LR
  Browser["Browser"] --> Web["apps/web<br/>Next.js"]
  Web --> Api["apps/api<br/>NestJS REST API"]
  Api --> Db["PostgreSQL<br/>Docker or hosted"]
  Api --> Prisma["Prisma Client"]
  Prisma --> Db
  Web --> Core["packages/core<br/>shared TypeScript"]
  Api --> Core
  Api --> Sentry["Sentry"]
  Web --> Sentry
```

## Runtime Shape

- `apps/web` owns the browser-facing Next.js application.
- `apps/api` owns the Nest REST API, Prisma integration, OpenAPI generation, logging, and API observability.
- `packages/core` is reserved for framework-neutral TypeScript shared by apps.
- `infra/docker` contains local development infrastructure.

## Documentation Flow

```mermaid
flowchart TD
  Controllers["Nest controllers and DTOs"] --> Swagger["SwaggerModule"]
  Swagger --> Ui["/docs"]
  Swagger --> Json["/openapi.json"]
  Swagger --> Generator["pnpm docs:openapi"]
  Generator --> Artifact["docs/api/openapi.json<br/>ignored local artifact"]
  Markdown["docs/**/*.md"] --> Check["pnpm docs:check"]
  Artifact --> Check
```
