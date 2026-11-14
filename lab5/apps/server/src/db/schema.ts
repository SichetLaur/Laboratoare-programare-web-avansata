import {
  integer,
  real,
  sqliteTable,
  text,
} from "drizzle-orm/sqlite-core";
import type { SurveyStatus } from "field-app-contract/contract";

const now = () => new Date().toISOString();

const row = {
  id: text()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  createdAt: text().notNull().$defaultFn(now),
  updatedAt: text().notNull().$defaultFn(now).$onUpdateFn(now),
};

export const buildings = sqliteTable("buildings", {
  ...row,
  label: text().notNull(),
  comment: text(),
});

export const entrances = sqliteTable("entrances", {
  ...row,
  buildingId: text()
    .notNull()
    .references(() => buildings.id),
  entranceName: text().notNull(),
  street: text().notNull(),
  number: text().notNull(),
  lat: real().notNull(),
  lng: real().notNull(),
  coordsConfirmed: integer({ mode: "boolean" }).notNull().default(false),
  correctedLat: real(),
  correctedLng: real(),
  stories: integer(),
  flats: integer(),
  elevators: integer(),
  yearBuilt: integer(),
  groundFloorShops: integer({ mode: "boolean" }),
  surveyStatus: text().$type<SurveyStatus>().notNull().default("not_started"),
  surveyorId: text(),
  surveyedAt: text(),
  address: text(),
  notes: text(),
  doorCode: text(),
  accessType: text(),
  condition: text(),
});

export const surveys = sqliteTable("surveys", {
  ...row,
  entranceId: text()
    .notNull()
    .references(() => entrances.id),
  surveyorNotes: text().notNull(),
  scheduledAt: text().notNull(),
});