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
							class="timeline-hour border-b border-gray-200 {hour %
								2 ===
							0
								? 'bg-gray-50/30'
								: 'bg-white/30'} relative"
							style="height: 48px;"
						>
							<!-- Subtle hour marker line for alignment verification -->
							<div
								class="absolute left-0 top-0 w-full h-px bg-gray-300/40"
							></div>
						</div>
					{/each}
					{#each currentDay.timeSlots as activity}
						{@const startTimeParts = activity.startTime.split(':')}
						{@const endTimeParts = activity.endTime.split(':')}
						{@const startHour = parseInt(startTimeParts[0]) || 0}
						{@const startMinute = parseInt(startTimeParts[1]) || 0}
						{@const endHour = parseInt(endTimeParts[0]) || 0}
						{@const endMinute = parseInt(endTimeParts[1]) || 0}

						<!-- Calculate position relative to 6 AM start, with precise pixel alignment -->
						{@const startTotalMinutes = startHour * 60 + startMinute}
						{@const endTotalMinutes = endHour * 60 + endMinute}
						{@const timelineStartMinutes = 6 * 60}
						<!-- 6 AM baseline -->
						{@const timelineEndMinutes = 24 * 60}
						<!-- 12 AM (midnight) end -->

						<!-- Ensure activity falls within timeline bounds -->
						{@const clampedStartMinutes = Math.max(
							startTotalMinutes,
							timelineStartMinutes
						)}
						{@const clampedEndMinutes = Math.min(
							endTotalMinutes,
							timelineEndMinutes
						)}

						<!-- Calculate precise positioning -->
						{@const startPosition = Math.round(
							((clampedStartMinutes - timelineStartMinutes) / 60) * 48
						)}
						{@const duration =
							(clampedEndMinutes - clampedStartMinutes) / 60}
						{@const baseHeight = Math.max(
							Math.round(duration * 48),
							80
						)}
						{@const height =
							activity.activity === 'Village of Esna by Foot'
								? baseHeight - 8
								: baseHeight}

						<!-- Skip if activity is completely outside timeline bounds -->
						{#if startTotalMinutes < timelineEndMinutes && endTotalMinutes > timelineStartMinutes}
							{@const isVeryShort = height < 100}
							{@const isShort = height < 150}
							<!-- Activity card positioned absolutely with precise alignment -->
							<div
								class="activity-card left-1 right-1 sm:left-2 sm:right-2 {getColorClass(
									activity
								)} rounded-xl border-2 shadow-lg overflow-hidden hover:shadow-xl transition-all duration-200 z-10"
								style="top: {startPosition}px; height: {height}px; min-height: 40px;"
							>
								<div
									class="flex flex-col h-full p-1.5 sm:p-2 {isVeryShort
										? 'gap-0.5'
										: 'gap-1'}"
								>
									{#if !isVeryShort}
										<!-- Time and Duration Row for normal activities -->
										<div
											class="flex justify-between items-center mb-1"
										>
											<div
												class="flex-shrink-0 bg-white/95 backdrop-blur-sm rounded-lg px-2 py-1 text-xs font-bold text-gray-800 border border-gray-300/50 shadow-sm"
											>
												{formatTime(activity.startTime)}
											</div>
											<div
												class="flex-shrink-0 bg-white/95 backdrop-blur-sm rounded-lg px-2 py-1 text-xs font-bold text-gray-800 border border-gray-300/50 shadow-sm"
											>
												{calculateDuration(
													activity.startTime,
													activity.endTime
												)}
											</div>
										</div>
									{/if}

									<!-- Activity Content Container -->
									<div class="flex-1 min-w-0 flex flex-col">
										{#if isVeryShort}
											<!-- Compact layout for very short activities -->
											<div
												class="flex items-center justify-between gap-1 mb-1"
											>
												<div
													class="text-xs font-bold text-gray-800 bg-white/80 rounded px-1 py-0.5"
												>
													{formatTime(activity.startTime)}
												</div>
												<div
													class="text-xs font-bold text-gray-800 bg-white/80 rounded px-1 py-0.5"
												>
													{calculateDuration(
														activity.startTime,
														activity.endTime
													)}
												</div>
											</div>
											<div class="flex items-center gap-1.5 flex-1">
												<span class="text-sm flex-shrink-0"
													>{activity.icon}</span
												>
												<h4
													class="font-bold text-xs text-gray-800 leading-tight flex-1 line-clamp-2"
													title={activity.activity}
												>
													{activity.activity}
												</h4>
											</div>
										{:else}
											<!-- Normal layout for longer activities -->
											<div class="flex items-start gap-2 mb-1">
												<span
													class="text-base sm:text-lg flex-shrink-0 mt-0.5"
													>{activity.icon}</span
												>
												<div class="flex-1 min-w-0">
													<h4
														class="font-bold {isShort
															? 'text-xs'
															: 'text-xs sm:text-sm'} text-gray-800 leading-tight mb-1"
														title={activity.activity}
													>
														{activity.activity}
													</h4>
													{#if activity.description && !isShort}
														<p
															class="text-xs text-gray-700 leading-tight opacity-90 line-clamp-2 mb-1"
														>
															{activity.description}
														</p>
													{/if}
												</div>
											</div>

											{#if activity.location}
												<div class="mt-auto">
													<button
														onclick={() =>
															openGoogleMaps(activity.location)}
														class="flex items-center gap-1 bg-white/80 hover:bg-white/95 rounded px-1.5 py-0.5 border border-gray-300/50 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md text-xs"
													>
														<span class="text-xs">📍</span>
														<span
															class="font-medium text-gray-700 truncate max-w-[60px] sm:max-w-[100px]"
															title={activity.location}
															>{activity.location}</span
														>
													</button>
												</div>
											{/if}
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

	/* Text truncation for better layout */
	.line-clamp-2 {
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
</style>
