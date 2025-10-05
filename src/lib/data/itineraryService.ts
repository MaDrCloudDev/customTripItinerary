import type { ItineraryData } from '../../app.d.ts';
import { itineraryData } from './itineraryData.js';

function validateItineraryData(data: any): void {
	if (!data) {
		throw new Error('Itinerary data is null or undefined');
	}

	if (!data.cruise) {
		throw new Error('Missing cruise information');
	}

	if (!data.dailySchedule || !Array.isArray(data.dailySchedule)) {
		throw new Error('Missing or invalid daily schedule');
	}

	if (data.dailySchedule.length === 0) {
		throw new Error('Daily schedule is empty');
	}

	const requiredCruiseFields = [
		'title',
		'bookingNumber',
		'passengers',
		'dates',
	];
	for (const field of requiredCruiseFields) {
		if (!data.cruise[field]) {
			throw new Error(`Missing required cruise field: ${field}`);
		}
	}

	data.dailySchedule.forEach((day: any, index: number) => {
		if (!day.date || !day.location || !day.timeSlots) {
			throw new Error(`Invalid day structure at index ${index}`);
		}

		if (!Array.isArray(day.timeSlots)) {
			throw new Error(`Invalid time slots for day ${index}`);
		}
	});
}

export async function loadItinerary(): Promise<ItineraryData> {
	const data = itineraryData;
	validateItineraryData(data);
	return data;
}

export function getTotalDays(data: ItineraryData): number {
	return data.dailySchedule.length;
}
