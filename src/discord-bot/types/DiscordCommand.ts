import {
  ChatInputCommandInteraction,
  InteractionResponse,
  MessageContextMenuCommandInteraction,
  SlashCommandBuilder,
  SlashCommandOptionsOnlyBuilder,
  UserContextMenuCommandInteraction,
} from "discord.js";

export type DiscordCommand = {
  data: SlashCommandBuilder | SlashCommandOptionsOnlyBuilder;
  execute: (
    parameter: ChatInputCommandInteraction,
  ) => Promise<InteractionResponse<boolean>>;
};
