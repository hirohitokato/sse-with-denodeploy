import { Hono } from 'hono';

const app = new Hono();

app.post('/event', (c) => {
  const currentTime = new Date().toISOString();
  c.res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
  });
  c.res.write(`data: ${currentTime}\n\n`);
  return c.res.end();
});

export default app;