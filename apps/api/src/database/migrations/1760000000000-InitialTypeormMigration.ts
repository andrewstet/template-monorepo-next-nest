import type { MigrationInterface, QueryRunner } from "typeorm";

export class InitialTypeormMigration1760000000000 implements MigrationInterface {
  name = "InitialTypeormMigration1760000000000";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "pgcrypto"`);
    await queryRunner.query(`
      CREATE TABLE "User" (
        "id" uuid NOT NULL DEFAULT gen_random_uuid(),
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT now(),
        "email" text NOT NULL,
        "passwordHash" text NOT NULL,
        CONSTRAINT "User_pkey" PRIMARY KEY ("id")
      )
    `);
    await queryRunner.query(`CREATE UNIQUE INDEX "User_email_key" ON "User" ("email")`);
    await queryRunner.query(`
      CREATE TABLE "ExampleItem" (
        "id" uuid NOT NULL DEFAULT gen_random_uuid(),
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT now(),
        "userId" uuid NOT NULL,
        "name" text NOT NULL,
        CONSTRAINT "ExampleItem_pkey" PRIMARY KEY ("id")
      )
    `);
    await queryRunner.query(`CREATE INDEX "ExampleItem_userId_idx" ON "ExampleItem" ("userId")`);
    await queryRunner.query(`
      ALTER TABLE "ExampleItem"
      ADD CONSTRAINT "ExampleItem_userId_fkey"
      FOREIGN KEY ("userId")
      REFERENCES "User"("id")
      ON DELETE RESTRICT
      ON UPDATE CASCADE
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "ExampleItem" DROP CONSTRAINT "ExampleItem_userId_fkey"`);
    await queryRunner.query(`DROP INDEX "ExampleItem_userId_idx"`);
    await queryRunner.query(`DROP TABLE "ExampleItem"`);
    await queryRunner.query(`DROP INDEX "User_email_key"`);
    await queryRunner.query(`DROP TABLE "User"`);
  }
}
