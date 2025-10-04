import itineraryData from './itinerary.json';

export interface TimeSlot {
	time: string;
	activity: string;
	description: string;
	location?: string;
	duration?: string;
	type: 'free' | 'excursion' | 'preparation' | 'cultural' | 'departure';
	color?: 'excursion' | 'dining' | 'cultural' | 'nature' | 'free';
	icon: string;
	cost?: string;
}

export interface DaySchedule {
	dayNumber: number;
	date: string;
	dayName: string;
	location: string;
	timeSlots: {
		morning: TimeSlot;
		afternoon: TimeSlot;
		evening: TimeSlot;
	};
}

export interface CruiseInfo {
	title: string;
	subtitle: string;
	bookingNumber: string;
	passengers: string;
	stateroom: string;
	dates: {
		start: string;
		end: string;
		totalDays: number;
	};
}

export interface ItineraryData {
	cruise: CruiseInfo;
	dailySchedule: DaySchedule[];
}

export { itineraryData };