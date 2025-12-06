import { getContext, setContext } from 'svelte';
import type { ItineraryData } from '../app.d.ts';
import { STORAGE_KEYS } from './constants.js';
import {
	safeLocalStorage,
	validateDayIndex,
} from './utils/errorHandling.js';

const APP_STATE_KEY = Symbol('APP_STATE');

export class AppState {
	currentDayIndex = $state(0);
	itinerary = $state<ItineraryData | null>(null);

	constructor(itinerary: ItineraryData | null) {
		this.itinerary = itinerary;
		this.loadState();
	}

	loadState() {
		if (typeof window === 'undefined' || !this.itinerary) return;

		const savedDayIndex = safeLocalStorage.getItem(
			STORAGE_KEYS.DAY_INDEX
		);
		if (savedDayIndex) {
			this.currentDayIndex = validateDayIndex(
				parseInt(savedDayIndex, 10),
				this.totalDays
			);
		}
	}

	saveState() {
		if (typeof window === 'undefined') return;
		safeLocalStorage.setItem(
			STORAGE_KEYS.DAY_INDEX,
			this.currentDayIndex.toString()
		);
	}

	get totalDays() {
		return this.itinerary?.dailySchedule.length ?? 0;
	}

	get currentDay(): import('../app.d.ts').DaySchedule | undefined {
		return this.itinerary?.dailySchedule[this.currentDayIndex];
	}

	nextDay() {
		if (this.currentDayIndex < this.totalDays - 1) {
			this.currentDayIndex += 1;
			this.saveState();
		}
	}

	prevDay() {
		if (this.currentDayIndex > 0) {
			this.currentDayIndex -= 1;
			this.saveState();
		}
	}

	goToDay(index: number) {
		if (index >= 0 && index < this.totalDays) {
			this.currentDayIndex = index;
			this.saveState();
		}
	}

	updateItinerary(data: ItineraryData) {
		this.itinerary = data;
	}
}

export function setAppState(itinerary: ItineraryData | null) {
	return setContext(APP_STATE_KEY, new AppState(itinerary));
}

export function getAppState() {
	return getContext<AppState>(APP_STATE_KEY);
}
