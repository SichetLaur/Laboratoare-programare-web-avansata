# Lab 5 - Office Site (Web Advanced Programming)

Monorepo built with Bun workspaces and Turborepo. The project manages
buildings and entrances for an office survey system.

## Tech Stack

- Runtime: Bun 1.4
- Language: TypeScript
- Server: Hono
- Client: React 19 + Vite
- Database: SQLite via Drizzle ORM
- Validation: Zod (shared contract)
- Task runner: Turborepo

## Project Structure

apps/
server/ - Hono API (port 3000)
web/ - React client (port 5173)
packages/
shared/ - Office-specific Zod schemas
contract/ - Field-app contract (vendored at v1)


## Setup

```bash
bun install
bun run db:generate -- --name the-contract
bun run db:migrate
bun run db:seed


## Development
bun run dev
Starts both the server and the web client via Turborepo.


## Tests
bun run test
Runs contract tests and server repository tests. The second run
replays cached results when nothing has changed.


Scripts
Command	                         Description
bun run dev	                     Start server and web in parallel
bun run test	                 Run all tests through Turborepo
bun run typecheck	             Type-check all packages
bun run db:generate	             Generate Drizzle migration
bun run db:migrate	             Apply migrations to SQLite
bun run db:seed	                 Seed database with fixtures