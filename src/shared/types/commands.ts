import type {
	ChatInputCommandInteraction,
	Collection,
	SlashCommandBuilder,
	SlashCommandOptionsOnlyBuilder,
	SlashCommandSubcommandsOnlyBuilder,
} from "discord.js";

export type SlashCommandData =
	| SlashCommandBuilder
	| SlashCommandOptionsOnlyBuilder
	| SlashCommandSubcommandsOnlyBuilder;

export type SlashCommand = {
	data: SlashCommandData;
	execute: (interaction: ChatInputCommandInteraction) => Promise<void>;
};

export type CommandsCollection = Collection<string, SlashCommand>;
export type CommandsList = readonly SlashCommand[];
