import type { EmbedOptions } from "@shared/types/embed-options.js";
import pkg from "@/../package.json" with { type: "json" };
import type { PingInfo } from "@/features/general/types/ping.js";

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
	title: "FAIRY // COMMAND_EXECUTION_ERROR",
	description: "There was an error while executing this command!",
	color: FAIRY_COLORS.critical,
	timestamp: new Date(),
};

export const pingCommandEmbed = (pingInfo: PingInfo): EmbedOptions => ({
	color: pingInfo.color,
	title: "FAIRY // SYSTEM DIAGNOSTICS",
	description:
		"Diagnostic request processed. Calculating network signal degradation and compute overhead...",
	fields: [
		{
			title: "NETWORK LATENCY",
			description: `\`\`\`yaml\nRoundtrip : ${pingInfo.roundtripLatency}ms\nWS Gateway: ${pingInfo.wsPing}ms\n\`\`\``,
			inline: true,
		},
		{
			title: "SYSTEM OVERHEAD",
			description: `\`\`\`yaml\nHeap Usage: ${pingInfo.memoryUsage} MB\nStatus    : ${pingInfo.systemStatus}\n\`\`\``,
			inline: true,
		},
		{
			title: "CALCULATED EVALUATION",
			description: pingInfo.calculatedEvaluation,
			inline: false,
		},
	],
});
