import type { EmbedOptions } from "@shared/types/embed-options.js";
import pkg from "@/../package.json" with { type: "json" };

export const FAIRY_COLORS = {
	primary: "#00A2FF" as const,
	warning: "#FFB000" as const,
	critical: "#FF2E55" as const,
};

export const FAIRY_STRINGS = {
	footerText: `Fairy v${pkg.version}`,
};

export const FAIRY_URLS = {
	footerIconUrl:
		"https://raw.githubusercontent.com/Keit32/fairy/main/src/assets/NPC_Fairy.webp",
};

export const commandExecutionErrorEmbed: EmbedOptions = {
	color: FAIRY_COLORS.critical,
};
