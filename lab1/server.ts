const server = Bun.serve({
  async fetch(req) {
    const url = new URL(req.url);
    const method = req.method;
    const path = url.pathname;

    console.log(`${method} ${path}${url.search}`);

    if (path === "/") {
      if (method === "GET") {
        return new Response("Hello from a server I wrote!\n", {
          headers: { "X-Course": "advanced-web" },
        });
      }
      return Response.json({ error: "Method Not Allowed" }, { status: 405, headers: { Allow: "GET" } });
    }

    if (path === "/echo") {
      if (method === "GET") {
        const name = url.searchParams.get("name") ?? "stranger";
        return Response.json({ hello: name });
      }
      if (method === "POST") {
        const body = await req.text();
        return Response.json({
          youSent: body,
          contentType: req.headers.get("content-type"),
          length: body.length,
        });
      }
      return Response.json({ error: "Method Not Allowed" }, { status: 405, headers: { Allow: "GET, POST" } });
    }

    if (path === "/time") {
      if (method === "GET") {
        return Response.json(
          { now: new Date().toISOString() },
          { headers: { "Cache-Control": "no-store" } }
        );
      }
      return Response.json({ error: "Method Not Allowed" }, { status: 405, headers: { Allow: "GET" } });
    }

    if (path === "/headers") {
      if (method === "GET") {
        const headersObject = Object.fromEntries(req.headers.entries());
        return Response.json(headersObject);
      }
      return Response.json({ error: "Method Not Allowed" }, { status: 405, headers: { Allow: "GET" } });
    }

    if (path.startsWith("/status/")) {
      if (method === "GET") {
        const codeStr = path.split("/")[2];
        const code = Number(codeStr);

        if (isNaN(code) || code < 200 || code > 599) {
          return Response.json(
            { error: "Bad Request: status code must be a number between 200 and 599" },
            { status: 400 }
          );
        }

        return Response.json({ status: code }, { status: code });
      }
      return Response.json({ error: "Method Not Allowed" }, { status: 405, headers: { Allow: "GET" } });
    }

    return Response.json({ error: "Not found", path }, { status: 404 });
  },
});

console.log(`Listening on ${server.url}`);