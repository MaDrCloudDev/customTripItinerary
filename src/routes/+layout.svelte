<script lang="ts">
	import { page } from '$app/state';
	import type { Snippet } from 'svelte';
	import '../app.css';

	import CruiseHeader from '../lib/components/CruiseHeader.svelte';
	import Navigation from '../lib/components/Navigation.svelte';
	import CruiseFooter from '../lib/components/CruiseFooter.svelte';
	import { setAppState } from '../lib/state.svelte.js';

	let { data, children }: { data: App.PageData; children: Snippet } = $props();

	const appState = setAppState(data.itinerary);

	$effect(() => {
		if (data.itinerary) {
			appState.updateItinerary(data.itinerary);
		}
	});

	$effect(() => {
		if (typeof window === 'undefined') return;

		const handleKeyDown = (event: KeyboardEvent) => {
			if (page.route.id !== '/') return;
			
			switch (event.key) {
				case 'ArrowLeft':
					event.preventDefault();
					appState.prevDay();
					break;
				case 'ArrowRight':
					event.preventDefault();
					appState.nextDay();
					break;
			}
		};

		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	});

</script>

<svelte:head>
	{#if data?.itinerary}
		<title>Egypt Cruise Itinerary - {data.itinerary.cruise.passengers}</title>
		<meta name="description" content="Complete itinerary for {data.itinerary.cruise.passengers}'s Egypt cruise from {data.itinerary.cruise.dates.start} to {data.itinerary.cruise.dates.end}" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
	{/if}
</svelte:head>

{#if data?.itinerary}
	<div class="flex flex-col min-h-screen">
		<CruiseHeader cruiseInfo={data.itinerary.cruise} />

		<Navigation
			currentDay={appState.currentDay as import('../app.d.ts').DaySchedule}
			currentDayIndex={appState.currentDayIndex}
			totalDays={appState.totalDays}
			onPrevDay={() => appState.prevDay()}
			onNextDay={() => appState.nextDay()}
		/>

		<main class="container mx-auto px-6 py-8 flex-1">
			{@render children()}
		</main>

		<CruiseFooter cruiseInfo={data.itinerary.cruise} />
	</div>
{/if}


