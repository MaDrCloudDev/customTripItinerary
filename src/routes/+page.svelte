<script lang="ts">
	import type { ViewMode } from '../lib/types/itinerary.js';
	import { itineraryData } from '../lib/data/itineraryData.js';
	import CruiseHeader from '../lib/components/CruiseHeader.svelte';
	import Navigation from '../lib/components/Navigation.svelte';
	import SingleDayView from '../lib/components/SingleDayView.svelte';
	import TimelineView from '../lib/components/TimelineView.svelte';
	import OverviewGrid from '../lib/components/OverviewGrid.svelte';
	import CruiseFooter from '../lib/components/CruiseFooter.svelte';

	let currentDayIndex = $state(0);
	let viewMode = $state<ViewMode>('single');
	let isPrintMode = $state(false);
	$effect(() => {
		if (typeof window !== 'undefined') {
			const urlParams = new URLSearchParams(window.location.search);
			const printMode = urlParams.get('printMode') === 'true';
			const urlViewMode = urlParams.get('viewMode') as ViewMode;
			const urlDayIndex = urlParams.get('dayIndex');
			
			if (printMode) {
				isPrintMode = true;
				if (urlViewMode && ['single', 'timeline', 'overview'].includes(urlViewMode)) {
					viewMode = urlViewMode;
				}
				if (urlDayIndex) {
					const dayIndex = parseInt(urlDayIndex);
					if (dayIndex >= 0 && dayIndex < itineraryData.dailySchedule.length) {
						currentDayIndex = dayIndex;
					}
				}
				return;
			}
			
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

	$effect(() => {
		if (typeof window !== 'undefined') {
			localStorage.setItem('cruise-day-index', currentDayIndex.toString());
			localStorage.setItem('cruise-view-mode', viewMode);
		}
	});

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



	const currentDay = $derived(itineraryData.dailySchedule[currentDayIndex]);
</script>

<svelte:head>
	<title>Viking Egypt Cruise Itinerary - {itineraryData.cruise.passengers}</title>
	{#if isPrintMode}
		<style>
			.print-mode-content {
				height: auto !important;
				max-height: none !important;
				overflow: visible !important;
			}
			
			.print-content-wrapper {
				height: auto !important;
				max-height: none !important;
				overflow: visible !important;
			}
			
			/* Remove any height constraints from child elements in print mode */
			.print-mode-content * {
				height: auto !important;
				max-height: none !important;
				overflow: visible !important;
			}
			
			/* Ensure space-y classes don't interfere */
			.space-y-4 > * + * {
				margin-top: 1rem !important;
			}
			
			/* Make sure all activity cards are visible */
			.space-y-4,
			.space-y-6,
			.space-y-8 {
				display: flex;
				flex-direction: column;
				gap: 1rem;
			}
			
			/* Ensure overview grid is visible in print mode */
			.overview-grid {
				display: grid !important;
				grid-template-columns: repeat(2, 1fr) !important;
				gap: 1rem !important;
				width: 100% !important;
			}
			
			.overview-card {
				display: flex !important;
				flex-direction: column !important;
				break-inside: avoid !important;
			}
		</style>
	{/if}
</svelte:head>

<div class="min-h-screen">
	{#if !isPrintMode}
		<CruiseHeader cruiseInfo={itineraryData.cruise} />
		
		<Navigation 
			{currentDay}
			{currentDayIndex}
			totalDays={itineraryData.dailySchedule.length}
			{viewMode}
			onPrevDay={prevDay}
			onNextDay={nextDay}
			onViewModeChange={handleViewModeChange}
		/>
	{/if}

	<!-- Main Content -->
	<main 
		class="container mx-auto px-6 py-8 {isPrintMode ? 'print-mode-content' : ''}" 
		data-print-content
	>
	<div class={isPrintMode ? 'print-content-wrapper' : ''}>
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
	</div>
</main>

	{#if !isPrintMode}
		<CruiseFooter cruiseInfo={itineraryData.cruise} />
	{/if}
</div>