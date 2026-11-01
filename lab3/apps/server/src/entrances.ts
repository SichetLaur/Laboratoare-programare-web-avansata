import { type Entrance, fieldErrors, NewEntrance } from "@office/shared";
import { Hono } from "hono";

let entrances: Entrance[] = [
  { id: 1, address: "Str. Lalelelor 4, scara A", floors: 4, hasElevator: false },
  { id: 2, address: "Bd. Unirii 12, scara B", floors: 10, hasElevator: true },
  { id: 3, address: "Calea Victoriei 101", floors: 7, hasElevator: true },
];
let nextId = 4;

export const entrancesApi = new Hono();

entrancesApi.get("/", (c) => c.json(entrances));

entrancesApi.get("/:id", (c) => {
  const id = Number(c.req.param("id"));
  const entrance = entrances.find((e) => e.id === id);
  if (!entrance) {
    return c.json({ error: "Entrance not found" }, 404);
  }
  return c.json(entrance);
});

entrancesApi.post("/", async (c) => {
  const body = await c.req.json().catch(() => null);
  const result = NewEntrance.safeParse(body);
  if (!result.success) {
    return c.json({ errors: fieldErrors(result.error) }, 400);
  }
  const entrance: Entrance = { id: nextId, ...result.data };
  nextId += 1;
  entrances.push(entrance);
  return c.json(entrance, 201);
});

entrancesApi.delete("/:id", (c) => {
  const id = Number(c.req.param("id"));
  const index = entrances.findIndex((e) => e.id === id);
  if (index === -1) {
    return c.json({ error: "Entrance not found" }, 404);
  }
  entrances.splice(index, 1);
  return c.json({ success: true });
});