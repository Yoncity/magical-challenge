import { Hono } from "hono";
import { main } from "../main";

const routes = new Hono();

routes.get("/hello", (c) => {
  return c.text("👋 Hello from Automation API!");
});

routes.post("/run-workflow", async (c) => {
  const inputData = await c.req.text();

  if (!inputData.trim()) {
    return c.text("Request body is required and must be plain text.", 400);
  }

  await main(inputData);
  return c.json({ message: "Workflow run successfully" });
});

export default routes;
