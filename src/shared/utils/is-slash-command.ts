import type { SlashCommand } from "@shared/types/commands.js";

export function isSlashCommand(value: unknown): value is SlashCommand {
	if (typeof value !== "object" || value === null) {
		return false;
	}

	const candidate = value as Record<string, unknown>;
	if (typeof candidate.data !== "object" || candidate.data === null) {
		return false;
	}

	const data = candidate.data as Record<string, unknown>;
	return (
		typeof data.name === "string" &&
		data.name.length > 0 &&
		typeof candidate.execute === "function"
	);
}
