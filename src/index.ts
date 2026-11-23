import { Client, Events, GatewayIntentBits } from "discord.js";
import "dotenv/config";
import { pingCommand } from "@/commands/ping.js";
import { env } from "@/config/env.js";

const token = env.DISCORD_TOKEN;

if (!token) {
	throw new Error("Missing DISCORD_TOKEN in .env");
}

const client = new Client({
	intents: [GatewayIntentBits.Guilds],
});

client.once(Events.ClientReady, (readyClient) => {
	console.log(`Logged in as ${readyClient.user.tag}`);
});

client.on(Events.InteractionCreate, async (interaction) => {
	if (!interaction.isChatInputCommand()) {
		return;
	}

	if (interaction.commandName === pingCommand.data.name) {
		await pingCommand.execute(interaction);
	}
});

await client.login(token);
