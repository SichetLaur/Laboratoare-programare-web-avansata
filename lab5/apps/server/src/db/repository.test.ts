import { beforeAll, describe, expect, test } from "bun:test";
import { db } from "../db";
import { migrate } from "../../scripts/migrate";
import { seed } from "../../scripts/seed";
import { listEntrances, getEntrance, createEntrance } from "./repository";
import { Entrance } from "field-app-contract/contract";

const loadFixture = async (name: string): Promise<unknown[]> => {
  const url = import.meta.resolve(`field-app-contract/fixtures/${name}.json`);
  return Bun.file(new URL(url)).json();
};

beforeAll(async () => {
  if (db.$client.filename !== ":memory:") {
    throw new Error(`Refusing to test on ${db.$client.filename}`);
  }
  migrate();
  await seed();
});

describe("repository", () => {
  test("seed brings 20 entrances from the fixture", async () => {
    const listed = listEntrances();
    expect(listed).toHaveLength(20);
  });

  test("seed data matches fixture exactly", async () => {
    const entranceRows = await loadFixture("entrances");
    const listed = listEntrances();
    expect(listed).toEqual(expect.arrayContaining(entranceRows as object[]));
  });

  test("search by street finds Lipscani entrances", () => {
    const results = listEntrances("Lipscani");
    expect(results.length).toBeGreaterThanOrEqual(4);
    for (const e of results) {
      expect(e.street).toContain("Lipscani");
    }
  });

  test("SQL injection attempt finds nothing", () => {
    const results = listEntrances("x' OR 1=1 --");
    expect(results).toHaveLength(0);
  });

  test("getEntrance returns null for unknown id", () => {
    const result = getEntrance("00000000-0000-0000-0000-000000000000");
    expect(result).toBeNull();
  });

  test("createEntrance returns a valid entrance", () => {
    const created = createEntrance({
      buildingId: "550e8400-e29b-41d4-a716-446655440001",
      entranceName: "Test",
      street: "Test Street",
      number: "1",
      lat: 44.43,
      lng: 26.09,
      coordsConfirmed: false,
      correctedLat: null,
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
    });

    expect(() => Entrance.parse(created)).not.toThrow();
    expect(created.surveyStatus).toBe("not_started");

    expect(listEntrances()).toHaveLength(21);
  });
});