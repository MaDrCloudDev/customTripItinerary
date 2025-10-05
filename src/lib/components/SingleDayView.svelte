<script lang="ts">
	import type { DaySchedule } from '../types/itinerary.js';
	import { formatDate } from '../utils/dateUtils.js';
	import { openGoogleMaps } from '../utils/mapsUtils.js';
	import ActivityCard from './ActivityCard.svelte';

	interface Props {
		currentDay: DaySchedule;
	}

	let { currentDay }: Props = $props();

	const formattedDate = $derived(formatDate(currentDay.date));
</script>

<div
	class="bg-white/80 backdrop-blur-sm border border-blue-400/50 rounded-3xl p-8 mb-8 shadow-xl shadow-blue-400/40"
>
	<div class="text-center mb-8 pb-6 border-b border-blue-400/50">
		<div class="mb-4">
			<h2
				class="text-4xl font-bold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent mb-2"
			>
				📋 Day {currentDay.dayNumber}
			</h2>
			<p class="text-xl text-gray-700 font-medium">
				{formattedDate}
			</p>
		</div>

		<button
			onclick={() => openGoogleMaps(currentDay.location)}
			class="inline-flex items-center gap-3 bg-blue-100 hover:bg-blue-200 rounded-full px-8 py-4 border-2 border-blue-400 hover:border-blue-600 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl transform hover:scale-105"
		>
			<span class="text-2xl">📍</span>
			<span class="text-xl font-bold text-blue-900"
				>{currentDay.location}</span
			>
			<span
				class="text-sm font-bold text-blue-700 bg-blue-200 px-2 py-1 rounded-full flex items-center gap-1"
				>View Map <span class="text-xs">↗</span></span
			>
		</button>

		<div class="mt-6 flex flex-wrap justify-center gap-3 text-xs">
			<div class="flex items-center gap-1">
				<div
					class="w-4 h-4 bg-gradient-to-br from-amber-100 to-amber-200 border border-amber-400 rounded"
				></div>
				<span>Excursions</span>
			</div>
			<div class="flex items-center gap-1">
				<div
					class="w-4 h-4 bg-gradient-to-br from-purple-100 to-purple-200 border border-purple-400 rounded"
				></div>
				<span>Cultural</span>
			</div>
			<div class="flex items-center gap-1">
				<div
					class="w-4 h-4 bg-gradient-to-br from-sky-100 to-sky-200 border border-sky-400 rounded"
				></div>
				<span>Travel</span>
			</div>
			<div class="flex items-center gap-1">
				<div
					class="w-4 h-4 bg-gradient-to-br from-red-100 to-orange-200 border border-red-400 rounded"
				></div>
				<span>Meals</span>
			</div>
			<div class="flex items-center gap-1">
				<div
					class="w-4 h-4 bg-gradient-to-br from-lime-100 to-lime-200 border border-lime-400 rounded"
				></div>
				<span>Free Time</span>
			</div>
		</div>
	</div>

	<div class="space-y-4">
		{#each currentDay.timeSlots as slot, index}
			<ActivityCard
				{slot}
				showConnector={index < currentDay.timeSlots.length - 1}
			/>
		{/each}
	</div>
</div>
