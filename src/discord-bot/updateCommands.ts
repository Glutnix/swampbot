import { GuildManager } from "discord.js";
import { deployCommands } from "./deploy-commands";

export async function updateCommands(guilds: GuildManager) {
  return Promise.all(
    guilds.cache.map((guild) => {
      return deployCommands({ guildId: guild.id });
    }),
  );
}
