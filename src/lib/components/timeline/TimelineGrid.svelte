<script lang="ts">
	import type { TimeSlot } from '../../../app.d.ts';
	import TimelineHourLabel from './TimelineHourLabel.svelte';
	import TimelineActivityCard from './TimelineActivityCard.svelte';

	interface Props {
		activities: TimeSlot[];
	}

	let { activities }: Props = $props();

	const hours = Array.from({ length: 18 }, (_, i) => i + 6);
</script>

<div
	class="relative bg-white/50 rounded-xl md:rounded-2xl border-0 md:border-2 border-blue-200 overflow-hidden timeline-grid"
>
	<div class="flex">
		<div class="w-10 xs:w-12 md:w-20 flex-shrink-0 bg-blue-50 border-r border-r-blue-200 md:border-r-0">
			{#each hours as hour}
				<TimelineHourLabel {hour} />
			{/each}
		</div>

		<div class="flex-1 relative min-h-0">
			{#each hours as _, i}
				<div
					class="timeline-hour border-b border-gray-200 {i % 2 === 0
						? 'bg-gray-50/30'
						: 'bg-white/30'} relative h-[48px]"
				>
					<div class="absolute left-0 top-0 w-full h-px bg-gray-300/40"></div>
				</div>
			{/each}

			{#each activities as activity}
				<TimelineActivityCard {activity} />
			{/each}
		</div>
	</div>
</div>

<style>
	.timeline-grid {
		position: relative;
		transform: translateZ(0);
		overflow: hidden;
	}

	.timeline-hour {
		height: 48px !important;
		box-sizing: border-box;
		flex-shrink: 0;
	}

	/* Prevent horizontal scrolling on small screens */
	@media (max-width: 640px) {
		.timeline-grid {
			overflow-x: auto;
			-webkit-overflow-scrolling: touch;
		}
	}
</style>
