import { commandExecutionErrorEmbed } from "@config/embeds.js";
import type { CommandsCollection } from "@shared/types/commands.js";
import { createEmbed } from "@utils/create-embed.js";
import {
	type Interaction,
	type InteractionReplyOptions,
	MessageFlags,
} from "discord.js";
import type { Logger } from "pino";

export async function handleInteraction(
	interaction: Interaction,
	commands: CommandsCollection,
	logger: Logger,
): Promise<void> {
	if (!interaction.isChatInputCommand()) return;

	const command = commands.get(interaction.commandName);

	if (!command) {
		logger.error(
			{
				commandName: interaction.commandName,
				userId: interaction.user.id,
				guildId: interaction.guildId,
			},
			"No matching command was found.",
		);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		logger.error(
			{
				err: error,
				commandName: interaction.commandName,
				userId: interaction.user.id,
				guildId: interaction.guildId,
			},
			"Failed to execute command.",
		);

		const errorResponse: InteractionReplyOptions = {
			embeds: [createEmbed(commandExecutionErrorEmbed)],
			flags: MessageFlags.Ephemeral,
		};

		if (interaction.replied || interaction.deferred) {
			await interaction.followUp(errorResponse);
		} else {
			await interaction.reply(errorResponse);
		}
	}
}
