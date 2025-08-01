import "dotenv-defaults/config";
import fs from "fs";
import { main } from "../main";
import { getArg } from "../utils";

const inputDataFileName = getArg("fileName") || getArg("filename") || "default";

const inputData = fs.readFileSync(`./_data/${inputDataFileName}.txt`, "utf8");

(async () => {
  main(inputData);
})();

