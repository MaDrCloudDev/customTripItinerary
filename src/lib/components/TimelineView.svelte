<script lang="ts">
	import type { DaySchedule } from '../types/itinerary.js';
	import {
		formatTime,
		calculateDuration,
	} from '../utils/dateUtils.js';
	import { getColorClass } from '../utils/styleUtils.js';

	interface Props {
		currentDay: DaySchedule;
	}

	let { currentDay }: Props = $props();

	// Generate hourly calendar grid (6 AM to 11 PM)
	function generateCalendarGrid(activities: any[]) {
		const hours = [];
		const startHour = 6; // 6 AM
		const endHour = 23; // 11 PM

		for (let hour = startHour; hour <= endHour; hour++) {
			const hourData = {
				hour: hour,
				hourLabel:
					hour === 12
						? '12 PM'
						: hour > 12
							? `${hour - 12} PM`
							: hour === 0
								? '12 AM'
								: `${hour} AM`,
				timeSlots: [],
			};

			// Create 4 time slots per hour (15-minute intervals)
			for (let quarter = 0; quarter < 4; quarter++) {
				const minutes = quarter * 15;
				const slotStart = `${hour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
				const slotEnd = `${hour.toString().padStart(2, '0')}:${(minutes + 15).toString().padStart(2, '0')}`;

				// Find activity that falls within this time slot
				const activity = activities.find((act) => {
					const actStart = act.startTime;
					const actEnd = act.endTime;

					// Check if activity overlaps with this 15-minute slot
					return (
						(actStart <= slotStart && actEnd > slotStart) ||
						(actStart >= slotStart && actStart < slotEnd)
					);
				});

				hourData.timeSlots.push({
					slotStart,
					slotEnd,
					minutes: minutes,
					activity,
				});
			}

			hours.push(hourData);
		}

		return hours;
	}
</script>

<div
	class="bg-white/80 backdrop-blur-sm border border-blue-400/50 rounded-3xl p-6 shadow-xl shadow-blue-400/40"
>
	<div class="text-center mb-6">
		<h2
			class="text-2xl font-bold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent mb-2"
		>
			📅 Day {currentDay.dayNumber} Calendar
		</h2>
		<p class="text-gray-700 font-medium">{currentDay.location}</p>

		<div class="mt-4 flex flex-wrap justify-center gap-3 text-xs">
			<div class="flex items-center gap-1">
				<div
					class="w-4 h-4 bg-gradient-to-br from-blue-100 to-blue-200 border border-blue-400 rounded"
				></div>
				<span>Excursions</span>
			</div>
			<div class="flex items-center gap-1">
				<div
					class="w-4 h-4 bg-gradient-to-br from-orange-100 to-orange-200 border border-orange-400 rounded"
				></div>
				<span>Dining</span>
			</div>
			<div class="flex items-center gap-1">
				<div
					class="w-4 h-4 bg-gradient-to-br from-purple-100 to-purple-200 border border-purple-400 rounded"
				></div>
				<span>Cultural</span>
			</div>
			<div class="flex items-center gap-1">
				<div
					class="w-4 h-4 bg-gradient-to-br from-green-100 to-green-200 border border-green-400 rounded"
				></div>
				<span>Nature</span>
			</div>
			<div class="flex items-center gap-1">
				<div
					class="w-4 h-4 bg-gradient-to-br from-yellow-100 to-yellow-200 border border-yellow-400 rounded"
				></div>
				<span>Travel</span>
			</div>
			<div class="flex items-center gap-1">
				<div
					class="w-4 h-4 bg-gradient-to-br from-red-100 to-red-200 border border-red-400 rounded"
				></div>
				<span>Meals</span>
			</div>
			<div class="flex items-center gap-1">
				<div
					class="w-4 h-4 bg-gradient-to-br from-gray-100 to-gray-200 border border-gray-400 rounded"
				></div>
				<span>Free Time</span>
			</div>
		</div>
	</div>

	<div class="w-full max-w-5xl mx-auto">
		<div class="grid grid-cols-5 gap-0.5 mb-2">
			<div class="text-xs font-bold text-center text-gray-600 py-2">
				Hour
			</div>
			<div class="text-xs font-bold text-center text-gray-600 py-2">
				:00
			</div>
			<div class="text-xs font-bold text-center text-gray-600 py-2">
				:15
			</div>
			<div class="text-xs font-bold text-center text-gray-600 py-2">
				:30
			</div>
			<div class="text-xs font-bold text-center text-gray-600 py-2">
				:45
			</div>
		</div>

		<div class="space-y-0.5">
			{#each generateCalendarGrid(currentDay.timeSlots) as hourData}
				<div class="grid grid-cols-5 gap-0.5">
					<div
						class="bg-blue-600 text-white text-xs font-bold text-center py-2 rounded flex items-center justify-center min-w-16"
					>
						{hourData.hourLabel}
					</div>

					{#each hourData.timeSlots as timeSlot}
						<div
							class="border border-blue-200 rounded overflow-hidden min-h-16 {timeSlot.activity
								? getColorClass(timeSlot.activity)
								: 'bg-gray-50'} flex flex-col relative group"
						>
							{#if timeSlot.activity}
								<div
									class="flex-1 p-1 flex flex-col justify-center text-center"
								>
									<div class="text-sm mb-1">
										{timeSlot.activity.icon}
									</div>
									<div class="text-xs font-bold leading-tight">
										{timeSlot.activity.activity}
									</div>
								</div>

								<div
									class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity z-10 whitespace-nowrap pointer-events-none"
								>
									<div class="font-bold">
										{formatTime(timeSlot.activity.startTime)} - {formatTime(
											timeSlot.activity.endTime
										)}
									</div>
									<div>{timeSlot.activity.activity}</div>
									{#if timeSlot.activity.location}
										<div>
											📍 {timeSlot.activity.location}
										</div>
									{/if}
								</div>
							{:else}
								<div class="flex-1 flex items-center justify-center">
									<div class="text-gray-400 text-xs">•</div>
								</div>
							{/if}
						</div>
					{/each}
				</div>
			{/each}
		</div>
	</div>
</div>
