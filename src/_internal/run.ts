import "dotenv-defaults/config";
import fs from "fs";
import { main } from "../main";

const inputData = fs.readFileSync("./_data/default.txt", "utf8");

(async () => {
  main(inputData);
})();

