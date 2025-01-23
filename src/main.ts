import { Hono } from "hono";
import { serveStatic } from "https://deno.land/x/hono/middleware.ts";

const app = new Hono();
let sse_controller: ReadableStreamDefaultController<Uint8Array> | null = null;

app.put("/api/notifydate", async (c) => {
  const currentTime = new Date().toISOString();
  sse_controller?.enqueue(new TextEncoder().encode(`data: ${currentTime}\n\n`));
  return c.json({ status: "ok" });
});

app.get("/sse", (c) => {
  const stream = new ReadableStream({
    start(controller) {
      sse_controller = controller;
      return () => {};
    },
    cancel() {
      sse_controller = null;
    }
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      "Connection": "keep-alive",
    },
  });
});

app.use("/*", serveStatic({ root: "./frontend" }));

Deno.serve(app.fetch);
