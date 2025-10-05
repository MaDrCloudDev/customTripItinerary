<script lang="ts">
	import type { ViewMode, ItineraryData } from '../lib/data/index.js';

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

	let { data }: { data: { itinerary: ItineraryData; meta: { totalDays: number } } } = $props();

	let currentDayIndex = $state(0);
	let viewMode = $state<ViewMode>(VIEW_MODES.SINGLE);
	let isInitialized = $state(false);

	$effect(() => {
		if (typeof window === 'undefined') return;

		if (!isInitialized) {
			const savedDayIndex = safeLocalStorage.getItem(STORAGE_KEYS.DAY_INDEX);
			const savedViewMode = safeLocalStorage.getItem(STORAGE_KEYS.VIEW_MODE);

			if (savedDayIndex) {
				const dayIndex = safeParseInt(savedDayIndex, 0);
				currentDayIndex = validateDayIndex(dayIndex, totalDays);
			}
			if (savedViewMode && isValidViewMode(savedViewMode)) {
				viewMode = savedViewMode;
			}
			isInitialized = true;
		}

		safeLocalStorage.setItem(STORAGE_KEYS.DAY_INDEX, currentDayIndex.toString());
		safeLocalStorage.setItem(STORAGE_KEYS.VIEW_MODE, viewMode);
	});

	// Simple keyboard navigation (helpful for parents)
	$effect(() => {
		if (typeof window === 'undefined') return;

		const handleKeyDown = (event: KeyboardEvent) => {
			if (viewMode !== 'single') return;
			
			switch (event.key) {
				case 'ArrowLeft':
					event.preventDefault();
					handlePrevDay();
					break;
				case 'ArrowRight':
					event.preventDefault();
					handleNextDay();
					break;
			}
		};

		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
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

	const totalDays = $derived(data.itinerary.dailySchedule.length);
	const currentDay = $derived(
		data.itinerary.dailySchedule[currentDayIndex]
	);
</script>

<svelte:head>
	<title>Viking Egypt Cruise Itinerary - {data.itinerary.cruise.passengers}</title>
	<meta name="description" content="Complete itinerary for {data.itinerary.cruise.passengers}'s Viking Egypt cruise from {data.itinerary.cruise.dates.start} to {data.itinerary.cruise.dates.end}" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
</svelte:head>

<div class="min-h-screen">
	<CruiseHeader cruiseInfo={data.itinerary.cruise} />

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
				dailySchedule={data.itinerary.dailySchedule}
				onDaySelect={goToDay}
			/>
		{/if}
	</main>

	<CruiseFooter cruiseInfo={data.itinerary.cruise} />
</div>
