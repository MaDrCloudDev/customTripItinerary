<script lang="ts">
	import type { CruiseInfo } from '../types/itinerary.js';
	import { formatDate } from '../utils/dateUtils.js';

	interface Props {
		cruiseInfo: CruiseInfo;
	}

	let { cruiseInfo }: Props = $props();
</script>

<!-- Elegant Footer -->
<footer class="text-center py-8 bg-gradient-to-r from-rose-400 via-pink-400 to-purple-500 border-t border-rose-300/50">
	<div class="container mx-auto px-6">
		<div class="inline-flex items-center gap-4 mb-4">
			<div class="w-16 h-0.5 bg-gradient-to-r from-transparent to-white/60"></div>
			<span class="text-2xl">🏺</span>
			<div class="w-16 h-0.5 bg-gradient-to-l from-transparent to-white/60"></div>
		</div>
		<p class="text-lg font-semibold text-white drop-shadow-sm mb-2">
			Viking Egypt Cruise Itinerary
		</p>
		<p class="text-rose-100 font-medium">
			Generated for {cruiseInfo.passengers}
		</p>
		<p class="text-rose-100 text-sm">
			Booking #{cruiseInfo.bookingNumber} • Stateroom {cruiseInfo.stateroom}
		</p>
		<p class="text-rose-100 text-sm mt-2">
			🚢 {formatDate(cruiseInfo.dates.start)} to {formatDate(cruiseInfo.dates.end)} 🚢
		</p>
	</div>
</footer>