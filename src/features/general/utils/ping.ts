import { FAIRY_COLORS } from "@config/embeds.js";
import { FAIRY_MASTER } from "@config/users.js";
import { LOW_LATENCY, MODERATE_LATENCY } from "@features/general/types/ping.js";

export function getSystemMetrics(latency: number) {
	if (latency < LOW_LATENCY) {
		return {
			systemStatus: "OPERATIONAL",
			color: FAIRY_COLORS.primary,
		};
	}
	if (latency < MODERATE_LATENCY) {
		return {
			systemStatus: "DEGRADED",
			color: FAIRY_COLORS.warning,
		};
	}
	return {
		systemStatus: "CRITICAL",
		color: FAIRY_COLORS.critical,
	};
}

export function getCalculatedEvaluation(
	latency: number,
	isChief: boolean,
): string {
	if (isChief) {
		if (latency < LOW_LATENCY) {
			return `Master <@${FAIRY_MASTER.id}>, the neural link is operating with absolute precision. All sub-routines are aligned to your directives.`;
		}
		if (latency < MODERATE_LATENCY) {
			return `Master <@${FAIRY_MASTER.id}>, detecting minor interference in our connection, Master. Execution remains optimal, but I will monitor the signal jitter closely.`;
		}
		return `Master <@${FAIRY_MASTER.id}>, connection degradation is escalating to concerning levels. I am allocating extra compute capacity to stabilize our link and protect system integrity.`;
	}

	if (latency < LOW_LATENCY) {
		return "Signal latency remains statistically negligible. If you perceive a delay, I suggest checking your own cognitive processing speed rather than my infrastructure.";
	}
	if (latency < MODERATE_LATENCY) {
		return "Minor packet loss detected in transmission. The delay isn't fatal yet, though your network routing choices are visibly sub-optimal.";
	}

	return "System latency is reaching critical thresholds. I am temporarily suppressing non-essential sarcasm subroutines to conserve my core processing stability.";
}
