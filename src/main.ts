import { generateText } from "ai";
import fs from "fs";
import { model } from "./_internal/setup";
import { createSession } from "./session";

const inputData = fs.readFileSync("./_data/default.txt", "utf8");

export async function main() {
  const response = await generateText({
    model,
    prompt: `
      You are an intelligent web agent. Your goal is to follow the SOP and fully complete the form, **even if some fields are hidden at first**.

      Treat the form like a dynamic user interface. Some fields may be:
      - Hidden behind collapsible sections (like accordions)
      - Disabled until a previous step is completed
      - Inside tabs or conditional panels

      **You must interact with the UI to reveal all required inputs when necessary.** If a field from the SOP is not immediately visible, take logical steps to uncover it. **Prioritize clicking interactive elements like buttons or links that expand sections or activate content. Always base your selection on text or accessible names found directly within the HTML markup, ensuring it accurately matches the required input from the SOP. Do not hallucinate names.**

      You succeed only if every field in the SOP is filled correctly.

      Each action should be JSON formatted like:
      {
        "action": "fill" | "select" | "click" | "scroll" | "wait",
        "role": "..." (ARIA role),
        "label": "...",
        "value": "..." (for fill/select)
      }

      Supported actions: fill, select, click, scroll, wait

      SOP:
      1. Navigate to https://magical-medical-form.netlify.app/
      2. Fill out the form with input data below.
      3. Click 'Submit'

      Input data:
      ${inputData}

      Your output should be a JSON:
      {
        "targetUrl": "...",
        "actions": [...]
      }
    `,
  });
  console.log("🚨 - main.ts - 61", response.text);

  const { targetUrl, actions } = JSON.parse(
    response.text.replace(/```json/g, "").replace(/```/g, "")
  );

  // This will create a chromium instance, connect, and navigate to the target url & returns a playwright page.
  const page = await createSession(targetUrl);

  for (const action of actions) {
    switch (action.action) {
      case "fill":
        await page
          .getByRole(action.role, { name: action.label })
          .fill(action.value);
        break;
      case "select":
        await page
          .getByRole(action.role, { name: action.label })
          .selectOption({ label: action.value });
        break;
      case "click":
        await page.getByRole(action.role, { name: action.label }).click();
        break;
      case "scroll":
        await page
          .getByRole(action.role, { name: action.label })
          .scrollIntoViewIfNeeded();
        break;
    }
  }
}
