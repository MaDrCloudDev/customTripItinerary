/**
 * Local storage keys for user preferences
 */
export const STORAGE_KEYS = {
	DAY_INDEX: 'cruise-day-index',
	VIEW_MODE: 'cruise-view-mode',
} as const;

export type StorageKey =
	(typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];

/**
 * View mode configuration
 */
export const VIEW_MODES = {
	SINGLE: 'single',
	TIMELINE: 'timeline',
	OVERVIEW: 'overview',
} as const;

export type ViewModeKey = keyof typeof VIEW_MODES;
export type ViewModeValue = (typeof VIEW_MODES)[ViewModeKey];

/**
 * Activity type configuration
 */
export const ACTIVITY_TYPES = {
	FREE: 'free',
	EXCURSION: 'excursion',
	PREPARATION: 'preparation',
	CULTURAL: 'cultural',
	DEPARTURE: 'departure',
	MEALS: 'meals',
	TRAVEL: 'travel',
	ARRIVAL: 'arrival',
	EMBARKATION: 'embarkation',
} as const;

/**
 * Color scheme mapping for activities
 */
export const ACTIVITY_COLORS = {
	EXCURSION: 'excursion',
	DINING: 'dining',
	CULTURAL: 'cultural',
	NATURE: 'nature',
	FREE: 'free',
	TRAVEL: 'travel',
	MEALS: 'meals',
} as const;

/**
 * Google Maps configuration
 */
export const MAPS_CONFIG = {
	BASE_URL: 'https://www.google.com/maps/search/',
	SEARCH_PARAMS: '?api=1&query=',
	WINDOW_FEATURES: 'noopener,noreferrer',
} as const;

/**
 * Date/time formatting configuration
 */
export const DATE_FORMAT_OPTIONS = {
	LONG_DATE: {
		weekday: 'long' as const,
		month: 'long' as const,
		day: 'numeric' as const,
	},
	LOCALE: 'en-US',
} as const;

/**
 * Animation and transition timing
 */
export const TRANSITIONS = {
	FAST: 150,
	NORMAL: 300,
	SLOW: 500,
} as const;

/**
 * Layout constants
 */
export const LAYOUT = {
	NAV_HEIGHT: 80,
	CONTAINER_PADDING: 24,
	CARD_BORDER_RADIUS: 16,
	MIN_TOUCH_TARGET: 44,
} as const;

/**
 * Breakpoints for responsive design
 */
export const BREAKPOINTS = {
	SM: 640,
	MD: 768,
	LG: 1024,
	XL: 1280,
} as const;
