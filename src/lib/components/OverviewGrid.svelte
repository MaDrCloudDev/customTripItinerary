<script lang="ts">
	import type { DaySchedule } from '../../app.d.ts';
	import { formatTime } from '../utils/dateUtils.js';
	import { openGoogleMaps } from '../utils/mapsUtils.js';
	import { getColorClass } from '../utils/styleUtils.js';

	interface Props {
		dailySchedule: DaySchedule[];
		onDaySelect: (dayIndex: number) => void;
	}

	let { dailySchedule, onDaySelect }: Props = $props();
</script>

<div
	class="bg-white/80 backdrop-blur-sm border border-blue-200/50 rounded-3xl p-8 shadow-xl shadow-blue-200/40"
>
	<div class="text-center mb-8">
		<h2
			class="text-3xl font-bold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent mb-2"
		>
			📅 Complete Cruise Overview
		</h2>
		<p class="text-gray-700">Your 12-day Egyptian adventure</p>

		<div class="mt-4 flex flex-wrap justify-center gap-3 text-xs">
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

	<div
		class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 overview-grid"
	>
		{#each dailySchedule as day, index}
			<button
				onclick={() => onDaySelect(index)}
				class="group p-6 bg-gradient-to-br from-blue-100 to-blue-200 backdrop-blur-sm border border-blue-400/50 rounded-2xl hover:border-blue-600 hover:shadow-xl transition-all duration-300 hover:scale-105 text-center cursor-pointer overview-card flex flex-col h-full min-h-[400px]"
			>
				<!-- Header Section - Fixed Height -->
				<div class="text-center mb-4 flex-shrink-0">
					<div class="text-lg font-bold text-gray-800 mb-1">
						Day {day.dayNumber}
					</div>
					<div class="text-sm text-gray-600">
						{day.dayName}
					</div>
				</div>

				<!-- Location Section - Fixed Height -->
				<div class="flex justify-center mb-4 flex-shrink-0">
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
						class="flex items-center gap-2 text-blue-700 hover:text-blue-800 font-medium transition-colors cursor-pointer bg-blue-50 hover:bg-blue-100 rounded-lg px-3 py-2 border border-blue-300 text-xs"
					>
						<span class="text-base">📍</span>
						<span class="font-semibold truncate max-w-[120px]"
							>{day.location}</span
						>
						<span class="text-xs font-bold flex items-center gap-1"
							>Map <span class="text-xs">↗</span></span
						>
					</div>
				</div>

				<!-- Activities Section - Flexible Height -->
				<div class="space-y-2 activity-list flex-1 overflow-y-auto">
					{#each day.timeSlots as slot}
						<div
							class="text-sm flex items-center p-3 rounded-lg {getColorClass(
								slot
							)} border shadow-sm min-h-[3rem]"
						>
							<span
								class="text-xs bg-white/60 px-2 py-1 rounded-full font-medium flex-shrink-0 mr-3"
							>
								{formatTime(slot.startTime)}
							</span>
							<span class="text-lg flex-shrink-0 mr-auto"
								>{slot.icon}</span
							>
							<span class="font-medium text-right leading-tight"
								>{slot.activity}</span
							>
						</div>
					{/each}
				</div>
			</button>
		{/each}
	</div>
</div>
