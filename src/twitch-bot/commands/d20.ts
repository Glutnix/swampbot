import { createBotCommand } from "@twurple/easy-bot";
import { TwitchCommand } from "../types/TwitchCommand";

const command: TwitchCommand = {
  name: "d20",
  execute: createBotCommand(
    "myd20",
    async (params, { userName, say, timeout }) => {
      const diceRoll = Math.floor(Math.random() * 20) + 1;
      if (diceRoll === 1) {
        await say(
          `@${userName} rolled a critical failure and must be punished!`,
        );
        await timeout(30, "critical failure");
      } else if (diceRoll === 20) {
        await say(
          `Woah, critical success! @${userName} deserves all the praise!`,
        );
      } else {
        await say(`🎲 @${userName} rolled a ${diceRoll}!`);
      }
    },
  ),
};

export default command;
