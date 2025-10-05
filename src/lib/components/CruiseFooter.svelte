<script lang="ts">
	import type { CruiseInfo } from '../../app.d.ts';
	import { formatDate } from '../utils/dateUtils.js';

	interface Props {
		cruiseInfo: CruiseInfo;
	}

	let { cruiseInfo }: Props = $props();
</script>

<footer
	class="text-center py-8 bg-gradient-to-r from-blue-600 via-blue-700 to-emerald-600 border-t border-blue-500/50"
>
	<div class="container mx-auto px-6">
		<div class="inline-flex items-center gap-4 mb-4">
			<div
				class="w-16 h-0.5 bg-gradient-to-r from-transparent to-white/60"
			></div>
			<span class="text-2xl">🏺</span>
			<div
				class="w-16 h-0.5 bg-gradient-to-l from-transparent to-white/60"
			></div>
		</div>
		<p class="text-lg font-semibold text-white drop-shadow-sm mb-2">
			Viking Egypt Cruise Itinerary
		</p>
		<p class="text-blue-100 font-medium">
			{cruiseInfo.passengers}
		</p>
		<p class="text-blue-100 text-sm">
			Booking #{cruiseInfo.bookingNumber} • Stateroom {cruiseInfo.stateroom}
		</p>
		<p class="text-blue-100 text-sm mt-2">
			🚢 {formatDate(cruiseInfo.dates.start)} - {formatDate(
				cruiseInfo.dates.end
			)} 🚢
		</p>
		<p class="text-blue-200/70 text-xs mt-1">
			Made by <a
				href="https://github.com/madrclouddev"
				target="_blank"
				rel="noopener noreferrer"
				class="hover:text-white transition-colors underline decoration-dotted"
				>MaDrCloudDev</a
			>
		</p>
	</div>
</footer>
