import type { CommandsCollection } from "@shared/types/commands.js";
import type { Interaction } from "discord.js";
import type { Logger } from "pino";

export async function handleInteraction(
	interaction: Interaction,
	commands: CommandsCollection,
	logger: Logger,
): Promise<void> {
	if (!interaction.isChatInputCommand()) return;

	const command = commands.get(interaction.commandName);

	if (!command) {
		logger.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		logger.error(error);
		const errorResponse = {
			content: "There was an error while executing this command!",
			ephemeral: true,
		};

		if (interaction.replied || interaction.deferred) {
			await interaction.followUp(errorResponse);
		} else {
			await interaction.reply(errorResponse);
		}
	}
}
