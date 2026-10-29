import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { usersTable } from "../db/schema";
import db from "../dbclient";

export const data = new SlashCommandBuilder()
  .setName("ping")
  .setDescription("Replies with Pong!");

export async function execute(interaction: CommandInteraction) {
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
}
