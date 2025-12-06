<script lang="ts">
	import type { DaySchedule } from '../../../app.d.ts';
	import TimelineHeader from './TimelineHeader.svelte';
	import TimelineLegend from './TimelineLegend.svelte';
	import TimelineGrid from './TimelineGrid.svelte';

	interface Props {
		currentDay: DaySchedule;
	}

	let { currentDay }: Props = $props();
</script>

<div
	class="card-container-blue -mx-2 xs:-mx-1 md:mx-0 border-0 xs:border"
>
	<TimelineHeader
		dayNumber={currentDay.dayNumber}
		dayName={currentDay.dayName}
		location={currentDay.location}
	/>

	<TimelineLegend />
	<div class="w-full mx-auto">
		<TimelineGrid activities={currentDay.timeSlots} />

		<div class="mt-3 md:mt-6 text-center">
			<p class="text-gray-600 text-sm md:text-base mb-1 md:mb-2">
				📍 Click location badges to view on map
			</p>
			<p class="text-gray-500 text-xs md:text-sm">
				Each hour block shows the time progression of your day • Times shown are
				local Egyptian time
			</p>
		</div>
	</div>
</div>
