<script lang="ts">
	interface Props {
		hour: number;
	}

	let { hour }: Props = $props();

	let formattedTime = $derived(
		hour === 12
			? '12 PM'
			: hour > 12
				? `${hour - 12} PM`
				: hour === 0
					? '12 AM'
					: `${hour} AM`
	);
</script>

<div
	class="timeline-hour flex items-start justify-center pt-1 px-0 border-r-0 md:border-r-2 border-r-blue-300 border-b border-b-gray-200 relative h-[48px]"
>
	<div
		class="bg-blue-600 text-white rounded xs:px-1 md:px-2 py-0.5 md:py-1 text-[9px] xs:text-[10px] md:text-xs font-bold min-w-[35px] xs:min-w-[40px] md:min-w-[50px] text-center mx-auto"
	>
		{formattedTime}
	</div>
</div>

<style>
	.timeline-hour {
		height: 48px !important;
		box-sizing: border-box;
		flex-shrink: 0;
	}
</style>
