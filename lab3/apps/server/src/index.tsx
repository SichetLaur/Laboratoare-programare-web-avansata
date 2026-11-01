import { serveStatic } from "@hono/bun";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { entrancesApi } from "./entrances";

type Env = { Variables: { requestId: string } };
const app = new Hono<Env>();

app.use(logger());

app.use(async (c, next) => {
  const started = performance.now();
  c.set("requestId", crypto.randomUUID().slice(0, 8));
  await next();
  const ms = (performance.now() - started).toFixed(1);
  c.header("X-Request-Id", c.get("requestId"));
  c.header("X-Response-Time", `${ms}ms`);
});

app.use("/api/*", cors({ origin: "http://localhost:5173" }));
app.use("*", serveStatic({ root: "./public" }));

app.route("/api/entrances", entrancesApi);

app.get("/", (c) => c.text("Office Server Running\n"));
app.notFound((c) => c.json({ error: "Not found", path: c.req.path }, 404));

export default app;