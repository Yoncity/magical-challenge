import "dotenv-defaults/config";

import { CronJob } from "cron";
import fs from "fs";
import { main } from "../main";

const inputData = fs.readFileSync("./_data/default.txt", "utf8");

const runWorkflow = async () => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] Running scheduled workflow...`);

  await main(inputData);

  console.log("🔁 Cron job finished.");
};

// Run every 5 minutes
new CronJob("*/5 * * * *", runWorkflow, null, true);

console.log("🔁 Cron job started: will run every 5 minutes.");
