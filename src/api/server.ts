import "dotenv-defaults/config";

import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import routes from "./routes";

const app = new Hono();

app.route('/api', routes);

const port = process.env.PORT || 3000;

console.log(`API running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port: Number(port),
});

