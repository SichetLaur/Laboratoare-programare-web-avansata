import { z } from "zod";

export const Id = z.string().uuid();
export type Id = z.infer<typeof Id>;

export const Timestamp = z.string().datetime({ offset: true });
export type Timestamp = z.infer<typeof Timestamp>;

export const SurveyStatus = z.enum([
  "not_started",
  "in_progress",
  "submitted",
  "approved",
  "needs_rework",
]);
export type SurveyStatus = z.infer<typeof SurveyStatus>;

export const SURVEYED: readonly SurveyStatus[] = [
  "submitted",
  "approved",
  "needs_rework",
] as const;

export const Building = z.object({
  id: Id,
  label: z.string().min(1),
  comment: z.string().nullable(),
  createdAt: Timestamp,
  updatedAt: Timestamp,
});
export type Building = z.infer<typeof Building>;

export const EntranceFields = z.object({
  buildingId: Id,
  entranceName: z.string().min(1),
  street: z.string().min(1),
  number: z.string().min(1),
  lat: z.number().min(-90).max(90),
  lng: z.number().min(-180).max(180),
  coordsConfirmed: z.boolean(),
  correctedLat: z.number().min(-90).max(90).nullable(),
  correctedLng: z.number().min(-180).max(180).nullable(),
  stories: z.number().int().min(1).max(60).nullable(),
  flats: z.number().int().min(0).nullable(),
  elevators: z.number().int().min(0).nullable(),
  yearBuilt: z.number().int().min(1800).max(2100).nullable(),
  groundFloorShops: z.boolean().nullable(),
  surveyStatus: SurveyStatus,
  surveyorId: Id.nullable(),
  surveyedAt: Timestamp.nullable(),
  address: z.string().nullable(),
  notes: z.string().nullable(),
  doorCode: z.string().nullable(),
  accessType: z.string().nullable(),
  condition: z.string().nullable(),
});
export type EntranceFields = z.infer<typeof EntranceFields>;

export const Entrance = EntranceFields.extend({
  id: Id,
  createdAt: Timestamp,
  updatedAt: Timestamp,
}).superRefine((data, ctx) => {
  const hasCorrLat = data.correctedLat !== null;
  const hasCorrLng = data.correctedLng !== null;
  if (hasCorrLat !== hasCorrLng) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["correctedLng"],
      message:
        "E1: correctedLat and correctedLng must both be set or both null",
    });
  }

  const isSurveyed = (SURVEYED as readonly string[]).includes(
    data.surveyStatus,
  );
  if (!isSurveyed) return;

  if (!data.coordsConfirmed && !hasCorrLat) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["coordsConfirmed"],
      message: "E2: a surveyed entrance must confirm or correct the pin",
    });
  }

  const required: (keyof typeof data)[] = [
    "address",
    "stories",
    "flats",
    "elevators",
    "yearBuilt",
    "groundFloorShops",
    "surveyorId",
    "surveyedAt",
  ];
  for (const field of required) {
    if (data[field] === null || data[field] === undefined) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: [field],
        message: `E3: surveyed entrance must have ${String(field)}`,
      });
    }
  }
});
export type Entrance = z.infer<typeof Entrance>;

export const User = z.object({
  id: Id,
  name: z.string().min(1),
  email: z.string().email(),
  role: z.enum(["admin", "surveyor", "viewer"]),
  createdAt: Timestamp,
  updatedAt: Timestamp,
});
export type User = z.infer<typeof User>;