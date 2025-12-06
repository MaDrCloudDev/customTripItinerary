<script lang="ts">
	import TimelineView from '../../lib/components/TimelineView.svelte';
	import { getAppState } from '../../lib/state.svelte.js';

	const appState = getAppState();
</script>

{#if appState?.currentDay}
	<TimelineView currentDay={appState.currentDay} />
{/if}
