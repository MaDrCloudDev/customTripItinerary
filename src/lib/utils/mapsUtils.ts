import { MAPS_CONFIG } from '../constants.js';

/**
 * Creates Google Maps search URL with proper encoding
 */
export const createGoogleMapsUrl = (location: string): string => {
	if (!location || location.trim().length === 0) {
		return MAPS_CONFIG.BASE_URL;
	}

	const encodedLocation = encodeURIComponent(location.trim());
	const url = `${MAPS_CONFIG.BASE_URL}${MAPS_CONFIG.SEARCH_PARAMS}${encodedLocation}`;

	return url;
};

/**
 * Opens Google Maps in new tab with error handling
 */
export const openGoogleMaps = (location: string): void => {
	try {
		if (typeof window === 'undefined') {
			return;
		}

		const url = createGoogleMapsUrl(location);
		const opened = window.open(
			url,
			'_blank',
			MAPS_CONFIG.WINDOW_FEATURES
		);
	} catch (error) {
		console.error('Failed to open Google Maps:', error);
	}
};
