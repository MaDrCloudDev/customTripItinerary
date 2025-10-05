<script lang="ts">
	import type { DaySchedule } from '../types/itinerary.js';
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
			class="relative bg-white/50 rounded-2xl border-2 border-blue-200 overflow-hidden"
		>
			<div class="flex">
				<div class="w-20 flex-shrink-0 bg-blue-50">
					{#each Array.from({ length: 18 }, (_, i) => i + 6) as hour}
						<div
							class="h-12 flex items-center justify-center border-r-2 border-blue-300 border-b border-gray-200"
						>
							<div
								class="bg-blue-600 text-white rounded px-2 py-1 text-xs font-bold min-w-[50px] text-center"
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

				<div class="flex-1 relative">
					{#each Array.from({ length: 18 }, (_, i) => i + 6) as hour}
						<div
							class="h-12 border-b border-gray-200 {hour % 2 === 0
								? 'bg-gray-50/30'
								: 'bg-white/30'}"
						></div>
					{/each}

					{#each currentDay.timeSlots as activity}
						{@const startHour = parseInt(
							activity.startTime.split(':')[0]
						)}
						{@const startMinute = parseInt(
							activity.startTime.split(':')[1]
						)}
						{@const endHour = parseInt(
							activity.endTime.split(':')[0]
						)}
						{@const endMinute = parseInt(
							activity.endTime.split(':')[1]
						)}

						{@const startPosition =
							(startHour - 6) * 48 + (startMinute / 60) * 48}
						{@const duration =
							(endHour * 60 +
								endMinute -
								(startHour * 60 + startMinute)) /
							60}
						{@const height = Math.max(duration * 48, 40)}

						<div
							class="absolute left-2 right-2 {getColorClass(
								activity
							)} rounded-lg border-2 shadow-lg p-2 overflow-hidden hover:shadow-xl transition-shadow"
							style="top: {startPosition}px; height: {height}px;"
						>
							<div class="flex items-center gap-2 h-full">
								<!-- Time Badge -->
								<div
									class="flex-shrink-0 bg-white/90 rounded px-2 py-1 text-xs font-bold text-gray-800 border"
								>
									{formatTime(activity.startTime)}
								</div>

								<!-- Activity Content -->
								<div class="flex-1 min-w-0">
									<div class="flex items-center gap-2">
										<span class="text-base flex-shrink-0"
											>{activity.icon}</span
										>
										<h4
											class="font-bold text-sm text-gray-800 leading-tight truncate"
										>
											{activity.activity}
										</h4>
									</div>

									{#if height > 60 && activity.location}
										<div class="flex gap-1 text-xs mt-1">
											<button
												onclick={() =>
													openGoogleMaps(activity.location)}
												class="flex items-center gap-1 bg-white/70 hover:bg-white/90 rounded px-1 py-0.5 border transition-colors cursor-pointer"
											>
												<span>📍</span>
												<span
													class="font-medium truncate max-w-[80px]"
													>{activity.location}</span
												>
											</button>
										</div>
									{/if}
								</div>

								<!-- Duration Badge -->
								<div
									class="flex-shrink-0 bg-white/90 rounded px-2 py-1 text-xs font-bold text-gray-800 border"
								>
									{calculateDuration(
										activity.startTime,
										activity.endTime
									)}
								</div>
							</div>
						</div>
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
