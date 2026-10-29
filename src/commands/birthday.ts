import {
  CommandInteraction,
  MessageFlags,
  SlashCommandBuilder,
} from "discord.js";
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
  const rawBday = interaction.options.getString("birthdate");
  let bday;
  try {
    bday = parseBirthday(rawBday);
  } catch {
    return replyError(interaction, rawBday);
  }

  await upsertUser(interaction, bday);
  return replySuccess(interaction, bday);
}

function parseBirthday(raw: string): Temporal.PlainDate {
  return Temporal.PlainDate.from(raw);
}

function replyError(
  interaction: CommandInteraction,
  rawBday: string,
): Promise<unknown> {
  return interaction.reply({
    content: `I don't understand the date ${rawBday}, sorry. Try again in YYYY-MM-DD format.`,
    flags: MessageFlags.Ephemeral,
  });
}

async function upsertUser(
  interaction: CommandInteraction,
  bday: Temporal.PlainDate,
): Promise<void> {
  const { id, globalName } = interaction.user;
  const user: typeof usersTable.$inferInsert = {
    discord_user_id: id,
    name: globalName || "(no global name)",
    birthday: bday.toString(),
  };
  await db
    .insert(usersTable)
    .values(user)
    .onConflictDoUpdate({
      target: usersTable.discord_user_id,
      set: { name: user.name, birthday: user.birthday },
    });
}

function replySuccess(
  interaction: CommandInteraction,
  bday: Temporal.PlainDate,
): Promise<unknown> {
  const { globalName } = interaction.user;
  const formattedBirthday = bday.toLocaleString("en-us", { dateStyle: "long" });
  const dayNames = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const dayName = dayNames[bday.dayOfWeek - 1];

  console.log(`Set birthday for ${globalName}: ${formattedBirthday}`);
  return interaction.reply({
    content: `Tada! Your birthday is set to ${formattedBirthday}! \nOh, and you were born on a ${dayName}!`,
    flags: MessageFlags.Ephemeral,
  });
}
