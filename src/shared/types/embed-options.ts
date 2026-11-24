import { isBlank } from "@utils/strings.js";
import type {
	ColorResolvable,
	EmbedAuthorData,
	EmbedFooterData,
} from "discord.js";
import { z } from "zod";

const embedAuthorOptionsSchema = z.object({
	name: z.string().max(256),
	iconURL: z.url().optional(),
	nameURL: z.url().optional(),
});

const embedFooterOptionsSchema = z.object({
	text: z.string().max(2048),
	iconURL: z.url().optional(),
});

const embedFieldOptionsSchema = z.object({
	title: z.string().max(256),
	description: z.string().max(1024),
	inline: z.boolean().optional(),
});

const fieldsSchema = z.array(embedFieldOptionsSchema).max(25);

export const embedOptionsSchema = z
	.object({
		title: z.string().max(256).optional(),
		titleURL: z.url().optional(),
		description: z.string().max(4096).optional(),
		color: z.custom<ColorResolvable>().optional(),
		author: embedAuthorOptionsSchema.optional(),
		footer: embedFooterOptionsSchema.optional(),
		fields: fieldsSchema.optional(),
		imageURL: z.url().optional(),
		thumbnailURL: z.url().optional(),
		timestamp: z.date().optional(),
	})
	.superRefine((val, ctx) => {
		if (val.titleURL !== undefined && isBlank(val.title)) {
			ctx.addIssue({
				code: "custom",
				message: "`titleURL` field requires non-empty `title` field",
				path: ["titleURL"],
			});
		}
	});

export type EmbedAuthorOptions = z.infer<typeof embedAuthorOptionsSchema>;
export type EmbedFooterOptions = z.infer<typeof embedFooterOptionsSchema>;
export type EmbedFieldsOptions = z.infer<typeof fieldsSchema>;
export type EmbedOptions = z.infer<typeof embedOptionsSchema>;

export type AuthorInput = Omit<EmbedAuthorData, "proxyIconURL">;
export type FooterInput = Omit<EmbedFooterData, "proxyIconURL">;
