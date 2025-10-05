export const STORAGE_KEYS = {
	DAY_INDEX: 'cruise-day-index',
	VIEW_MODE: 'cruise-view-mode',
} as const;

export const VIEW_MODES = {
	SINGLE: 'single',
	TIMELINE: 'timeline',
	OVERVIEW: 'overview',
} as const;

export const MAPS_CONFIG = {
	BASE_URL: 'https://www.google.com/maps/search/',
	SEARCH_PARAMS: '?api=1&query=',
	WINDOW_FEATURES: 'noopener,noreferrer',
} as const;

export const DATE_FORMAT_OPTIONS = {
	LONG_DATE: {
		weekday: 'long' as const,
		month: 'long' as const,
		day: 'numeric' as const,
	},
	LOCALE: 'en-US',
} as const;
