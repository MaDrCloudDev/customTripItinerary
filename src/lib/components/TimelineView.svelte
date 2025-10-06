<script lang="ts">
	import type { DaySchedule } from '../../app.js';
	import {
		formatTime,
		calculateDuration,
	} from '../utils/dateUtils.js';
	import { getColorClass } from '../utils/styleUtils.js';
	import { openGoogleMaps } from '../utils/mapsUtils.js';

	interface Props {
		currentDay: DaySchedule;
	}

	let { currentDay }: Props = $props();
</script>

<style>
	/* Ensure consistent timeline alignment across all devices */
	.timeline-grid {
		/* Fix for sub-pixel rendering issues and ensure smooth rendering */
		position: relative;
		transform: translateZ(0);
		overflow: hidden;
	}
	
	.timeline-hour {
		/* Ensure exact 48px height regardless of browser */
		height: 48px !important;
		box-sizing: border-box;
		flex-shrink: 0;
	}
	
	.activity-card {
		/* Ensure proper positioning and prevent layout shift */
		position: absolute;
		will-change: transform;
		transform: translateZ(0);
		box-sizing: border-box;
	}
	
	/* Prevent horizontal scrolling on small screens */
	@media (max-width: 640px) {
		.timeline-grid {
			overflow-x: auto;
			-webkit-overflow-scrolling: touch;
		}
		
		.activity-card {
			/* Slightly reduce margins on mobile for better fit */
			font-size: 0.875rem;
		}
	}
	
	/* Ensure consistent font rendering */
	.activity-card * {
		text-rendering: optimizeLegibility;
		-webkit-font-smoothing: antialiased;
	}
</style>

<div
	class="bg-white/80 backdrop-blur-sm border border-blue-200/50 rounded-3xl p-8 shadow-xl shadow-blue-200/40"
>
	<div class="text-center mb-8">
		<h2
			class="text-3xl font-bold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent mb-2"
		>
			⏰ Day {currentDay.dayNumber} Timeline
		</h2>
		<p class="text-xl text-gray-700 font-medium mb-2">
			{currentDay.dayName}
		</p>

		<button
			onclick={() => openGoogleMaps(currentDay.location)}
			class="inline-flex items-center gap-2 text-blue-700 hover:text-blue-800 font-semibold transition-colors cursor-pointer bg-blue-50 hover:bg-blue-100 rounded-lg px-4 py-2 border border-blue-300"
		>
			<span class="text-xl">📍</span>
			<span class="text-lg">{currentDay.location}</span>
			<span class="text-sm font-bold">View Map ↗</span>
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

	<div class="max-w-5xl mx-auto">
		<div
			class="relative bg-white/50 rounded-2xl border-2 border-blue-200 overflow-hidden timeline-grid"
		>
			<div class="flex">
				<!-- Time labels column - fixed width for consistency -->
				<div class="w-20 sm:w-24 flex-shrink-0 bg-blue-50">
					{#each Array.from({ length: 18 }, (_, i) => i + 6) as hour}
						<div
							class="timeline-hour flex items-start justify-center pt-1 border-r-2 border-r-blue-300 border-b border-b-gray-200 relative"
							style="height: 48px;"
						>
							<div
								class="bg-blue-600 text-white rounded px-1.5 sm:px-2 py-1 text-xs font-bold min-w-[45px] sm:min-w-[50px] text-center"
							>
								{hour === 12
									? '12 PM'
									: hour > 12
										? `${hour - 12} PM`
										: hour === 0
											? '12 AM'
											: `${hour} AM`}
							</div>
						</div>
					{/each}
				</div>

				<!-- Activity timeline column -->
				<div class="flex-1 relative min-h-0">
				<!-- Hour grid background with subtle alignment guides -->
				{#each Array.from({ length: 18 }, (_, i) => i + 6) as hour}
					<div
						class="timeline-hour border-b border-gray-200 {hour % 2 === 0
							? 'bg-gray-50/30'
							: 'bg-white/30'} relative"
						style="height: 48px;"
					>
						<!-- Subtle hour marker line for alignment verification -->
						<div class="absolute left-0 top-0 w-full h-px bg-gray-300/40"></div>
					</div>
				{/each}					{#each currentDay.timeSlots as activity}
						{@const startTimeParts = activity.startTime.split(':')}
						{@const endTimeParts = activity.endTime.split(':')}
						{@const startHour = parseInt(startTimeParts[0]) || 0}
						{@const startMinute = parseInt(startTimeParts[1]) || 0}
						{@const endHour = parseInt(endTimeParts[0]) || 0}
						{@const endMinute = parseInt(endTimeParts[1]) || 0}

					<!-- Calculate position relative to 6 AM start, with precise pixel alignment -->
					{@const startTotalMinutes = startHour * 60 + startMinute}
					{@const endTotalMinutes = endHour * 60 + endMinute}
					{@const timelineStartMinutes = 6 * 60} <!-- 6 AM baseline -->
					{@const timelineEndMinutes = 24 * 60} <!-- 12 AM (midnight) end -->
					
					<!-- Ensure activity falls within timeline bounds -->
					{@const clampedStartMinutes = Math.max(startTotalMinutes, timelineStartMinutes)}
					{@const clampedEndMinutes = Math.min(endTotalMinutes, timelineEndMinutes)}
					
					<!-- Calculate precise positioning -->
					{@const startPosition = Math.round(((clampedStartMinutes - timelineStartMinutes) / 60) * 48)}
					{@const duration = (clampedEndMinutes - clampedStartMinutes) / 60}
					{@const height = Math.max(Math.round(duration * 48), 32)}
					
					<!-- Skip if activity is completely outside timeline bounds -->
					{#if startTotalMinutes < timelineEndMinutes && endTotalMinutes > timelineStartMinutes}						<!-- Activity card positioned absolutely with precise alignment -->
						<div
							class="activity-card left-1 right-1 sm:left-2 sm:right-2 {getColorClass(
								activity
							)} rounded-xl border-2 shadow-lg overflow-hidden hover:shadow-xl transition-all duration-200 z-10"
							style="top: {startPosition}px; height: {height}px; min-height: 40px;"
						>
							<div class="flex flex-col h-full p-2 sm:p-3 gap-2">
								<!-- Time and Duration Row -->
								<div class="flex justify-between items-center">
									<div
										class="flex-shrink-0 bg-white/95 backdrop-blur-sm rounded-lg px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm font-bold text-gray-800 border border-gray-300/50 shadow-sm"
									>
										{formatTime(activity.startTime)}
									</div>
									<div
										class="flex-shrink-0 bg-white/95 backdrop-blur-sm rounded-lg px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm font-bold text-gray-800 border border-gray-300/50 shadow-sm"
									>
										{calculateDuration(
											activity.startTime,
											activity.endTime
										)}
									</div>
								</div>

								<!-- Activity Content Container -->
								<div class="flex-1 min-w-0">
									<div class="flex items-center gap-2 sm:gap-3 mb-2">
										<span class="text-lg sm:text-xl flex-shrink-0"
											>{activity.icon}</span
										>
										<h4
											class="font-bold text-sm sm:text-lg text-gray-800 leading-snug flex-1"
											title={activity.activity}
										>
											{activity.activity}
										</h4>
									</div>

									{#if activity.description && height > 64}
										<div class="mb-2">
											<p class="text-xs sm:text-sm text-gray-700 leading-relaxed italic opacity-90">
												{activity.description}
											</p>
										</div>
									{/if}

									{#if height > 48 && activity.location}
										<div class="flex gap-1">
											<button
												onclick={() =>
													openGoogleMaps(activity.location)}
												class="flex items-center gap-1.5 bg-white/80 hover:bg-white/95 rounded-lg px-2 py-1 border border-gray-300/50 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md"
											>
												<span class="text-sm">📍</span>
												<span
													class="font-medium text-xs sm:text-sm text-gray-700 truncate max-w-[80px] sm:max-w-[120px]"
													title={activity.location}
													>{activity.location}</span
												>
											</button>
										</div>
									{/if}
								</div>
							</div>
						</div>
					{/if}
					{/each}
				</div>
			</div>
		</div>

		<!-- Legend -->
		<div class="mt-6 text-center">
			<p class="text-gray-600 text-base mb-2">
				📍 Click location badges to view on map
			</p>
			<p class="text-gray-500 text-sm">
				Each hour block shows the time progression of your day • Times
				shown are local Egyptian time
			</p>
		</div>
	</div>
</div>
