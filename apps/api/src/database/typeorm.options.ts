import "reflect-metadata";
import "dotenv/config";

import path from "node:path";

import type { TypeOrmModuleOptions } from "@nestjs/typeorm";
import type { DataSourceOptions } from "typeorm";

import { ExampleItem, User } from "./entities";

export const databaseEntities = [User, ExampleItem];

function shouldUseManualInitialization(): boolean {
  return process.env.NODE_ENV === "test" || process.env.TYPEORM_MANUAL_INITIALIZATION === "true";
}

function requireDatabaseUrl(): string {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl && shouldUseManualInitialization()) {
    return "postgresql://typeorm_manual_init:unused@localhost:5432/typeorm_manual_init";
  }

  if (!databaseUrl) {
    throw new Error("DATABASE_URL is required");
  }

  return databaseUrl;
}

export function createTypeOrmDataSourceOptions(): DataSourceOptions {
  return {
    type: "postgres",
    url: requireDatabaseUrl(),
    entities: databaseEntities,
    migrations: [path.join(__dirname, "migrations", "*{.ts,.js}")],
    migrationsTableName: "typeorm_migrations",
    synchronize: false,
    migrationsRun: false,
    logging: process.env.TYPEORM_LOGGING === "true",
    uuidExtension: "pgcrypto",
    invalidWhereValuesBehavior: {
      null: "throw",
      undefined: "throw",
    },
  };
}

export function createTypeOrmModuleOptions(): TypeOrmModuleOptions {
  return {
    ...createTypeOrmDataSourceOptions(),
    manualInitialization: shouldUseManualInitialization(),
  };
}
