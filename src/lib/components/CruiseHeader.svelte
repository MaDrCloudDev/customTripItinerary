<script lang="ts">
	import type { CruiseInfo } from '../../app.d.ts';
	import InfoCard from './InfoCard.svelte';

	interface Props {
		cruiseInfo: CruiseInfo;
	}

	let { cruiseInfo }: Props = $props();
</script>

<header
	class="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-emerald-600"
>
	<div class="absolute inset-0 opacity-10">
		<div class="absolute top-10 left-10 text-6xl">🏺</div>
		<div class="absolute top-20 right-20 text-4xl">🐪</div>
		<div class="absolute bottom-10 left-1/4 text-5xl">🏛️</div>
		<div class="absolute bottom-20 right-1/3 text-3xl">🌅</div>
	</div>

	<div class="relative container mx-auto px-6 py-8 text-center">
		<div class="mb-6">
			<div class="inline-flex items-center gap-4 mb-4">
				<div
					class="w-16 h-0.5 bg-gradient-to-r from-transparent to-amber-500"
				></div>
				<span class="text-4xl">🚢</span>
				<div
					class="w-16 h-0.5 bg-gradient-to-l from-transparent to-amber-500"
				></div>
			</div>
			<h1
				class="text-3xl md:text-4xl font-bold text-white drop-shadow-lg mb-3"
			>
				{cruiseInfo.title}
			</h1>
			<p class="text-lg md:text-xl text-blue-100 font-medium mb-6">
				{cruiseInfo.subtitle}
			</p>
		</div>

		<div
			class="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto"
		>
			<InfoCard
				icon="📋"
				label="Booking Number"
				value={cruiseInfo.bookingNumber}
			/>
			<InfoCard
				icon="👥"
				label="Travelers"
				value={cruiseInfo.passengers}
			/>
			<InfoCard
				icon="🏠"
				label="Stateroom"
				value={cruiseInfo.stateroom}
			/>
		</div>
	</div>
</header>
