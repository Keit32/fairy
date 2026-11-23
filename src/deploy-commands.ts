import { REST, Routes } from "discord.js";
import "dotenv/config";
import { pingCommand } from "@/commands/ping.js";
import { env } from "@/config/env.js";

const token = env.DISCORD_TOKEN;
const clientId = env.CLIENT_ID;
const guildId = env.GUILD_ID;

if (!token || !clientId || !guildId) {
	throw new Error("Missing DISCORD_TOKEN, CLIENT_ID, or GUILD_ID in .env");
}

const commands = [pingCommand.data.toJSON()];
const rest = new REST({ version: "10" }).setToken(token);

await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
	body: commands,
});

console.log(`Registered ${commands.length} guild command(s).`);
