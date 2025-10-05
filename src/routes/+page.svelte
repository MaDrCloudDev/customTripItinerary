<script lang="ts">
	import type { ViewMode } from '../lib/data/index.js';
	import { itineraryData } from '../lib/data/index.js';

	import { STORAGE_KEYS, VIEW_MODES } from '../lib/constants.js';
	import {
		safeLocalStorage,
		safeParseInt,
		validateDayIndex,
		isValidViewMode,
	} from '../lib/utils/errorHandling.js';

	import CruiseHeader from '../lib/components/CruiseHeader.svelte';
	import Navigation from '../lib/components/Navigation.svelte';
	import SingleDayView from '../lib/components/SingleDayView.svelte';
	import TimelineView from '../lib/components/TimelineView.svelte';
	import OverviewGrid from '../lib/components/OverviewGrid.svelte';
	import CruiseFooter from '../lib/components/CruiseFooter.svelte';

	let currentDayIndex = $state(0);
	let viewMode = $state<ViewMode>(VIEW_MODES.SINGLE);
	let isInitialized = $state(false);

	// Simplified effect without .pre to avoid potential issues
	$effect(() => {
		if (typeof window === 'undefined') return;

		if (!isInitialized) {
			const savedDayIndex = safeLocalStorage.getItem(
				STORAGE_KEYS.DAY_INDEX
			);
			const savedViewMode = safeLocalStorage.getItem(
				STORAGE_KEYS.VIEW_MODE
			);

			if (savedDayIndex) {
				const dayIndex = safeParseInt(savedDayIndex, 0);
				currentDayIndex = validateDayIndex(dayIndex, totalDays);
			}
			if (savedViewMode && isValidViewMode(savedViewMode)) {
				viewMode = savedViewMode;
			}
			isInitialized = true;
		}

		safeLocalStorage.setItem(
			STORAGE_KEYS.DAY_INDEX,
			currentDayIndex.toString()
		);
		safeLocalStorage.setItem(STORAGE_KEYS.VIEW_MODE, viewMode);
	});

	const goToDay = (dayIndex: number): void => {
		currentDayIndex = validateDayIndex(dayIndex, totalDays);
		viewMode = VIEW_MODES.SINGLE;
	};

	const handleNextDay = (): void => {
		const maxIndex = totalDays - 1;
		if (currentDayIndex < maxIndex) {
			currentDayIndex += 1;
		}
	};

	const handlePrevDay = (): void => {
		if (currentDayIndex > 0) {
			currentDayIndex -= 1;
		}
	};

	const handleViewChange = (mode: ViewMode): void => {
		viewMode = mode;
	};

	const totalDays = $derived(itineraryData.dailySchedule.length);
	const currentDay = $derived(
		itineraryData.dailySchedule[currentDayIndex]
	);
</script>

<svelte:head>
	<title
		>Viking Egypt Cruise Itinerary - {itineraryData.cruise
			.passengers}</title
	>
</svelte:head>

<div class="min-h-screen">
	<CruiseHeader cruiseInfo={itineraryData.cruise} />

	<Navigation
		{currentDay}
		{currentDayIndex}
		{totalDays}
		{viewMode}
		onPrevDay={handlePrevDay}
		onNextDay={handleNextDay}
		onViewChange={handleViewChange}
	/>

	<main class="container mx-auto px-6 py-8">
		{#if viewMode === 'single' && currentDay}
			<SingleDayView {currentDay} />
		{:else if viewMode === 'timeline' && currentDay}
			<TimelineView {currentDay} />
		{:else if viewMode === 'overview'}
			<OverviewGrid
				dailySchedule={itineraryData.dailySchedule}
				onDaySelect={goToDay}
			/>
		{/if}
	</main>

	<CruiseFooter cruiseInfo={itineraryData.cruise} />
</div>
