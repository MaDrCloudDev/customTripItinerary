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
		class="flex items-start gap-6 {colorClass} rounded-2xl p-6 border shadow-lg relative z-10 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
	>
		<div
			class="text-center min-w-32 bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/40 shadow-sm"
		>
			<div class="text-lg font-bold text-gray-800 mb-2">
				{formatTime(slot.startTime)}
			</div>
			<div class="text-sm font-medium text-gray-600 mb-2">↓</div>
			<div class="text-lg font-bold text-gray-800 mb-3">
				{formatTime(slot.endTime)}
			</div>
			<div
				class="text-sm bg-white/70 rounded-full px-3 py-1 font-bold text-gray-700 border"
			>
				{duration}
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
				<div class="space-y-3 mt-4 pt-4 border-t border-white/40">
					{#if slot.location}
						<button
							onclick={() => openGoogleMaps(slot.location!)}
							class="bg-blue-100/60 backdrop-blur-sm rounded-xl p-4 border-2 border-blue-300 hover:bg-blue-200/80 hover:border-blue-500 transition-all duration-300 cursor-pointer text-left w-full transform hover:scale-[1.02] shadow-md hover:shadow-lg"
						>
							<div class="flex items-center gap-2">
								<span class="text-lg">📍</span>
								<div class="flex-1">
									<div class="text-sm font-bold text-blue-800 mb-1">
										Location
									</div>
									<div class="text-base font-semibold text-blue-900">
										{slot.location}
									</div>
								</div>
								<span
									class="text-sm font-bold bg-blue-200 px-3 py-1 rounded-full text-blue-800 flex items-center gap-1"
									>View Map <span class="text-xs">↗</span></span
								>
							</div>
						</button>
					{/if}
					{#if slot.cost}
						<div
							class="bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-white/40"
						>
							<div class="flex items-center gap-2">
								<span class="text-lg">💰</span>
								<div>
									<div class="text-sm font-bold text-gray-700 mb-1">
										Cost
									</div>
									<div class="text-base font-semibold text-gray-800">
										{slot.cost}
									</div>
								</div>
							</div>
						</div>
					{/if}
					{#if slot.notes}
						<div
							class="bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-white/40"
						>
							<div class="flex items-start gap-2">
								<span class="text-lg">📝</span>
								<div>
									<div class="text-sm font-bold text-gray-700 mb-1">
										Notes
									</div>
									<div
										class="text-base font-semibold text-gray-800 leading-relaxed"
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
