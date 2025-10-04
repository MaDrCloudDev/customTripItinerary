<script lang="ts">
	import type { ViewMode } from '../lib/types/itinerary.js';
	import { itineraryData } from '../lib/data/itineraryData.js';
	import CruiseHeader from '../lib/components/CruiseHeader.svelte';
	import Navigation from '../lib/components/Navigation.svelte';
	import SingleDayView from '../lib/components/SingleDayView.svelte';
	import TimelineView from '../lib/components/TimelineView.svelte';
	import OverviewGrid from '../lib/components/OverviewGrid.svelte';
	import CruiseFooter from '../lib/components/CruiseFooter.svelte';

	// State persistence
	let currentDayIndex = $state(0);
	let viewMode = $state<ViewMode>('single');

	// Load saved state on mount
	$effect(() => {
		if (typeof window !== 'undefined') {
			const savedDayIndex = localStorage.getItem('cruise-day-index');
			const savedViewMode = localStorage.getItem('cruise-view-mode');
			
			if (savedDayIndex) {
				const dayIndex = parseInt(savedDayIndex);
				if (dayIndex >= 0 && dayIndex < itineraryData.dailySchedule.length) {
					currentDayIndex = dayIndex;
				}
			}
			
			if (savedViewMode && ['single', 'timeline', 'overview'].includes(savedViewMode)) {
				viewMode = savedViewMode as ViewMode;
			}
		}
	});

	// Save state when it changes
	$effect(() => {
		if (typeof window !== 'undefined') {
			localStorage.setItem('cruise-day-index', currentDayIndex.toString());
			localStorage.setItem('cruise-view-mode', viewMode);
		}
	});

	// Navigation functions
	const nextDay = () => {
		if (currentDayIndex < itineraryData.dailySchedule.length - 1) {
			currentDayIndex += 1;
		}
	};

	const prevDay = () => {
		if (currentDayIndex > 0) {
			currentDayIndex -= 1;
		}
	};

	const goToDay = (dayIndex: number) => {
		currentDayIndex = dayIndex;
		viewMode = 'single';
	};

	const handleViewModeChange = (mode: ViewMode) => {
		viewMode = mode;
	};

	// Print function
	const printCurrentDay = () => {
		window.print();
	};

	const currentDay = $derived(itineraryData.dailySchedule[currentDayIndex]);
</script>

<svelte:head>
	<title>Viking Egypt Cruise Itinerary - {itineraryData.cruise.passengers}</title>
</svelte:head>

<div class="min-h-screen">
	<CruiseHeader cruiseInfo={itineraryData.cruise} />
	
	<Navigation 
		{currentDay}
		{currentDayIndex}
		totalDays={itineraryData.dailySchedule.length}
		{viewMode}
		onPrevDay={prevDay}
		onNextDay={nextDay}
		onViewModeChange={handleViewModeChange}
		onPrint={printCurrentDay}
	/>

	<!-- Main Content -->
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