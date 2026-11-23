import { type ColorResolvable, EmbedBuilder } from "discord.js";

export interface EmbedOptions {
	title?: string;
	color?: ColorResolvable;
}

export function createEmbed(options?: EmbedOptions): EmbedBuilder {
	const embed = new EmbedBuilder();

	return embed;
}
