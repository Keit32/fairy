export const isBlank = (value?: string): boolean =>
	value === undefined || value.trim().length === 0;
