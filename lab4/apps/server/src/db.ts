import { Database } from "bun:sqlite";
import { mkdirSync } from "node:fs";
import { join } from "node:path";

const folder = join(import.meta.dir, "../data");

mkdirSync(folder, { recursive: true });

const databasePath =
  process.env.DATABASE_PATH ?? join(folder, "office.sqlite");

export const db = new Database(databasePath, {
  create: true,
  strict: true,
});

db.run("PRAGMA journal_mode = WAL;");

db.run("PRAGMA foreign_keys = ON;");