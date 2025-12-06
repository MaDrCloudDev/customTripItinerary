<script lang="ts">
	import { goto } from '$app/navigation';
	import OverviewGrid from '../../lib/components/OverviewGrid.svelte';
	import { getAppState } from '../../lib/state.svelte.js';

	let { data }: { data: App.PageData } = $props();
	const appState = getAppState();

	const goToDay = (dayIndex: number): void => {
		if (appState) {
			appState.goToDay(dayIndex);
			goto('/');
		}
	};
</script>

{#if data?.itinerary?.dailySchedule}
	<OverviewGrid dailySchedule={data.itinerary.dailySchedule} onDaySelect={goToDay} />
{/if}
