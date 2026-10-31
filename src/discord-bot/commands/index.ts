import { readdirSync } from "node:fs";
import { join } from "node:path";
import type { DiscordCommand } from "../types/DiscordCommand";

const commandFiles = readdirSync(__dirname).filter(
  (file) =>
    /\.(?:ts|js)$/.test(file) &&
    !/^index\.(?:ts|js)$/.test(file) &&
    !file.startsWith("_"),
);

export const commands = Object.fromEntries(
  commandFiles.map((file) => {
    console.log(`Loading command from file: ${file}`);
    const { default: command } = require(join(__dirname, file)) as {
      default: DiscordCommand;
    };
    return [command.data.name, command];
  }),
);
