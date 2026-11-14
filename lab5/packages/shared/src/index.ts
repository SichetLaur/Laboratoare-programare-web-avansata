import { z } from "zod";
import { Id, Building, EntranceFields } from "field-app-contract/contract";

export const NewBuilding = Building.pick({ label: true, comment: true });
export type NewBuilding = z.infer<typeof NewBuilding>;

export const NewEntrance = EntranceFields.pick({
  buildingId: true,
  entranceName: true,
  lat: true,
  lng: true,
  number: true,
  street: true,
});
export type NewEntrance = z.infer<typeof NewEntrance>;

export const NewSurvey = z.object({
  entranceId: Id,
  notes: z.string().min(1),
  scheduledAt: z.string().datetime({ offset: true }),
});
export type NewSurvey = z.infer<typeof NewSurvey>;