<script lang="ts">
	import type { DaySchedule } from '../types/itinerary.js';
	import { formatTime, calculateDuration } from '../utils/dateUtils.js';
	import { getColorClass } from '../utils/styleUtils.js';

	interface Props {
		currentDay: DaySchedule;
	}

	let { currentDay }: Props = $props();
</script>

<!-- Elegant Compact Timeline -->
<div class="bg-white/80 backdrop-blur-sm border border-rose-200/50 rounded-3xl p-8 shadow-xl shadow-rose-200/40">
	<div class="text-center mb-8">
		<h2 class="text-2xl font-bold bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent mb-2">
			🕐 Day {currentDay.dayNumber} Timeline
		</h2>
		<p class="text-gray-700 font-medium">{currentDay.location}</p>
	</div>
	
	<div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
		{#each currentDay.timeSlots as slot}
			<div class="flex items-center gap-4 {getColorClass(slot)} rounded-xl p-4 border shadow-md hover:shadow-lg transition-all duration-300">
				<div class="text-center min-w-20 bg-white/50 rounded-lg p-2">
					<div class="text-sm font-bold">{formatTime(slot.startTime)}</div>
					<div class="text-xs opacity-70">{calculateDuration(slot.startTime, slot.endTime)}</div>
				</div>
				<div class="text-2xl">{slot.icon}</div>
				<div class="flex-1">
					<h4 class="text-base font-bold mb-1">{slot.activity}</h4>
					<p class="text-sm opacity-80 leading-relaxed">{slot.description}</p>
					{#if slot.cost && slot.cost !== 'Included'}
						<div class="text-sm font-bold mt-2 bg-white/40 rounded-full px-2 py-1 inline-block">💰 {slot.cost}</div>
					{/if}
				</div>
			</div>
		{/each}
	</div>
</div>