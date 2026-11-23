import type { CommandsList } from "@/shared/types/commands.js";
import { pingCommand } from "./commands/ping.js";

export const generalCommands: CommandsList = [pingCommand];
