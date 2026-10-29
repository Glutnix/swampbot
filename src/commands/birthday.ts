import { CommandInteraction, MessageFlags, SlashCommandBuilder } from "discord.js";
import { usersTable } from "../db/schema";
import db from "../dbclient";

export const data = new SlashCommandBuilder()
  .setName("birthday")
  .addStringOption((builder) => {
    builder.setRequired(true);
    builder.setName("birthdate");
    builder.setDescription("Your birthday in YYYY-MM-DD format");
    builder.setMinLength(9);
    builder.setMaxLength(10);
    return builder;
  })
  .setDescription("Set your birthday with the birthday bot!");

export async function execute(interaction: CommandInteraction) {
  const { id, globalName } = interaction.user;
  const rawBday = interaction.options.getString('birthdate');
  const bday = Temporal.PlainDate.from(rawBday);

  if (!bday){
    return interaction.reply({content:`I don't understand the date ${rawBday}, sorry. Try again in YYYY-MM-DD format.`, flags: MessageFlags.Ephemeral});    
  }

  const user: typeof usersTable.$inferInsert = {
    discord_user_id: id,
    name: globalName || "(no global name)",
    birthday: bday.toString()
  };
  await db
    .insert(usersTable)
    .values(user)
    .onConflictDoUpdate({
      target: usersTable.discord_user_id,
      set: { name: user.name, birthday: user.birthday },
    });

  const dayNames = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
  ];
    
  const formattedBirthday = bday.toLocaleString("en-us", {dateStyle:"long"});
  const dayName = dayNames[bday.dayOfWeek - 1];
  console.log(`Set birthday for ${globalName}: ${formattedBirthday}`)
  return interaction.reply({content:`Tada! Your birthday is set to ${formattedBirthday}! \nOh, and you were born on a ${dayName}!`, flags: MessageFlags.Ephemeral});
}
