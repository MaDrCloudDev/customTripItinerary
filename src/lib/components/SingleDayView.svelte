<script lang="ts">
	import type { DaySchedule } from '../types/itinerary.js';
	import { formatDate } from '../utils/dateUtils.js';
	import { openGoogleMaps } from '../utils/mapsUtils.js';
	import ActivityCard from './ActivityCard.svelte';

	interface Props {
		currentDay: DaySchedule;
	}

	let { currentDay }: Props = $props();
</script>

<!-- Beautiful Single Day View -->
<div class="bg-white/80 backdrop-blur-sm border border-rose-200/50 rounded-3xl p-8 mb-8 shadow-xl shadow-rose-200/40">
	<!-- Elegant Day Header -->
	<div class="text-center mb-8 pb-6 border-b border-rose-200/50">
		<div class="inline-flex items-center gap-6 mb-4">
			<div class="w-12 h-0.5 bg-gradient-to-r from-transparent to-rose-400"></div>
			<span class="text-4xl">🏺</span>
			<div class="text-center">
				<h2 class="text-3xl font-bold bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent mb-2">
					Day {currentDay.dayNumber}
				</h2>
				<p class="text-lg text-gray-700 font-medium">
					{formatDate(currentDay.date)}
				</p>
			</div>
			<span class="text-4xl">🏺</span>
			<div class="w-12 h-0.5 bg-gradient-to-l from-transparent to-rose-400"></div>
		</div>
		
		<button 
			onclick={() => openGoogleMaps(currentDay.location)}
			class="inline-flex items-center gap-3 bg-rose-50 hover:bg-rose-100 rounded-full px-6 py-3 border border-rose-200 transition-colors cursor-pointer"
		>
			<span class="text-2xl">📍</span>
			<span class="text-xl font-bold text-rose-800">{currentDay.location}</span>
			<span class="text-sm text-rose-600">🗺️</span>
		</button>
	</div>

	<!-- Beautiful Timeline -->
	<div class="space-y-4">
		{#each currentDay.timeSlots as slot, index}
			<ActivityCard 
				{slot} 
				showConnector={index < currentDay.timeSlots.length - 1} 
			/>
		{/each}
	</div>
</div>