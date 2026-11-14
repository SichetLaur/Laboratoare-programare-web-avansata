import { describe, expect, test } from "bun:test";
import { Building, Entrance } from "../contract";

const load = async (name: string): Promise<unknown[]> =>
  Bun.file(new URL(`../fixtures/${name}.json`, import.meta.url)).json();

describe("every fixture parses with its schema", () => {
  test("buildings", async () => {
    const rows = await load("buildings");
    const result = Building.array().safeParse(rows);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toHaveLength(6);
    }
  });

  test("entrances", async () => {
    const rows = await load("entrances");
    const result = Entrance.array().safeParse(rows);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toHaveLength(20);
    }
  });
});

describe("a wrong entrance is refused", () => {
  test("E1: correctedLat without correctedLng", () => {
    const bad = {
      id: "550e8400-e29b-41d4-a716-446655440099",
      buildingId: "550e8400-e29b-41d4-a716-446655440001",
      entranceName: "X",
      street: "Test",
      number: "1",
      lat: 44.43,
      lng: 26.09,
      coordsConfirmed: false,
      correctedLat: 44.44,
      correctedLng: null,
      stories: null,
      flats: null,
      elevators: null,
      yearBuilt: null,
      groundFloorShops: null,
      surveyStatus: "not_started",
      surveyorId: null,
      surveyedAt: null,
      address: null,
      notes: null,
      doorCode: null,
      accessType: null,
      condition: null,
      createdAt: "2026-01-01T00:00:00Z",
      updatedAt: "2026-01-01T00:00:00Z",
    };
    const result = Entrance.safeParse(bad);
    expect(result.success).toBe(false);
    if (!result.success) {
      const paths = result.error.issues.map((i) => i.path.join("."));
      expect(paths).toContain("correctedLng");
    }
  });
});