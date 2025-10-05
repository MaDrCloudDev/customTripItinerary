<script lang="ts">
	interface TimeSlot {
		time: string;
		activity: string;
		description: string;
		location?: string;
		duration?: string;
		type:
			| 'free'
			| 'excursion'
			| 'preparation'
			| 'cultural'
			| 'departure';
		color?: 'excursion' | 'dining' | 'cultural' | 'nature' | 'free';
		icon: string;
		cost?: string;
	}

	interface Props {
		timeSlot: TimeSlot;
		slotName: string;
	}

	let { timeSlot, slotName }: Props = $props();

	const colorClasses = {
		excursion: 'bg-blue-600 border-blue-700 text-white',
		dining: 'bg-orange-600 border-orange-700 text-white',
		cultural: 'bg-yellow-500 border-yellow-600 text-black',
		nature: 'bg-green-600 border-green-700 text-white',
		free: 'bg-gray-100 border-gray-400 text-gray-800',
	};

	const getColorClass = (slot: TimeSlot) => {
		if (slot.color) {
			return colorClasses[slot.color];
		}
		if (slot.type === 'excursion') return colorClasses.excursion;
		if (slot.type === 'cultural') return colorClasses.cultural;
		return colorClasses.free;
	};
</script>

<div
	class="time-slot border-4 rounded-lg p-6 mb-4 {getColorClass(
		timeSlot
	)} activity-{timeSlot.color || timeSlot.type}"
>
	<div class="flex items-center justify-between mb-4">
		<h3 class="text-2xl font-bold uppercase tracking-wide">
			{slotName}
		</h3>
		<span class="text-xl font-semibold">{timeSlot.time}</span>
	</div>

	<div class="flex items-start gap-4 mb-3">
		<span
			class="text-4xl"
			role="img"
			aria-label="Activity icon">{timeSlot.icon}</span
		>
		<div class="flex-1">
			<h4 class="text-xl font-bold leading-tight mb-2">
				{timeSlot.activity}
			</h4>
			<p class="text-lg leading-relaxed">
				{timeSlot.description}
			</p>
		</div>
	</div>

	{#if timeSlot.location || timeSlot.duration || timeSlot.cost}
		<div class="mt-4 pt-4 border-t-2 border-current opacity-70">
			<div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-base">
				{#if timeSlot.location}
					<div class="flex items-center gap-2">
						<span class="font-semibold">📍 Location:</span>
						<span>{timeSlot.location}</span>
					</div>
				{/if}
				{#if timeSlot.duration}
					<div class="flex items-center gap-2">
						<span class="font-semibold">⏱️ Duration:</span>
						<span>{timeSlot.duration}</span>
					</div>
				{/if}
				{#if timeSlot.cost}
					<div class="flex items-center gap-2">
						<span class="font-semibold">💰 Cost:</span>
						<span class="font-bold">{timeSlot.cost}</span>
					</div>
				{/if}
			</div>
		</div>
	{/if}
</div>
