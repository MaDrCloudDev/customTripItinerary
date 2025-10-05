import { MAPS_CONFIG } from '../constants.js';

const EGYPTIAN_LOCATIONS = [
	'Esna',
	'Esna Village',
	'Edfu',
	'Abu Simbel',
	'Aswan',
	'Luxor',
	'Luxor East Bank',
	'Luxor/Qena',
	'Valley of the Kings',
	'West Bank, Luxor',
	'Dendera Temple Complex',
	'Giza Plateau',
	'Near Giza Pyramids',
	'Cairo Bazaar District',
	'Old Cairo',
];

export const createGoogleMapsUrl = (location: string): string => {
	if (!location || location.trim().length === 0) {
		return MAPS_CONFIG.BASE_URL;
	}

	let searchLocation = location.trim();

	const needsEgypt = EGYPTIAN_LOCATIONS.some(
		(egyptianLoc) =>
			searchLocation === egyptianLoc ||
			searchLocation.includes(egyptianLoc)
	);

	if (needsEgypt && !searchLocation.toLowerCase().includes('egypt')) {
		searchLocation = `${searchLocation}, Egypt`;
	}

	const encodedLocation = encodeURIComponent(searchLocation);
	const url = `${MAPS_CONFIG.BASE_URL}${MAPS_CONFIG.SEARCH_PARAMS}${encodedLocation}`;

	return url;
};

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
