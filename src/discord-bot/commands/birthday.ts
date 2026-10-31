import {
  ChatInputCommandInteraction,
  InteractionResponse,
  MessageFlags,
  SlashCommandBuilder,
} from "discord.js";
import { DiscordCommand } from "../types/DiscordCommand";
import { usersTable } from "../../db/schema";
import db from "../../dbclient";

const command: DiscordCommand = {
  data: new SlashCommandBuilder()
    .setName("birthday")
    .addStringOption((builder) => {
      builder.setRequired(true);
      builder.setName("birthdate");
      builder.setDescription("Your birthday in YYYY-MM-DD format");
      builder.setMinLength(9);
      builder.setMaxLength(10);
      return builder;
    })
    .setDescription("Set your birthday with the birthday bot!"),
  execute: async (interaction) => {
    const rawBday = interaction.options.getString("birthdate") || "";

    const bdayRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!bdayRegex.test(rawBday)) {
      return replyError(interaction, rawBday);
    }

    let bday;
    try {
      bday = parseBirthday(rawBday);
    } catch {
      return replyError(interaction, rawBday);
    }

    await upsertUser(interaction, bday);
    return replySuccess(interaction, bday);
  },
};

export default command;

function parseBirthday(raw: string): Temporal.PlainDate {
  return Temporal.PlainDate.from(raw);
}

function replyError(
  interaction: ChatInputCommandInteraction,
  rawBday: string,
): Promise<InteractionResponse<boolean>> {
  return interaction.reply({
    content: `I don't understand the date ${rawBday}, sorry. Try again in YYYY-MM-DD format.`,
    flags: MessageFlags.Ephemeral,
  });
}

async function upsertUser(
  interaction: ChatInputCommandInteraction,
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
  interaction: ChatInputCommandInteraction,
  bday: Temporal.PlainDate,
): Promise<InteractionResponse<boolean>> {
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
    content: `🎂🎉 Your birthday is set to ${formattedBirthday}! \n📆 Oh, and you were born on a ${dayName}!`,
    flags: MessageFlags.Ephemeral,
  });
}
