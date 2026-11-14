import { Hono } from "hono";
import { cors } from "hono/cors";
import {
  listBuildings,
  listEntrances,
  getEntrance,
  createEntrance,
  deleteEntrance,
} from "./db/repository";

const app = new Hono();

app.use("/*", cors());

app.get("/", (c) => {
  return c.json({ status: "ok", message: "Office site API" });
});

app.get("/api/buildings", (c) => {
  return c.json({ buildings: listBuildings() });
});

app.get("/api/entrances", (c) => {
  const q = c.req.query("q");
  return c.json({ entrances: listEntrances(q) });
});

app.get("/api/entrances/:id", (c) => {
  const entrance = getEntrance(c.req.param("id"));
  if (!entrance) return c.json({ error: "Not found" }, 404);
  return c.json(entrance);
});

app.post("/api/entrances", async (c) => {
  const body = await c.req.json();
  const created = createEntrance(body);
  return c.json(created, 201);
});

app.delete("/api/entrances/:id", (c) => {
  const deleted = deleteEntrance(c.req.param("id"));
  if (!deleted) return c.json({ error: "Not found" }, 404);
  return c.json({ ok: true });
});

export default {
  port: 3000,
  fetch: app.fetch,
};