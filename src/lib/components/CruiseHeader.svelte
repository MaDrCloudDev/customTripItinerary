<script lang="ts">
	import type { CruiseInfo, ViewMode } from '../types/itinerary.js';

	interface Props {
		cruiseInfo: CruiseInfo;
	}

	let { cruiseInfo }: Props = $props();
</script>

<!-- Elegant Header -->
<header class="relative overflow-hidden bg-gradient-to-br from-rose-400 via-pink-400 to-purple-500 no-print">
	<!-- Decorative background pattern -->
	<div class="absolute inset-0 opacity-10">
		<div class="absolute top-10 left-10 text-6xl">🏺</div>
		<div class="absolute top-20 right-20 text-4xl">🐪</div>
		<div class="absolute bottom-10 left-1/4 text-5xl">🏛️</div>
		<div class="absolute bottom-20 right-1/3 text-3xl">🌅</div>
	</div>
	
	<div class="relative container mx-auto px-6 py-8 text-center">
		<!-- Elegant title section -->
		<div class="mb-6">
			<div class="inline-flex items-center gap-4 mb-4">
				<div class="w-16 h-0.5 bg-gradient-to-r from-transparent to-amber-500"></div>
				<span class="text-4xl">🚢</span>
				<div class="w-16 h-0.5 bg-gradient-to-l from-transparent to-amber-500"></div>
			</div>
			<h1 class="text-3xl md:text-4xl font-bold text-white drop-shadow-lg mb-3">
				{cruiseInfo.title}
			</h1>
			<p class="text-lg md:text-xl text-rose-100 font-medium mb-6">
				{cruiseInfo.subtitle}
			</p>
		</div>
		

		
		<!-- Elegant info cards -->
		<div class="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
			<div class="bg-white/20 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/30">
				<div class="text-2xl mb-2">📋</div>
				<div class="text-sm text-rose-100 font-medium">Booking Number</div>
				<div class="text-lg font-bold text-white">{cruiseInfo.bookingNumber}</div>
			</div>
			<div class="bg-white/20 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/30">
				<div class="text-2xl mb-2">👥</div>
				<div class="text-sm text-rose-100 font-medium">Travelers</div>
				<div class="text-lg font-bold text-white">{cruiseInfo.passengers}</div>
			</div>
			<div class="bg-white/20 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/30">
				<div class="text-2xl mb-2">🏠</div>
				<div class="text-sm text-rose-100 font-medium">Stateroom</div>
				<div class="text-lg font-bold text-white">{cruiseInfo.stateroom}</div>
			</div>
		</div>
	</div>
</header>