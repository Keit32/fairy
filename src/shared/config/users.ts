export type USER_POSITION = "Chief" | "Administrator" | "Moderator" | "User";

interface VoidHunterUser {
	id: string;
	name: string;
	position: USER_POSITION;
}

export const FAIRY_MASTER: VoidHunterUser = {
	id: "207005633260683264",
	name: "Keit",
	position: "Chief",
};

export const VOIDHUNTERS_ROLES = {
	administrator: "1496580354390097992",
	moderator: "1488241292059349052",
	void_hunters_eu: "1488242456020516906",
	void_hunters_as: "1574422542477697155",
	void_hunters_am: "1574422686183071744",
};
