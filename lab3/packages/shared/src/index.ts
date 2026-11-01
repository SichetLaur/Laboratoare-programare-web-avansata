import { z } from "zod";

export const NewEntrance = z.object({
  address: z.string().trim().min(1, "Address is required"),
  floors: z
    .number({ invalid_type_error: "Floors must be a number" })
    .int("Floors must be a whole number")
    .min(1, "Floors must be at least 1"),
  hasElevator: z.boolean(),
});

export type NewEntrance = z.infer<typeof NewEntrance>;
export type Entrance = NewEntrance & { id: number };

export function fieldErrors(error: z.ZodError) {
  return error.flatten().fieldErrors;
}