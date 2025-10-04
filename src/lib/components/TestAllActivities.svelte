<script>
	export let currentDay;
</script>

<div class="test-all-activities p-4 bg-white">
	<h2 class="text-xl font-bold mb-4">All Activities for {currentDay.dayName}</h2>
	<p class="text-sm text-gray-600 mb-4">Total activities: {currentDay.timeSlots.length}</p>
	
	<div class="space-y-2">
		{#each currentDay.timeSlots as slot, index}
			<div class="border p-2 rounded bg-gray-50">
				<div class="font-semibold text-sm">
					{index + 1}. {slot.startTime} - {slot.endTime}
				</div>
				<div class="text-sm">{slot.activity}</div>
				<div class="text-xs text-gray-600">{slot.description}</div>
			</div>
		{/each}
	</div>
</div>