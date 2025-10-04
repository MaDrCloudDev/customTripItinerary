<script lang="ts">
	import type { DaySchedule } from '../types/itinerary.js';
	import { formatTime } from '../utils/dateUtils.js';
	import { openGoogleMaps } from '../utils/mapsUtils.js';

	interface Props {
		dailySchedule: DaySchedule[];
		onDaySelect: (dayIndex: number) => void;
	}

	let { dailySchedule, onDaySelect }: Props = $props();
</script>

<!-- Beautiful Overview Grid -->
<div
	class="bg-white/80 backdrop-blur-sm border border-rose-200/50 rounded-3xl p-8 shadow-xl shadow-rose-200/40"
>
	<div class="text-center mb-8">
		<h2
			class="text-3xl font-bold bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent mb-2"
		>
			📅 Complete Cruise Overview
		</h2>
		<p class="text-gray-700">Your 10-day Egyptian adventure</p>
	</div>

	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
		{#each dailySchedule as day, index}
			<button
				onclick={() => onDaySelect(index)}
				class="group p-6 bg-gradient-to-br from-rose-50 to-pink-50 backdrop-blur-sm border border-rose-200/50 rounded-2xl hover:border-rose-400 hover:shadow-xl transition-all duration-300 hover:scale-105 text-left cursor-pointer"
			>
				<div class="flex items-center gap-3 mb-4">
					<div
						class="w-12 h-12 bg-gradient-to-br from-rose-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg"
					>
						{day.dayNumber}
					</div>
					<div>
						<div class="text-lg font-bold text-gray-800">
							Day {day.dayNumber}
						</div>
						<div class="text-sm text-gray-600">
							{day.dayName}
						</div>
					</div>
				</div>

				<div
					onclick={(e) => {
						e.stopPropagation();
						openGoogleMaps(day.location);
					}}
					onkeydown={(e) => {
						if (e.key === 'Enter' || e.key === ' ') {
							e.stopPropagation();
							openGoogleMaps(day.location);
						}
					}}
					role="button"
					tabindex="0"
					class="flex items-center gap-2 mb-4 text-rose-600 hover:text-rose-700 font-medium transition-colors cursor-pointer"
				>
					<span class="text-lg">📍</span>
					<span class="font-semibold">{day.location}</span>
					<span class="text-sm">🗺️</span>
				</div>

				<div class="space-y-2 max-h-64 overflow-y-auto">
					{#each day.timeSlots as slot}
						<div
							class="text-sm flex items-center gap-3 text-gray-700"
						>
							<span
								class="text-xs bg-rose-100 text-rose-700 px-2 py-1 rounded-full font-medium min-w-fit"
							>
								{formatTime(slot.startTime)}
							</span>
							<span class="text-base">{slot.icon}</span>
							<span class="font-medium flex-1">{slot.activity}</span>
						</div>
					{/each}
				</div>
			</button>
		{/each}
	</div>
</div>
