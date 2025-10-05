export class AppError extends Error {
	constructor(
		message: string,
		public code: string,
		public context?: Record<string, unknown>
	) {
		super(message);
		this.name = 'AppError';
	}
}

export class DataValidationError extends AppError {
	constructor(message: string, context?: Record<string, unknown>) {
		super(message, 'DATA_VALIDATION_ERROR', context);
		this.name = 'DataValidationError';
	}
}

export class NavigationError extends AppError {
	constructor(message: string, context?: Record<string, unknown>) {
		super(message, 'NAVIGATION_ERROR', context);
		this.name = 'NavigationError';
	}
}

// Prevents crashes when localStorage is unavailable
export const safeLocalStorage = {
	getItem: (key: string): string | null => {
		try {
			if (typeof window === 'undefined') return null;
			return localStorage.getItem(key);
		} catch (error) {
			console.warn(`Failed to read from localStorage: ${key}`, error);
			return null;
		}
	},

	setItem: (key: string, value: string): boolean => {
		try {
			if (typeof window === 'undefined') return false;
			localStorage.setItem(key, value);
			return true;
		} catch (error) {
			console.warn(`Failed to write to localStorage: ${key}`, error);
			return false;
		}
	},

	removeItem: (key: string): boolean => {
		try {
			if (typeof window === 'undefined') return false;
			localStorage.removeItem(key);
			return true;
		} catch (error) {
			console.warn(
				`Failed to remove from localStorage: ${key}`,
				error
			);
			return false;
		}
	},
};

// Prevents NaN errors when parsing values
export const safeParseInt = (
	value: string | null | undefined,
	fallback: number = 0
): number => {
	if (!value) return fallback;
	const parsed = parseInt(value, 10);
	return isNaN(parsed) ? fallback : parsed;
};

// Ensures day navigation stays within valid range
export const validateDayIndex = (
	index: number,
	maxDays: number
): number => {
	if (index < 0) return 0;
	if (index >= maxDays) return maxDays - 1;
	return index;
};

import type { ViewMode } from '../types/itinerary.js';

// Ensures string is a valid ViewMode type
export const isValidViewMode = (value: string): value is ViewMode => {
	return (['single', 'timeline', 'overview'] as const).includes(
		value as ViewMode
	);
};

// Logs messages only in development mode (deprecated - use console.log directly if needed)
export const devLog = (message: string, data?: unknown): void => {
	// No-op - dev logging disabled
};
