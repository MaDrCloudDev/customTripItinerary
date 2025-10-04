<script lang="ts">
	import type { TimeSlot } from '../types/itinerary.js';
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
</script>

<div class="relative">
	{#if showConnector}
		<div
			class="absolute left-20 top-full w-0.5 h-4 bg-gradient-to-b from-amber-300 to-orange-300 z-0"
		></div>
	{/if}

	<div
		class="flex items-start gap-6 {getColorClass(
			slot
		)} rounded-2xl p-6 border shadow-lg relative z-10 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
	>
		<div
			class="text-center min-w-28 bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/40 shadow-sm"
		>
			<div class="text-base font-bold">
				{formatTime(slot.startTime)}
			</div>
			<div class="text-xs opacity-70 my-1">to</div>
			<div class="text-base font-bold">
				{formatTime(slot.endTime)}
			</div>
			<div
				class="text-xs mt-2 bg-white/50 rounded-full px-2 py-1 font-medium"
			>
				{calculateDuration(slot.startTime, slot.endTime)}
			</div>
		</div>

		<div class="flex-1">
			<div class="flex items-start gap-4 mb-4">
				<span class="text-3xl drop-shadow-sm">{slot.icon}</span>
				<div class="flex-1">
					<h3 class="text-xl font-bold leading-tight mb-2">
						{slot.activity}
					</h3>
					<p class="text-base leading-relaxed opacity-90">
						{slot.description}
					</p>
				</div>
			</div>

			{#if slot.location || slot.cost || slot.notes}
				<div
					class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 pt-4 border-t border-white/40"
				>
					{#if slot.location}
						<button
							onclick={() => openGoogleMaps(slot.location!)}
							class="bg-blue-100/60 backdrop-blur-sm rounded-xl p-3 border-2 border-blue-300 hover:bg-blue-200/80 hover:border-blue-500 transition-all duration-300 cursor-pointer text-left w-full transform hover:scale-105 shadow-md hover:shadow-lg"
						>
							<div class="text-xs font-bold text-blue-800 mb-1">
								📍 Location
							</div>
							<div
								class="text-sm font-semibold flex items-center gap-1 text-blue-900"
							>
								{slot.location}
								<span
									class="text-xs font-bold bg-blue-200 px-1 py-0.5 rounded text-blue-800 flex items-center gap-1"
									>View Map <span class="text-xs">↗</span></span
								>
							</div>
						</button>
					{/if}
					{#if slot.cost}
						<div
							class="bg-white/40 backdrop-blur-sm rounded-xl p-3 border border-white/30"
						>
							<div class="text-xs font-bold opacity-80 mb-1">
								💰 Cost
							</div>
							<div class="text-sm font-semibold">{slot.cost}</div>
						</div>
					{/if}
					{#if slot.notes}
						<div
							class="bg-white/40 backdrop-blur-sm rounded-xl p-3 border border-white/30"
						>
							<div class="text-xs font-bold opacity-80 mb-1">
								📝 Notes
							</div>
							<div class="text-sm font-semibold">{slot.notes}</div>
						</div>
					{/if}
				</div>
			{/if}
		</div>
	</div>
</div>
