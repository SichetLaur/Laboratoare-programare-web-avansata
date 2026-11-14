import { eq, like } from "drizzle-orm";
import { db } from "../db";
import { buildings, entrances } from "./schema";
import type { Building, Entrance } from "field-app-contract/contract";

export function listBuildings(): Building[] {
  return db.select().from(buildings).all() as unknown as Building[];
}

export function getBuilding(id: string): Building | null {
  const row = db
    .select()
    .from(buildings)
    .where(eq(buildings.id, id))
    .get();
  return (row as unknown as Building) ?? null;
}

export function createBuilding(data: {
  label: string;
  comment: string | null;
}): Building {
  return db
    .insert(buildings)
    .values(data)
    .returning()
    .get() as unknown as Building;
}

export function listEntrances(q?: string): Entrance[] {
  if (q) {
    return db
      .select()
      .from(entrances)
      .where(like(entrances.street, `%${q}%`))
      .all() as unknown as Entrance[];
  }
  return db.select().from(entrances).all() as unknown as Entrance[];
}

export function getEntrance(id: string): Entrance | null {
  const row = db
    .select()
    .from(entrances)
    .where(eq(entrances.id, id))
    .get();
  return (row as unknown as Entrance) ?? null;
}

export function createEntrance(
  data: Omit<Entrance, "id" | "createdAt" | "updatedAt">,
): Entrance {
  return db
    .insert(entrances)
    .values(data as Record<string, unknown>)
    .returning()
    .get() as unknown as Entrance;
}

export function deleteEntrance(id: string): boolean {
  const result = db
    .delete(entrances)
    .where(eq(entrances.id, id))
    .returning({ id: entrances.id })
    .all();
  return result.length > 0;
}