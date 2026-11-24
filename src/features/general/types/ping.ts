import type { ColorResolvable } from "discord.js";

export const LOW_LATENCY = 900;
export const MODERATE_LATENCY = 1200;

export interface PingInfo {
	color: ColorResolvable;
	systemStatus: string;
	roundtripLatency: number;
	wsPing: number;
	memoryUsage: string;
	calculatedEvaluation: string;
}
