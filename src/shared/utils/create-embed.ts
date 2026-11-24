import {
	FAIRY_COLORS,
	FAIRY_STRINGS,
	FAIRY_URLS,
} from "@shared/config/embeds.js";
import {
	type AuthorInput,
	type EmbedAuthorOptions,
	type EmbedFieldsOptions,
	type EmbedFooterOptions,
	type EmbedOptions,
	embedOptionsSchema,
	type FooterInput,
} from "@shared/types/embed-options.js";
import { type APIEmbedField, EmbedBuilder } from "discord.js";

const buildAuthor = (authorOptions: EmbedAuthorOptions): AuthorInput => {
	const author: AuthorInput = { name: authorOptions.name };
	if (authorOptions.nameURL !== undefined) author.url = authorOptions.nameURL;
	if (authorOptions.iconURL !== undefined)
		author.iconURL = authorOptions.iconURL;

	return author;
};

const buildFooter = (footerOptions: EmbedFooterOptions): FooterInput => {
	const footer: FooterInput = { text: footerOptions.text };
	if (footerOptions.iconURL !== undefined)
		footer.iconURL = footerOptions.iconURL;

	return footer;
};

const buildFields = (fieldsOptions: EmbedFieldsOptions) => {
	return fieldsOptions.map((field): APIEmbedField => {
		const apiField: APIEmbedField = {
			name: field.title,
			value: field.description,
		};

		if (field.inline !== undefined) apiField.inline = field.inline;

		return apiField;
	});
};

export function createEmbed(options?: EmbedOptions): EmbedBuilder {
	const parsed = embedOptionsSchema.parse(options ?? {});

	const embed = new EmbedBuilder();

	if (parsed.color !== undefined) embed.setColor(parsed.color);
	else embed.setColor(FAIRY_COLORS.primary);

	if (parsed.title !== undefined) embed.setTitle(parsed.title);
	if (parsed.description !== undefined)
		embed.setDescription(parsed.description);
	if (parsed.titleURL !== undefined) embed.setURL(parsed.titleURL);
	if (parsed.imageURL !== undefined) embed.setImage(parsed.imageURL);
	if (parsed.thumbnailURL !== undefined)
		embed.setThumbnail(parsed.thumbnailURL);
	if (parsed.timestamp !== undefined) embed.setTimestamp(parsed.timestamp);

	if (parsed.author !== undefined) {
		embed.setAuthor(buildAuthor(parsed.author));
	}

	if (parsed.footer !== undefined) {
		embed.setFooter(buildFooter(parsed.footer));
	} else
		embed.setFooter({
			text: FAIRY_STRINGS.footerText,
			iconURL: FAIRY_URLS.footerIconUrl,
		});

	if (parsed.fields !== undefined) {
		embed.addFields(buildFields(parsed.fields));
	}

	if (embed.length === 0) throw new Error("Embed cannot be empty");
	if (embed.length > 6000)
		throw new Error(
			"The sum of all characters from all embed structures in a message must not exceed 6000 characters",
		);

	return embed;
}
