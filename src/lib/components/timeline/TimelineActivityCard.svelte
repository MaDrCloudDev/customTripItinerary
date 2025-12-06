<script lang="ts">
	import type { TimeSlot } from '../../../app.d.ts';
	import { formatTime, calculateDuration } from '../../utils/dateUtils.js';
	import { getColorClass } from '../../utils/styleUtils.js';
	import { openGoogleMaps } from '../../utils/mapsUtils.js';

	interface Props {
		activity: TimeSlot;
	}

	let { activity }: Props = $props();

	let positioning = $derived.by(() => {
		const startTimeParts = activity.startTime.split(':');
		const endTimeParts = activity.endTime.split(':');
		const startHour = parseInt(startTimeParts[0]) || 0;
		const startMinute = parseInt(startTimeParts[1]) || 0;
		const endHour = parseInt(endTimeParts[0]) || 0;
		const endMinute = parseInt(endTimeParts[1]) || 0;

		const startTotalMinutes = startHour * 60 + startMinute;
		const endTotalMinutes = endHour * 60 + endMinute;
		const timelineStartMinutes = 6 * 60;
		const timelineEndMinutes = 24 * 60;

		const clampedStartMinutes = Math.max(startTotalMinutes, timelineStartMinutes);
		const clampedEndMinutes = Math.min(endTotalMinutes, timelineEndMinutes);

		const startPosition = Math.round(
			((clampedStartMinutes - timelineStartMinutes) / 60) * 48
		);
		const duration = (clampedEndMinutes - clampedStartMinutes) / 60;
		const height = Math.max(Math.round(duration * 48), 40);

		const isVisible =
			startTotalMinutes < timelineEndMinutes && endTotalMinutes > timelineStartMinutes;

		return {
			top: startPosition,
			height,
			isVisible,
		};
	});
</script>

{#if positioning.isVisible}
	<div
		class="activity-card {getColorClass(
			activity
		)} rounded-xl border-2 shadow-lg z-10 overflow-y-auto hover:shadow-xl hover:scale-[1.01] transition-card"
		style="top: {positioning.top}px; height: {positioning.height}px;"
	>
		<div class="flex flex-col p-1 md:p-1.5 gap-0">
			<!-- Time badges - mobile/tablet only -->
			<div class="time-badges-container md:hidden">
				<div class="time-badge-mobile">
					{formatTime(activity.startTime)}
				</div>
				<div class="time-badge-mobile">
					{calculateDuration(activity.startTime, activity.endTime)}
				</div>
			</div>

			<div class="flex-1 min-w-0 flex flex-col">
				<div class="flex items-start gap-1 md:gap-1.5 min-h-0">
					<span class="text-sm xs:text-base md:text-lg mt-0.5 flex-shrink-0">{activity.icon}</span>
					<div class="flex-1 min-w-0 flex flex-col md:flex-row md:items-start md:justify-between md:gap-2">
						<div class="flex-1 min-w-0 flex flex-col">
							<h4
								class="font-bold text-[11px] xs:text-xs md:text-sm text-gray-800 leading-tight break-words overflow-wrap-anywhere hyphens-auto"
								title={activity.activity}
							>
								{activity.activity}
							</h4>
							{#if activity.description}
								<p
									class="text-[9px] xs:text-[10px] md:text-xs text-gray-700 leading-tight opacity-90 break-words overflow-wrap-anywhere"
								>
									{activity.description}
								</p>
							{/if}
							
							{#if activity.cost || activity.notes}
								<div class="space-y-0.5 md:space-y-1 mt-1.5 md:mt-2">
									{#if activity.cost}
										<div class="flex items-center gap-0.5 md:gap-1 text-[9px] xs:text-[10px] md:text-xs text-gray-700">
											<span class="flex-shrink-0 text-[10px] xs:text-xs md:text-sm">💰</span>
											<span class="font-semibold">{activity.cost}</span>
										</div>
									{/if}
									{#if activity.notes}
										<div class="flex items-start gap-0.5 md:gap-1 text-[9px] xs:text-[10px] md:text-xs text-gray-700">
											<span class="flex-shrink-0 text-[10px] xs:text-xs md:text-sm">📝</span>
											<span class="leading-tight break-words overflow-wrap-anywhere">{activity.notes}</span>
										</div>
									{/if}
								</div>
							{/if}
						</div>
						<!-- Time badges and location - tablet/desktop only -->
						<div class="hidden md:flex flex-col gap-1 flex-shrink-0 min-w-[120px] lg:min-w-[140px]">
							<div class="flex items-center gap-1">
								<div
									class="bg-white/95 backdrop-blur-sm rounded px-1.5 py-0.5 text-[11px] lg:text-xs font-bold text-gray-800 border border-gray-300/50 shadow-sm flex-1 flex items-center justify-center whitespace-nowrap"
								>
									{formatTime(activity.startTime)}
								</div>
								<div
									class="bg-white/95 backdrop-blur-sm rounded px-1.5 py-0.5 text-[11px] lg:text-xs font-bold text-gray-800 border border-gray-300/50 shadow-sm flex-1 flex items-center justify-center whitespace-nowrap"
								>
									{calculateDuration(activity.startTime, activity.endTime)}
								</div>
							</div>
							{#if activity.location}
							<button
								onclick={() => {
									if (activity.location) {
										openGoogleMaps(activity.location);
									}
								}}
								class="relative flex items-center justify-center gap-0.5 bg-white/80 rounded px-1.5 lg:px-2 py-1.5 border border-gray-300/50 cursor-pointer shadow-sm text-xs hover:bg-white/95 hover:shadow-md transition-location-button w-full min-h-[44px] lg:min-h-[48px]"
							>
								<div class="flex items-baseline gap-0.5 mt-1">
									<span class="text-[11px] lg:text-xs flex-shrink-0">📍</span>
									<span
										class="font-medium text-gray-700 text-center leading-tight break-words text-[10px] lg:text-xs"
										title={activity.location}>{activity.location}</span
									>
								</div>
								</button>
							{/if}
						</div>
					</div>
				</div>

				{#if activity.location}
					<!-- Location - mobile/tablet only -->
					<div class="mt-auto pt-1 md:pt-2 pb-0.5 md:pb-1 md:hidden flex justify-end">
						<button
							onclick={() => {
								if (activity.location) {
									openGoogleMaps(activity.location);
								}
							}}
							class="flex items-center gap-0.5 bg-white/80 rounded px-1.5 py-1 border border-gray-300/50 cursor-pointer shadow-sm text-[9px] xs:text-[10px] hover:bg-white/95 hover:shadow-md transition-location-button max-w-[65%] flex-wrap"
						>
							<span class="text-[10px] xs:text-[11px] flex-shrink-0">📍</span>
							<span
								class="font-medium text-gray-700 flex-1 min-w-0 text-left leading-tight break-words"
								title={activity.location}>{activity.location}</span
							>
						</button>
					</div>
				{/if}
			</div>
		</div>
	</div>
{/if}

<style>
	.activity-card {
		will-change: transform;
		transform: translateZ(0);
		box-sizing: border-box;
	}

	.activity-card * {
		text-rendering: optimizeLegibility;
		-webkit-font-smoothing: antialiased;
	}

	@reference '../../../app.css';

	/* Skinny phones (Galaxy, etc.) */
	@media (max-width: 400px) {
		.activity-card {
			font-size: 0.8rem;
			left: 0.125rem;
			padding: 0.25rem;
		}
	}

	/* Standard mobile */
	@media (min-width: 401px) and (max-width: 767px) {
		.activity-card {
			left: 0.25rem;
		}
	}

	/* Tablets use desktop layout */
	@media (min-width: 768px) {
		.activity-card {
			left: 0.375rem;
		}
	}

	.time-badges-container {
		@apply flex justify-between items-start gap-1 p-[0.1rem];
	}

	@media (min-width: 768px) {
		.time-badges-container {
			display: none;
		}
	}

	.time-badge-mobile {
		@apply bg-white/95 backdrop-blur-sm px-1.5 text-[9px] xs:text-[10px] font-bold text-gray-800 border border-gray-300/50 shadow-sm inline-flex items-center justify-center whitespace-nowrap;
		border-radius: 0.25rem;
		margin: 0;
		padding-top: 0.3rem;
		padding-bottom: 0.3rem;
		line-height: 1;
	}

	/* Override global button styles for mobile location button */
	.activity-card button.transition-location-button {
		font-size: 0.5625rem !important;
		padding: 0.25rem 0.375rem !important;
		min-height: auto !important;
	}

	@media (min-width: 400px) {
		.activity-card button.transition-location-button {
			font-size: 0.625rem !important;
		}
	}

	.activity-card {
		scrollbar-width: thin;
		scrollbar-color: rgba(0, 0, 0, 0.2) transparent;
	}

	.activity-card::-webkit-scrollbar {
		width: 4px;
		height: 4px;
	}

	.activity-card::-webkit-scrollbar-track {
		background: transparent;
	}

	.activity-card::-webkit-scrollbar-thumb {
		background-color: rgba(0, 0, 0, 0.2);
		border-radius: 2px;
	}

	.activity-card::-webkit-scrollbar-thumb:hover {
		background-color: rgba(0, 0, 0, 0.3);
	}
</style>

