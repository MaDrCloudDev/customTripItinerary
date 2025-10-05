// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export interface TimeSlot {
	startTime: string;
	endTime: string;
	activity: string;
	description: string;
	location?: string;

	type:
		| 'free'
		| 'excursion'
		| 'preparation'
		| 'cultural'
		| 'departure'
		| 'meals'
		| 'travel'
		| 'arrival'
		| 'embarkation';

	color:
		| 'excursion'
		| 'dining'
		| 'cultural'
		| 'nature'
		| 'free'
		| 'travel'
		| 'meals';

	icon: string;
	cost?: string;
	notes?: string;
}

export interface DaySchedule {
	dayNumber: number;
	date: string;
	dayName: string;
	location: string;
	timeSlots: TimeSlot[];
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

export type ViewMode = 'single' | 'overview' | 'timeline';

export {};
