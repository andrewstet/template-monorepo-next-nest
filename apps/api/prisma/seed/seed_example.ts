import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import type { PrismaClient as PrismaClientType } from "@prisma/client";
import { PrismaClient } from "@prisma/client";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is required for seeding");
}

const adapter = new PrismaPg({
  connectionString: databaseUrl,
});

const prisma: PrismaClientType = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding example data...");

  const demoEmail = "demo@example.local";

  const user = await prisma.user.upsert({
    where: { email: demoEmail },
    update: {},
    create: {
      email: demoEmail,
      passwordHash: "demo",
    },
  });

  // idempotent seed
  await prisma.exampleItem.deleteMany({
    where: { userId: user.id },
  });

  await prisma.exampleItem.createMany({
    data: [
      { userId: user.id, name: "First example item" },
      { userId: user.id, name: "Second example item" },
    ],
  });

  console.log("Done");
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
