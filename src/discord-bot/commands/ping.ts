import {
  ChatInputCommandInteraction,
  InteractionResponse,
  SlashCommandBuilder,
} from "discord.js";
import { DiscordCommand } from "../types/DiscordCommand";
import { usersTable } from "../../db/schema";
import db from "../../dbclient";

const command: DiscordCommand = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with Pong!"),
  execute: async (interaction): Promise<InteractionResponse<boolean>> => {
    const { id, globalName } = interaction.user;
    const user: typeof usersTable.$inferInsert = {
      discord_user_id: id,
      name: globalName || "(no global name)",
    };
    await db
      .insert(usersTable)
      .values(user)
      .onConflictDoUpdate({
        target: usersTable.discord_user_id,
        set: { name: user.name },
      });
    return interaction.reply("Pong!");
  },
};

export default command;
