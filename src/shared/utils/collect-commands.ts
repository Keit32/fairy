import { env } from "@config/env.js";
import { generalCommands } from "@features/general/commands.js";
import type { CommandsCollection } from "@shared/types/commands.js";
import { testCommands } from "@test/commands.js";
import {
	Collection,
	type RESTPostAPIChatInputApplicationCommandsJSONBody,
} from "discord.js";

const combinedCommands = [...generalCommands];
const allCommands =
	env.ENVIRONMENT === "development"
		? [...combinedCommands, ...testCommands]
		: combinedCommands;

export function collectCommands(): CommandsCollection {
	const commands: CommandsCollection = new Collection();

	for (const command of allCommands) {
		commands.set(command.data.name, command);
	}

	return commands;
}

export function collectCommandsJson(): RESTPostAPIChatInputApplicationCommandsJSONBody[] {
	return allCommands.map((command) => command.data.toJSON());
}
