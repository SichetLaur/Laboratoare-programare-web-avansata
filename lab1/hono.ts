import { Hono } from "hono";
import { logger } from "hono/logger";

const app = new Hono();
app.use(logger());

app.get("/", (c) => {
  c.header("X-Course", "advanced-web");
  return c.text("Hello from Hono!\n");
});

app.get("/echo", (c) => c.json({ hello: c.req.query("name") ?? "stranger" }));
app.post("/echo", async (c) => {
  const body = await c.req.text();
  return c.json({ youSent: body, contentType: c.req.header("content-type") });
});

app.get("/time", (c) => {
  c.header("Cache-Control", "no-store");
  return c.json({ now: new Date().toISOString() });
});

app.get("/headers", (c) => {
  return c.json(c.req.header());
});

app.get("/status/:code", (c) => {
  const code = Number(c.req.param("code"));

  if (isNaN(code) || code < 200 || code > 599) {
    return c.json(
      { error: "Bad Request: status code must be a number between 200 and 599" },
      400
    );
  }

  return c.json({ status: code }, code as any);
});

app.all("/", (c) => c.json({ error: "Method Not Allowed" }, 405, { Allow: "GET" }));
app.all("/echo", (c) => c.json({ error: "Method Not Allowed" }, 405, { Allow: "GET, POST" }));
app.all("/time", (c) => c.json({ error: "Method Not Allowed" }, 405, { Allow: "GET" }));
app.all("/headers", (c) => c.json({ error: "Method Not Allowed" }, 405, { Allow: "GET" }));
app.all("/status/:code", (c) => c.json({ error: "Method Not Allowed" }, 405, { Allow: "GET" }));

app.notFound((c) => c.json({ error: "Not found", path: c.req.path }, 404));

export default app;