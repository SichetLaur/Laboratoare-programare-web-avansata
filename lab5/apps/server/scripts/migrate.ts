import { join } from "node:path";
import { migrate as applyMigrations } from "drizzle-orm/bun-sqlite/migrator";
import { db } from "../src/db";

export function migrate() {
  applyMigrations(db, {
    migrationsFolder: join(import.meta.dir, "../drizzle"),
  });
}

if (import.meta.main) {
  migrate();
  console.log("Migrations applied successfully.");
}