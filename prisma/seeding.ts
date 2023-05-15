import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main(): Promise<void> {
  const promises: Promise<unknown>[] = [];

  await prisma.statistics.deleteMany();

  for (let serverId = 0; serverId < 10; serverId++) {
    const server = `server${serverId}`;

    for (let i = 0; i < 100; i++) {
      const player = `${faker.name.firstName()} ${faker.name.lastName()}`;

      const create = prisma.statistics.create({
        data: {
          player: player,
          server: server,
          xpCount: Math.floor(Math.random() * 10_000)
        }
      });

      promises.push(create);
    }
  }

  // Await promises:
  await Promise.all(promises);
}

main().then(() => prisma.$disconnect());