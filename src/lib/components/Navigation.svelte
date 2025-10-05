<script lang="ts">
	import type { DaySchedule, ViewMode } from '../types/itinerary.js';
	import { formatDate } from '../utils/dateUtils.js';
	import { createEventDispatcher } from 'svelte';

	interface Props {
		currentDay: DaySchedule;
		currentDayIndex: number;
		totalDays: number;
		viewMode: ViewMode;
	}

	let { currentDay, currentDayIndex, totalDays, viewMode }: Props = $props();

	const dispatch = createEventDispatcher<{
		prevday: void;
		nextday: void;
		viewchange: ViewMode;
	}>();

	const nextDay = (): void => {
		dispatch('nextday');
	};

	const prevDay = (): void => {
		dispatch('prevday');
	};

	const handleViewModeChange = (mode: ViewMode): void => {
		dispatch('viewchange', mode);
	};
</script>

<nav
	class="bg-white/95 backdrop-blur-md border-b border-blue-400/50 py-3 sticky top-0 z-50 shadow-lg"
>
	<div class="container mx-auto px-6">
		<div class="hidden md:flex items-center justify-between gap-4">
			<button
				type="button"
				onclick={prevDay}
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
					Day {currentDay.dayNumber} of {totalDays}
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
					type="button"
					onclick={() => handleViewModeChange('single')}
					class="px-3 py-1.5 text-xs rounded-full font-medium transition-all duration-300 {viewMode ===
					'single'
						? 'bg-gradient-to-r from-blue-700 to-blue-800 text-white shadow-md'
						: 'bg-blue-200 text-blue-800 hover:bg-blue-300'}"
				>
					📅 Day
				</button>
				<button
					type="button"
					onclick={() => handleViewModeChange('timeline')}
					class="px-3 py-1.5 text-xs rounded-full font-medium transition-all duration-300 {viewMode ===
					'timeline'
						? 'bg-gradient-to-r from-blue-700 to-blue-800 text-white shadow-md'
						: 'bg-blue-200 text-blue-800 hover:bg-blue-300'}"
				>
					🕐 Timeline
				</button>
				<button
					type="button"
					onclick={() => handleViewModeChange('overview')}
					class="px-3 py-1.5 text-xs rounded-full font-medium transition-all duration-300 {viewMode ===
					'overview'
						? 'bg-gradient-to-r from-blue-700 to-blue-800 text-white shadow-md'
						: 'bg-blue-200 text-blue-800 hover:bg-blue-300'}"
				>
					📊 Overview
				</button>
			</div>

			<button
				type="button"
				onclick={nextDay}
				disabled={currentDayIndex >= totalDays - 1}
				class="group px-3 py-2 rounded-full bg-gradient-to-r from-blue-700 to-blue-800 text-white font-medium disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-lg hover:scale-105 flex items-center gap-2"
			>
				<span>Next</span>
				<span class="group-hover:translate-x-1 transition-transform"
					>→</span
				>
			</button>
		</div>

		<div class="md:hidden space-y-2">
			<div class="items-center justify-between gap-2 flex-nowrap">
				<div class="justify-between flex">
					<button
						onclick={prevDay}
						disabled={currentDayIndex === 0}
						class="group px-3 py-2 rounded-full bg-gradient-to-r from-blue-700 to-blue-800 text-white font-medium disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-lg hover:scale-105 flex items-center gap-2 flex-shrink-0"
					>
						<span
							class="group-hover:-translate-x-1 transition-transform"
							>←</span
						>
						<span class="hidden sm:inline">Previous</span>
						<span class="sm:hidden">Prev</span>
					</button>

					<div
						class="text-center flex-1 bg-blue-100/80 backdrop-blur-sm rounded-xl py-2 px-3 mx-3 border border-blue-400/50"
					>
						<div
							class="text-sm font-bold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent"
						>
							Day {currentDay.dayNumber} of {totalDays}
						</div>
						<div class="text-xs text-gray-700 font-medium">
							{currentDay.dayName} • {currentDay.location}
						</div>
					</div>

					<button
						onclick={nextDay}
						disabled={currentDayIndex >= totalDays - 1}
						class="group px-3 py-2 rounded-full bg-gradient-to-r from-blue-700 to-blue-800 text-white font-medium disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-lg hover:scale-105 flex items-center gap-2 flex-shrink-0"
					>
						<span class="hidden sm:inline">Next</span>
						<span class="sm:hidden">Next</span>
						<span
							class="group-hover:translate-x-1 transition-transform"
							>→</span
						>
					</button>
				</div>
			</div>

			<div class="flex items-center justify-between gap-2">
				<div class="flex items-center gap-1">
					<button
						onclick={() => handleViewModeChange('single')}
						class="px-2 py-1 text-xs rounded-full font-medium transition-all duration-300 {viewMode ===
						'single'
							? 'bg-gradient-to-r from-blue-700 to-blue-800 text-white shadow-md'
							: 'bg-blue-200 text-blue-800 hover:bg-blue-300'}"
					>
						📅
					</button>
					<button
						onclick={() => handleViewModeChange('timeline')}
						class="px-2 py-1 text-xs rounded-full font-medium transition-all duration-300 {viewMode ===
						'timeline'
							? 'bg-gradient-to-r from-blue-700 to-blue-800 text-white shadow-md'
							: 'bg-blue-200 text-blue-800 hover:bg-blue-300'}"
					>
						🕐
					</button>
					<button
						onclick={() => handleViewModeChange('overview')}
						class="px-2 py-1 text-xs rounded-full font-medium transition-all duration-300 {viewMode ===
						'overview'
							? 'bg-gradient-to-r from-blue-700 to-blue-800 text-white shadow-md'
							: 'bg-blue-200 text-blue-800 hover:bg-blue-300'}"
					>
						📊
					</button>
				</div>
			</div>
		</div>
	</div>
</nav>
