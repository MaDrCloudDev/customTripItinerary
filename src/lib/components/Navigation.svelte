<script lang="ts">
	import { page } from '$app/state';
	import type { DaySchedule } from '../../app.d.ts';
	import { formatDate } from '../utils/dateUtils.js';
	import Button from './Button.svelte';

	interface Props {
		currentDay: DaySchedule;
		currentDayIndex: number;
		totalDays: number;
		onPrevDay: () => void;
		onNextDay: () => void;
	}

	let {
		currentDay,
		currentDayIndex,
		totalDays,
		onPrevDay,
		onNextDay,
	}: Props = $props();

	let pathname = $derived(page.url.pathname);

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
				<a href="/">
					<Button variant={pathname === '/' ? 'active' : 'secondary'}>
						📅 Day
					</Button>
				</a>
				<a href="/timeline">
					<Button variant={pathname === '/timeline' ? 'active' : 'secondary'}>
						🕐 Timeline
					</Button>
				</a>
				<a href="/overview">
					<Button variant={pathname === '/overview' ? 'active' : 'secondary'}>
						📊 Overview
					</Button>
				</a>
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
				<a href="/">
					<Button
						variant={pathname === '/' ? 'icon-active' : 'icon'}
					>
						<span class="text-base">📅</span>
						<span class="text-[10px] leading-tight">Day</span>
					</Button>
				</a>
				<a href="/timeline">
					<Button
						variant={pathname === '/timeline' ? 'icon-active' : 'icon'}
					>
						<span class="text-base">🕐</span>
						<span class="text-[10px] leading-tight">Timeline</span>
					</Button>
				</a>
				<a href="/overview">
					<Button
						variant={pathname === '/overview' ? 'icon-active' : 'icon'}
					>
						<span class="text-base">📊</span>
						<span class="text-[10px] leading-tight">Overview</span>
					</Button>
				</a>
			</div>
		</div>
	</div>
</nav>
