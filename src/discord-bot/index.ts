import { ChatInputCommandInteraction, Client } from "discord.js";
import { config } from "../config";
import { commands } from "./commands";
import { deployAllCommands, deployCommands } from "./deploy-commands";
import { updateCommands } from "./updateCommands";

let client: Client;

export function init() {
  client = new Client({
    intents: ["Guilds", "GuildMessages", "DirectMessages"],
  });

  client.once("clientReady", async () => {
    console.log("Discord bot is ready! 🤖");
    deployAllCommands();
    updateCommands(client.guilds);
  });

  client.on("guildCreate", async (guild) => {
    await deployCommands({ guildId: guild.id });
  });

  client.on("interactionCreate", async (interaction) => {
    if (!interaction.isChatInputCommand()) {
      return;
    }
    const { commandName } = interaction;
    if (commands[commandName]) {
      commands[commandName].execute(interaction);
    }
  });

  client.login(config.DISCORD_TOKEN);
}
