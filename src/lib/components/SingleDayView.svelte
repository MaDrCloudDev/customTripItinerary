<script lang="ts">
	import type { DaySchedule } from '../../app.d.ts';
	import { formatDate } from '../utils/dateUtils.js';
	import { openGoogleMaps } from '../utils/mapsUtils.js';
	import ActivityCard from './ActivityCard.svelte';
	import LegendItem from './LegendItem.svelte';

	interface Props {
		currentDay: DaySchedule;
	}

	let { currentDay }: Props = $props();

	const formattedDate = $derived(formatDate(currentDay.date));
</script>

<div
	class="bg-white/80 backdrop-blur-sm border border-blue-400/50 rounded-2xl md:rounded-3xl p-4 md:p-8 mb-6 md:mb-8 shadow-xl shadow-blue-400/40"
>
	<div class="text-center mb-6 md:mb-8 pb-4 md:pb-6 border-b border-blue-400/50">
		<div class="mb-3 md:mb-4">
			<h2
				class="text-2xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent mb-1 md:mb-2"
			>
				📋 Day {currentDay.dayNumber}
			</h2>
			<p class="text-base md:text-xl text-gray-700 font-medium">
				{formattedDate}
			</p>
		</div>

		<button
			onclick={() => openGoogleMaps(currentDay.location)}
			class="inline-flex items-center gap-2 md:gap-3 bg-blue-100 hover:bg-blue-200 rounded-full px-4 md:px-8 py-2 md:py-4 border-2 border-blue-400 hover:border-blue-600 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl transform hover:scale-105"
		>
			<span class="text-xl md:text-2xl">📍</span>
			<span class="text-base md:text-xl font-bold text-blue-900"
				>{currentDay.location}</span
			>
			<span
				class="text-xs md:text-sm font-bold text-blue-700 bg-blue-200 px-2 py-1 rounded-full flex items-center gap-1"
				>View Map <span class="text-xs">↗</span></span
			>
		</button>

		<div class="mt-4 md:mt-6 flex flex-wrap justify-center gap-2 md:gap-3 text-xs">
			<LegendItem color="excursion" label="Excursions" />
			<LegendItem color="cultural" label="Cultural" />
			<LegendItem color="travel" label="Travel" />
			<LegendItem color="meals" label="Meals" />
			<LegendItem color="free" label="Free Time" />
		</div>
	</div>

	<div class="space-y-3 md:space-y-4">
		{#each currentDay.timeSlots as slot, index}
			<ActivityCard
				{slot}
				showConnector={index < currentDay.timeSlots.length - 1}
			/>
		{/each}
	</div>
</div>
