-- CreateTable
CREATE TABLE "Statistics" (
    "server" TEXT NOT NULL,
    "player" TEXT NOT NULL,
    "xpCount" INTEGER NOT NULL DEFAULT 0
);

-- CreateIndex
CREATE UNIQUE INDEX "Statistics_server_player_key" ON "Statistics"("server", "player");
