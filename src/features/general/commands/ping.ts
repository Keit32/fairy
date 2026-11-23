import type { SlashCommand } from "@shared/types/commands.js";
import {
	type ChatInputCommandInteraction,
	SlashCommandBuilder,
} from "discord.js";

export const pingCommand: SlashCommand = {
	data: new SlashCommandBuilder()
		.setName("ping")
		.setDescription("Replies with Pong!"),
	async execute(interaction: ChatInputCommandInteraction) {
		await interaction.reply("Pong!");
	},
};
