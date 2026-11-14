import { Building, Entrance } from "field-app-contract/contract";
import { db } from "../src/db";
import { buildings, entrances, surveys } from "../src/db/schema";

const loadFixture = async (name: string): Promise<unknown[]> => {
  const url = import.meta.resolve(`field-app-contract/fixtures/${name}.json`);
  return Bun.file(new URL(url)).json();
};

export async function seed() {
  const buildingRows = await loadFixture("buildings");
  const entranceRows = await loadFixture("entrances");

  const buildingList = Building.array().parse(buildingRows);
  const entranceList = Entrance.array().parse(entranceRows);

  db.transaction((tx) => {
    tx.delete(surveys).run();
    tx.delete(entrances).run();
    tx.delete(buildings).run();

    tx.insert(buildings)
      .values(buildingList as unknown as (typeof buildings.$inferInsert)[])
      .run();
    tx.insert(entrances)
      .values(entranceList as unknown as (typeof entrances.$inferInsert)[])
      .run();
  });

  return { buildings: buildingList.length, entrances: entranceList.length };
}

if (import.meta.main) {
  const counts = await seed();
  console.log(
    `Seeded ${counts.buildings} buildings and ${counts.entrances} entrances.`,
  );
}