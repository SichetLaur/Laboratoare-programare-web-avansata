import { Database } from "bun:sqlite";
import { drizzle } from "drizzle-orm/bun-sqlite";
import * as schema from "./db/schema";

const isTest = process.env.NODE_ENV === "test";
const dbPath = isTest ? ":memory:" : "data/office.sqlite";

const sqlite = new Database(dbPath);
sqlite.exec("PRAGMA journal_mode = WAL;");
sqlite.exec("PRAGMA foreign_keys = ON;");

export const db = drizzle(sqlite, { schema, casing: "snake_case" });