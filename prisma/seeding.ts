import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

void prisma.$transaction(async(tx) => {
  await tx.statistics.deleteMany();

  const players = getUniquePlayers(5000);
  const servers = getServers(20);

  const promises: Promise<unknown>[] = [];

  for (const server of servers) {
    for (const player of players) {
      const promise = tx.statistics.create({
        data: {
          server: server,
          player: player,
          xpCount: Math.floor(Math.random() * 1_000_000)
        }
      });

      promises.push(promise);
    }
  }

  await Promise.all(promises);
}, { timeout: 100_000 }).then(() => prisma.$disconnect());

export function getUniquePlayers(count: number): string[] {
  const players: Set<string> = new Set();

  while (players.size < count) players.add(`${faker.name.firstName()} ${faker.name.lastName()}`);

  return [...players];
}

export function getServers(count: number): string[] {
  const servers: string[] = [];

  for (let id = 0; id < count; id++) servers.push(`server${id}`);

  return servers;
}