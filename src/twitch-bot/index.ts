import { Bot } from "@twurple/easy-bot";
import { StaticAuthProvider } from "@twurple/auth";
import { config } from "../config";
import { commands } from "./commands";

let bot;

export function init() {
  bot = new Bot({
    authProvider: new StaticAuthProvider(
      config.TWITCH_CLIENT_ID,
      config.TWITCH_ACCESS_TOKEN,
    ),
    channel: "xytio",
    commands,
  });
}
