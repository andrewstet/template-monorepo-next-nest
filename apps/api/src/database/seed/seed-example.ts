import "reflect-metadata";
import "dotenv/config";

import AppDataSource from "../data-source";
import { ExampleItem, User } from "../entities";

async function main() {
  console.log("Seeding example data...");

  const dataSource = await AppDataSource.initialize();

  try {
    await dataSource.transaction(async (manager) => {
      const users = manager.getRepository(User);
      const items = manager.getRepository(ExampleItem);
      const demoEmail = "demo@example.local";

      let user = await users.findOneBy({ email: demoEmail });

      if (!user) {
        user = users.create({
          email: demoEmail,
          passwordHash: "demo",
        });
        await users.save(user);
      }

      await items.delete({ userId: user.id });

      await items.insert([
        { userId: user.id, name: "First example item" },
        { userId: user.id, name: "Second example item" },
      ]);
    });

    console.log("Done");
  } finally {
    await dataSource.destroy();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
