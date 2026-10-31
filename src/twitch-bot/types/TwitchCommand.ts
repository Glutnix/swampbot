import { BotCommand } from "@twurple/easy-bot";

export type TwitchCommand = {
  name: string;
  execute: BotCommand;
};
