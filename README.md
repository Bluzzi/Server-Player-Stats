# Server Player Stats
A SQL table to manage a quantity of XP for players on various servers.

## Setup
1. `pnpm install`
2. `pnpm run db:client`
3. `pnpm run db:migrate-dev`
4. `pnpm run db:seed` (optional, you can use already seeded data)

## View data
- `pnpm run db:studio`: see seeded data
- `pnpm run dev`: view statistics