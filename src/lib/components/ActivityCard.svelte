<script lang="ts">
	import type { TimeSlot } from '../../app.d.ts';
	import {
		formatTime,
		calculateDuration,
	} from '../utils/dateUtils.js';
	import { getColorClass } from '../utils/styleUtils.js';
	import { openGoogleMaps } from '../utils/mapsUtils.js';

	interface Props {
		slot: TimeSlot;
		showConnector?: boolean;
	}

	let { slot, showConnector = false }: Props = $props();

	const duration = $derived(
		calculateDuration(slot.startTime, slot.endTime)
	);
	const colorClass = $derived(getColorClass(slot));
</script>

<div class="relative">
	{#if showConnector}
		<div
			class="absolute left-20 top-full w-0.5 h-4 bg-gradient-to-b from-amber-300 to-orange-300 z-0"
		></div>
	{/if}

	<div
		class="flex flex-col md:flex-row items-start gap-4 md:gap-6 {colorClass} rounded-2xl p-4 md:p-6 border shadow-lg relative z-10 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
	>
		<div
			class="w-full md:w-auto text-center md:min-w-32 bg-white/60 backdrop-blur-sm rounded-xl p-3 md:p-4 border border-white/40 shadow-sm flex md:flex-col items-center md:items-stretch justify-around md:justify-start gap-2 md:gap-0"
		>
			<div class="flex flex-col md:block">
				<div class="text-base md:text-lg font-bold text-gray-800 md:mb-2">
					{formatTime(slot.startTime)}
				</div>
				<div class="text-xs md:text-sm font-medium text-gray-600 md:mb-2">↓</div>
				<div class="text-base md:text-lg font-bold text-gray-800 md:mb-3">
					{formatTime(slot.endTime)}
				</div>
			</div>
			<div
				class="text-xs md:text-sm bg-white/70 rounded-full px-3 py-1 font-bold text-gray-700 border whitespace-nowrap"
			>
				{duration}
			</div>
		</div>

		<div class="flex-1 w-full md:w-auto min-w-0">
			<div class="flex items-start gap-3 md:gap-4 mb-3 md:mb-4">
				<span class="text-2xl md:text-3xl drop-shadow-sm flex-shrink-0">{slot.icon}</span>
				<div class="flex-1 min-w-0 overflow-hidden">
					<h3 class="text-lg md:text-xl font-bold leading-tight mb-1 md:mb-2 break-words overflow-wrap-anywhere">
						{slot.activity}
					</h3>
					<p class="text-sm md:text-base leading-relaxed opacity-90 break-words overflow-wrap-anywhere">
						{slot.description}
					</p>
				</div>
			</div>

			{#if slot.location || slot.cost || slot.notes}
				<div class="space-y-2 md:space-y-3 mt-3 md:mt-4 pt-3 md:pt-4 border-t border-white/40">
					{#if slot.location}
						<button
							onclick={() => openGoogleMaps(slot.location!)}
							class="bg-blue-100/60 backdrop-blur-sm rounded-xl p-3 md:p-4 border-2 border-blue-300 hover:bg-blue-200/80 hover:border-blue-500 transition-all duration-300 cursor-pointer text-left w-full transform hover:scale-[1.02] shadow-md hover:shadow-lg"
						>
							<div class="flex items-start md:items-center gap-2 flex-wrap">
								<span class="text-base md:text-lg flex-shrink-0">📍</span>
								<div class="flex-1 min-w-0">
									<div class="text-xs md:text-sm font-bold text-blue-800 mb-0.5 md:mb-1">
										Location
									</div>
									<div class="text-sm md:text-base font-semibold text-blue-900 break-words">
										{slot.location}
									</div>
								</div>
								<span
									class="text-xs md:text-sm font-bold bg-blue-200 px-2 md:px-3 py-1 rounded-full text-blue-800 flex items-center gap-1 whitespace-nowrap"
									>View Map <span class="text-xs">↗</span></span
								>
							</div>
						</button>
					{/if}
					{#if slot.cost}
						<div
							class="bg-white/50 backdrop-blur-sm rounded-xl p-3 md:p-4 border border-white/40"
						>
							<div class="flex items-center gap-2">
								<span class="text-base md:text-lg flex-shrink-0">💰</span>
								<div class="min-w-0">
									<div class="text-xs md:text-sm font-bold text-gray-700 mb-0.5 md:mb-1">
										Cost
									</div>
									<div class="text-sm md:text-base font-semibold text-gray-800">
										{slot.cost}
									</div>
								</div>
							</div>
						</div>
					{/if}
					{#if slot.notes}
						<div
							class="bg-white/50 backdrop-blur-sm rounded-xl p-3 md:p-4 border border-white/40"
						>
							<div class="flex items-start gap-2">
								<span class="text-base md:text-lg flex-shrink-0">📝</span>
								<div class="min-w-0 flex-1">
									<div class="text-xs md:text-sm font-bold text-gray-700 mb-0.5 md:mb-1">
										Notes
									</div>
									<div
										class="text-sm md:text-base font-semibold text-gray-800 leading-relaxed break-words"
									>
										{slot.notes}
									</div>
								</div>
							</div>
						</div>
					{/if}
				</div>
			{/if}
		</div>
	</div>
</div>

<style>
	.overflow-wrap-anywhere {
		overflow-wrap: anywhere;
		word-wrap: anywhere;
		word-break: break-word;
	}

	/* Mobile-specific text handling */
	@media (max-width: 768px) {
		h3, p {
			word-break: break-word;
			overflow-wrap: break-word;
			hyphens: auto;
			-webkit-hyphens: auto;
			-moz-hyphens: auto;
		}
	}
</style>
