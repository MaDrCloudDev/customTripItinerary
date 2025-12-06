<script lang="ts">
	import { openGoogleMaps } from '../../utils/mapsUtils.js';

	interface Props {
		dayNumber: number;
		dayName: string;
		location: string;
	}

	let { dayNumber, dayName, location }: Props = $props();
</script>

<div class="text-center mb-4 md:mb-8">
	<h2
		class="text-2xl md:text-3xl font-bold gradient-text-primary mb-1 md:mb-2"
	>
		⏰ Day {dayNumber} Timeline
	</h2>
	<p class="text-lg md:text-xl text-gray-700 font-medium mb-1.5 md:mb-2">
		{dayName}
	</p>

	<div class="flex justify-center">
		<button
			onclick={() => openGoogleMaps(location)}
			class="location-badge text-sm md:text-base"
		>
			<span class="text-lg md:text-xl">📍</span>
			<span class="text-base md:text-lg">{location}</span>
			<span class="text-xs md:text-sm font-bold">View Map ↗</span>
		</button>
	</div>
</div>
