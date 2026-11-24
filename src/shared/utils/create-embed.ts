import { type ColorResolvable, EmbedBuilder } from "discord.js";

export interface EmbedOptions {
	title?: string;
	color?: ColorResolvable;
}

export function createEmbed(_options?: EmbedOptions): EmbedBuilder {
	const embed = new EmbedBuilder();

	if (embed.length === 0) throw new Error("Embed cannot be empty");

	return embed;
}
