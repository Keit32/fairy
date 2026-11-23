import { REST, Routes } from "discord.js";
import "dotenv/config";
import { env } from "@config/env.js";
import { collectCommandsJson } from "./collect-commands.js";

const token = env.DISCORD_TOKEN;
const clientId = env.CLIENT_ID;
const guildId = env.GUILD_ID;

if (!token || !clientId || !guildId) {
	throw new Error("Missing DISCORD_TOKEN, CLIENT_ID, or GUILD_ID in .env");
}

const commands = collectCommandsJson();
const rest = new REST({ version: "10" }).setToken(token);

await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
	body: commands,
});

console.log(`Registered ${commands.length} guild command(s).`);
