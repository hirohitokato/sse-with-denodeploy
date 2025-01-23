import { Hono } from "hono";
import { serveStatic } from "https://deno.land/x/hono/middleware.ts";

const app = new Hono();
let sse_controller: ReadableStreamDefaultController<Uint8Array> | null = null;

app.put("/api/notifydate", async (c) => {
  const data = await c.req.json();
  let elapsed_time = -1;
  if (data?.date) {
    elapsed_time =
      Math.abs(new Date(data.date).getTime() - new Date().getTime());
  }
  const currentTime = new Date().toISOString();
  const json = JSON.stringify({
    send_date: new Date(data.date).toISOString(),
    date: currentTime,
    diff: elapsed_time,
  });
  sse_controller?.enqueue(
    new TextEncoder().encode(`data: ${json}\n\n`),
  );
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
    },
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
