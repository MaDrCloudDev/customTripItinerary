<script lang="ts">
	import type { DaySchedule, ViewMode } from '../types/itinerary.js';
	import { formatDate } from '../utils/dateUtils.js';

	interface Props {
		currentDay: DaySchedule;
		currentDayIndex: number;
		totalDays: number;
		viewMode: ViewMode;
		onPrevDay: () => void;
		onNextDay: () => void;
		onViewModeChange: (mode: ViewMode) => void;
		onPrint: () => void;
	}

	let {
		currentDay,
		currentDayIndex,
		totalDays,
		viewMode,
		onPrevDay,
		onNextDay,
		onViewModeChange,
		onPrint,
	}: Props = $props();
</script>

<nav
	class="bg-white/95 backdrop-blur-md border-b border-blue-400/50 py-3 no-print sticky top-0 z-50 shadow-lg"
>
	<div class="container mx-auto px-6">
		<div class="flex items-center justify-between gap-4">
			<button
				onclick={onPrevDay}
				disabled={currentDayIndex === 0}
				class="group px-3 py-2 rounded-full bg-gradient-to-r from-blue-700 to-blue-800 text-white font-medium disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-lg hover:scale-105 flex items-center gap-2"
			>
				<span class="group-hover:-translate-x-1 transition-transform"
					>←</span
				>
				<span>Previous</span>
			</button>

			<div
				class="text-center flex-1 bg-blue-100/80 backdrop-blur-sm rounded-xl py-2 px-4 border border-blue-400/50"
			>
				<div
					class="text-base font-bold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent"
				>
					Day {currentDayIndex + 1} of {totalDays}
				</div>
				<div class="text-sm text-gray-700 font-medium">
					{currentDay.dayName} • {currentDay.location}
				</div>
				<div class="text-xs text-gray-600">
					{formatDate(currentDay.date)}
				</div>
			</div>

			<div class="flex items-center gap-2">
				<button
					onclick={() => onViewModeChange('single')}
					class="px-3 py-1.5 text-xs rounded-full font-medium transition-all duration-300 {viewMode ===
					'single'
						? 'bg-gradient-to-r from-blue-700 to-blue-800 text-white shadow-md'
						: 'bg-blue-200 text-blue-800 hover:bg-blue-300'}"
				>
					📅 Day
				</button>
				<button
					onclick={() => onViewModeChange('timeline')}
					class="px-3 py-1.5 text-xs rounded-full font-medium transition-all duration-300 {viewMode ===
					'timeline'
						? 'bg-gradient-to-r from-blue-700 to-blue-800 text-white shadow-md'
						: 'bg-blue-200 text-blue-800 hover:bg-blue-300'}"
				>
					🕐 Timeline
				</button>
				<button
					onclick={() => onViewModeChange('overview')}
					class="px-3 py-1.5 text-xs rounded-full font-medium transition-all duration-300 {viewMode ===
					'overview'
						? 'bg-gradient-to-r from-blue-700 to-blue-800 text-white shadow-md'
						: 'bg-blue-200 text-blue-800 hover:bg-blue-300'}"
				>
					📊 Overview
				</button>
				<button
					onclick={onPrint}
					class="px-3 py-1.5 text-xs rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-medium hover:shadow-md hover:scale-105 transition-all duration-300"
				>
					🖨️ Print
				</button>
			</div>

			<button
				onclick={onNextDay}
				disabled={currentDayIndex === totalDays - 1}
				class="group px-3 py-2 rounded-full bg-gradient-to-r from-blue-700 to-blue-800 text-white font-medium disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-lg hover:scale-105 flex items-center gap-2"
			>
				<span>Next</span>
				<span class="group-hover:translate-x-1 transition-transform"
					>→</span
				>
			</button>
		</div>
	</div>
</nav>
