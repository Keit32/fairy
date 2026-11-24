import { Client, Events, GatewayIntentBits } from "discord.js";
import "dotenv/config";
import { env } from "@config/env.js";
import { handleInteraction } from "@handlers/handle-interaction.js";
import { collectCommands } from "@utils/collect-commands.js";
import pino from "pino";

const token = env.DISCORD_TOKEN;

if (!token) {
	throw new Error("Missing DISCORD_TOKEN in .env");
}

export const logger = pino();

const client = new Client({
	intents: [GatewayIntentBits.Guilds],
});

async function main() {
	const commands = collectCommands();

	client.once(Events.ClientReady, (readyClient) => {
		console.log(`Logged in as ${readyClient.user.tag}`);
	});

	client.on(Events.InteractionCreate, (interaction) => {
		handleInteraction(interaction, commands, logger);
	});

	await client.login(token);
}

main();
