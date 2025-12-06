<script lang="ts">
	import SingleDayView from '../lib/components/SingleDayView.svelte';
	import { getAppState } from '../lib/state.svelte.js';

	const appState = getAppState();
</script>

{#if appState?.currentDay}
	<SingleDayView currentDay={appState.currentDay} />
{/if}
