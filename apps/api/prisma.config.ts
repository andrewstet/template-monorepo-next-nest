import "dotenv/config";
import { defineConfig, env } from "prisma/config";

// noinspection JSUnusedGlobalSymbols
export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "pnpm run db:seed",
  },
  datasource: {
    url: env("DATABASE_URL"),
  },
});
