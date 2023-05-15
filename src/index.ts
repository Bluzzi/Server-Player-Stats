import { getGlobalTop, getPlayerGlobalPosition, getPlayerPositionOnServer, getServerTop } from "./database/data/statistic";
import { prisma } from "./database/database";

async function main(): Promise<void> {
  // TOP - SERVER 1:
  const serverTop = await getServerTop("server1");

  console.log("TOP - SERVER 1:");
  console.log(serverTop);

  // TOP - GLOBAL:
  const globalTop = await getGlobalTop();

  console.log("TOP - GLOBAL:");
  console.log(globalTop);

  // PLAYER POSITION - SERVER 1:
  const serverPlayer = serverTop[5].player;

  console.log(`PLAYER '${serverPlayer}' POSITION - SERVER 1:`);
  console.log(await getPlayerPositionOnServer("server1", serverPlayer));

  // PLAYER POSITION - GLOBAL:
  const globalPlayer = globalTop[3].player;

  console.log(`PLAYER '${globalPlayer}' POSITION - GLOBAL:`);
  console.log(await getPlayerGlobalPosition(globalPlayer));
}

void main().then(() => prisma.$disconnect());