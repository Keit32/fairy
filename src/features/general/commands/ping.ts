import { pingCommandEmbed } from "@config/embeds.js";
import type { PingInfo } from "@features/general/types/ping.js";
import {
	getCalculatedEvaluation,
	getSystemMetrics,
} from "@features/general/utils/ping.js";
import type { SlashCommand } from "@shared/types/commands.js";
import { createEmbed } from "@utils/create-embed.js";
import { getUserPosition } from "@utils/users.js";
import { type GuildMember, SlashCommandBuilder } from "discord.js";

export const pingCommand: SlashCommand = {
	data: new SlashCommandBuilder()
		.setName("ping")
		.setDescription("Executes diagnostic latency and system performance scan."),

	async execute(interaction) {
		await interaction.deferReply();
		const sent = await interaction.fetchReply();

		const roundtripLatency =
			sent.createdTimestamp - interaction.createdTimestamp;
		const wsPing = interaction.client.ws.ping;
		const memoryUsage = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(
			2,
		);

		const member = interaction.member as GuildMember | null;
		const isChief = member ? getUserPosition(member) === "Chief" : false;
		const calculatedEvaluation = getCalculatedEvaluation(
			roundtripLatency,
			isChief,
		);

		const { systemStatus, color } = getSystemMetrics(roundtripLatency);
		const pingInfo: PingInfo = {
			color,
			systemStatus,
			roundtripLatency,
			wsPing,
			memoryUsage,
			calculatedEvaluation,
		};

		const performanceEmbed = createEmbed(pingCommandEmbed(pingInfo));

		await interaction.editReply({ embeds: [performanceEmbed] });
	},
};

export default pingCommand;
