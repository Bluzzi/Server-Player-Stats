import { prisma } from "../database";

export async function getGlobalTop(startIndex = 0, take = 10) {
  return  await prisma.statistics.groupBy({
    by: ["player"],
    orderBy: [{ _sum: { xpCount: "desc" } }],
    _sum: { xpCount: true },
    skip: startIndex,
    take: take
  });
}

export async function getServerTop(serverId: string, startIndex = 0, take = 10) {
  return await prisma.statistics.findMany({
    where: {
      server: serverId
    },
    orderBy: {
      xpCount: "desc"
    },
    skip: startIndex,
    take: take
  });
}

export async function getPlayerPositionOnServer(serverId: string, playerName: string) {
  const position = await prisma.statistics.count({
    where: {
      server: serverId,
      xpCount: { gt: await getPlayerServerXP(serverId, playerName) }
    }
  });

  return position + 1;
}

export async function getPlayerGlobalPosition(playerName: string) {
  const position = await prisma.statistics.count({
    where: {
      xpCount: { gt: await getPlayerGlobalXP(playerName) }
    }
  });

  return position + 1;
}

export async function getPlayerServerXP(serverId: string, playerName: string): Promise<number> {
  const stats = await prisma.statistics.findUnique({
    where: {
      server_player: {
        server: serverId,
        player: playerName
      }
    },
    select: { xpCount: true }
  });

  return stats?.xpCount || 0;
}

export async function getPlayerGlobalXP(playerName: string): Promise<number> {
  const stats = await prisma.statistics.findMany({
    where: {
      player: playerName
    },
    select: {
      xpCount: true
    }
  });

  return stats.reduce((pre, curr) => pre + curr.xpCount, 0);
}