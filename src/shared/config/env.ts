import "dotenv/config";
import process from "node:process";
import { z } from "zod";

const envSchema = z.object({
	ENVIRONMENT: z.enum(["development", "production"]).default("development"),
	DISCORD_TOKEN: z.string().min(1),
	CLIENT_ID: z.string().min(1),
	GUILD_ID: z.string().min(1),
});

export const env = envSchema.parse(process.env);
