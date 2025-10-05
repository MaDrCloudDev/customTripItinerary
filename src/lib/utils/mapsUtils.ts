import { MAPS_CONFIG } from '../constants.js';
import { devLog } from './errorHandling.js';

/**
 * Creates Google Maps search URL with proper encoding
 */
export const createGoogleMapsUrl = (location: string): string => {
	if (!location || location.trim().length === 0) {
		devLog('Warning: Empty location provided to createGoogleMapsUrl');
		return MAPS_CONFIG.BASE_URL;
	}

	const encodedLocation = encodeURIComponent(location.trim());
	const url = `${MAPS_CONFIG.BASE_URL}${MAPS_CONFIG.SEARCH_PARAMS}${encodedLocation}`;

	devLog('Generated Google Maps URL', { location, url });
	return url;
};

/**
 * Opens Google Maps in new tab with error handling
 */
export const openGoogleMaps = (location: string): void => {
	try {
		if (typeof window === 'undefined') {
			devLog('Warning: openGoogleMaps called in SSR context');
			return;
		}

		const url = createGoogleMapsUrl(location);
		const opened = window.open(
			url,
			'_blank',
			MAPS_CONFIG.WINDOW_FEATURES
		);

		if (!opened) {
			devLog('Warning: Failed to open Google Maps - popup blocked?', {
				location,
			});
		} else {
			devLog('Opened Google Maps', { location });
		}
	} catch (error) {
		console.error('Failed to open Google Maps:', error);
		devLog('Error opening Google Maps', { location, error });
	}
};
