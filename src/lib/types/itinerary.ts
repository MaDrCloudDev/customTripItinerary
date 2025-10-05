// TimeSlot represents a single activity/event in the cruise schedule
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

// Represents one full day of the cruise
export interface DaySchedule {
	dayNumber: number;
	date: string;
	dayName: string;
	location: string;
	timeSlots: TimeSlot[];
}

// Static cruise information displayed in header/footer
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

// Top-level data structure - the complete itinerary
export interface ItineraryData {
	cruise: CruiseInfo;
	dailySchedule: DaySchedule[];
}

// The three view modes that determine UI layout
export type ViewMode = 'single' | 'overview' | 'timeline';
