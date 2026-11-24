import {
	FAIRY_MASTER,
	type USER_POSITION,
	VOIDHUNTERS_ROLES,
} from "@config/users.js";
import type { GuildMember } from "discord.js";

export function getUserPosition(member: GuildMember): USER_POSITION {
	if (member.id === FAIRY_MASTER.id) return "Chief";
	if (VOIDHUNTERS_ROLES.administrator in member.roles) return "Administrator";
	if (VOIDHUNTERS_ROLES.moderator in member.roles) return "Moderator";

	return "User";
}
