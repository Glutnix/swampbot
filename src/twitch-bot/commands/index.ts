import { readdirSync } from "node:fs";
import { join } from "node:path";
import { TwitchCommand } from "../types/TwitchCommand";

const commandFiles = readdirSync(__dirname).filter(
  (file) =>
    /\.(?:ts|js)$/.test(file) &&
    !/^index\.(?:ts|js)$/.test(file) &&
    !file.startsWith("_"),
);

export const commands = commandFiles.map((file) => {
  console.log(`Loading Twitch command from file: ${file}`);
  const { default: command } = require(join(__dirname, file)) as {
    default: TwitchCommand;
  };
  return command.execute;
});
