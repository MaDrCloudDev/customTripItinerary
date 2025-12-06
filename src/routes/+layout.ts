import { error } from '@sveltejs/kit';
import {
	loadItinerary,
	getTotalDays,
} from '../lib/data/itineraryService.js';

export const csr = true;
export const prerender = true;

export const load = async () => {
	try {
		const itinerary = await loadItinerary();

		return {
			itinerary,
			meta: {
				totalDays: getTotalDays(itinerary),
			},
		};
	} catch (err) {
		console.error('Error loading itinerary data:', err);
		const message =
			err instanceof Error ? err.message : 'Unknown error occurred';
		throw error(500, `Failed to load cruise itinerary: ${message}`);
	}
};
