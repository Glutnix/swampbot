import dotenv from "dotenv";

dotenv.config();

const {
  DISCORD_TOKEN,
  DISCORD_CLIENT_ID,
  DB_FILE_NAME,
  TWITCH_CLIENT_ID,
  TWITCH_ACCESS_TOKEN,
} = process.env;

if (
  !DISCORD_TOKEN ||
  !DISCORD_CLIENT_ID ||
  !DB_FILE_NAME ||
  !TWITCH_CLIENT_ID ||
  !TWITCH_ACCESS_TOKEN
) {
  throw new Error("Missing environment variables");
}

export const config = {
  DISCORD_TOKEN,
  DISCORD_CLIENT_ID,
  DB_FILE_NAME,
  TWITCH_CLIENT_ID,
  TWITCH_ACCESS_TOKEN,
};
