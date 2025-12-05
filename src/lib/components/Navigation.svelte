<script lang="ts">
	import type { DaySchedule, ViewMode } from '../../app.d.ts';
	import { formatDate } from '../utils/dateUtils.js';
	import Button from './Button.svelte';

	interface Props {
		currentDay: DaySchedule;
		currentDayIndex: number;
		totalDays: number;
		viewMode: ViewMode;
		onPrevDay: () => void;
		onNextDay: () => void;
		onViewChange: (mode: ViewMode) => void;
	}

	let {
		currentDay,
		currentDayIndex,
		totalDays,
		viewMode,
		onPrevDay,
		onNextDay,
		onViewChange,
	}: Props = $props();

	const isPrevDisabled = $derived(currentDayIndex === 0);
	const isNextDisabled = $derived(currentDayIndex >= totalDays - 1);
</script>

<nav
	class="bg-white/95 backdrop-blur-md border-b border-blue-400/50 py-3 sticky top-0 z-50 shadow-lg"
>
	<div class="container mx-auto px-6">
		<div class="hidden md:flex items-center justify-between gap-4">
			<Button
				variant="primary"
				disabled={isPrevDisabled}
				onclick={onPrevDay}
				class="group"
			>
				<span class="group-hover:-translate-x-1 transition-transform">←</span>
				<span>Previous</span>
			</Button>

			<div
				class="text-center flex-1 bg-blue-100/80 backdrop-blur-sm rounded-xl py-2 px-4 border border-blue-400/50"
			>
				<div
					class="text-base font-bold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent"
				>
					Day {currentDay.dayNumber} of {totalDays - 1}
				</div>
				<div class="text-sm text-gray-700 font-medium">
					{currentDay.dayName} • {currentDay.location}
				</div>
				<div class="text-xs text-gray-600">
					{formatDate(currentDay.date)}
				</div>
			</div>

			<div class="flex items-center gap-2">
				<Button
					variant={viewMode === 'single' ? 'active' : 'secondary'}
					onclick={() => onViewChange('single')}
				>
					📅 Day
				</Button>
				<Button
					variant={viewMode === 'timeline' ? 'active' : 'secondary'}
					onclick={() => onViewChange('timeline')}
				>
					🕐 Timeline
				</Button>
				<Button
					variant={viewMode === 'overview' ? 'active' : 'secondary'}
					onclick={() => onViewChange('overview')}
				>
					📊 Overview
				</Button>
			</div>

			<Button
				variant="primary"
				disabled={isNextDisabled}
				onclick={onNextDay}
				class="group"
			>
				<span>Next</span>
				<span class="group-hover:translate-x-1 transition-transform">→</span>
			</Button>
		</div>

		<div class="md:hidden space-y-2">
			<div class="flex justify-between">
				<Button
					variant="nav"
					disabled={isPrevDisabled}
					onclick={onPrevDay}
					class="group flex-shrink-0"
				>
					<span class="group-hover:-translate-x-1 transition-transform">←</span>
					<span class="hidden sm:inline">Previous</span>
					<span class="sm:hidden">Prev</span>
				</Button>

				<div
					class="text-center flex-1 bg-blue-100/80 backdrop-blur-sm rounded-xl py-2 px-3 mx-3 border border-blue-400/50"
				>
					<div
						class="text-sm font-bold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent"
					>
						Day {currentDay.dayNumber} of {totalDays - 1}
					</div>
					<div class="text-xs text-gray-700 font-medium">
						{currentDay.dayName} • {currentDay.location}
					</div>
				</div>

				<Button
					variant="nav"
					disabled={isNextDisabled}
					onclick={onNextDay}
					class="group flex-shrink-0"
				>
					<span class="hidden sm:inline">Next</span>
					<span class="sm:hidden">Next</span>
					<span class="group-hover:translate-x-1 transition-transform">→</span>
				</Button>
			</div>

			<div class="flex items-center justify-center gap-2">
				<Button
					variant={viewMode === 'single' ? 'active' : 'icon'}
					class="bg-blue-200 text-blue-800 hover:bg-blue-300"
					onclick={() => onViewChange('single')}
				>
					<span class="text-base">📅</span>
					<span class="text-[10px] leading-tight">Day</span>
				</Button>
				<Button
					variant={viewMode === 'timeline' ? 'active' : 'icon'}
					class="bg-blue-200 text-blue-800 hover:bg-blue-300"
					onclick={() => onViewChange('timeline')}
				>
					<span class="text-base">🕐</span>
					<span class="text-[10px] leading-tight">Timeline</span>
				</Button>
				<Button
					variant={viewMode === 'overview' ? 'active' : 'icon'}
					class="bg-blue-200 text-blue-800 hover:bg-blue-300"
					onclick={() => onViewChange('overview')}
				>
					<span class="text-base">📊</span>
					<span class="text-[10px] leading-tight">Overview</span>
				</Button>
			</div>
		</div>
	</div>
</nav>
