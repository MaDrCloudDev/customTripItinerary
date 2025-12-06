<script lang="ts">
	import CruiseHeader from '../lib/components/CruiseHeader.svelte';
	import CruiseFooter from '../lib/components/CruiseFooter.svelte';
	
	let { error, status } = $props();

	const defaultCruiseInfo = {
		title: 'Cruise Itinerary',
		subtitle: 'Ancient Wonders of the Nile',
		bookingNumber: 'N/A',
		passengers: 'Guest',
		stateroom: 'N/A',
		dates: {
			start: '2025-01-15',
			end: '2025-01-27',
			totalDays: 13,
		},
	};
</script>

<svelte:head>
	<title>Error - Egypt Cruise Itinerary</title>
</svelte:head>

<div class="min-h-screen">
	<CruiseHeader cruiseInfo={defaultCruiseInfo} />
	
	<main class="container mx-auto px-6 py-8">
		<div class="bg-white/80 backdrop-blur-sm border border-red-400/50 rounded-3xl p-8 mb-8 shadow-xl shadow-red-400/40 text-center">
			<div class="text-6xl mb-4">⚠️</div>
			<h1 class="text-4xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent mb-4">
				Oops! Something went wrong
			</h1>
			<p class="text-xl text-gray-700 mb-6">
				We encountered an error while loading your cruise itinerary.
			</p>
			
			{#if error}
				<div class="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-left">
					<p class="text-red-700 font-semibold mb-2">Error {status}:</p>
					<p class="text-red-600 text-sm font-mono">{error.message}</p>
				</div>
			{/if}
			
			<div class="space-y-4">
				<button
					onclick={() => window.location.reload()}
					class="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
				>
					🔄 Try Again
				</button>
				
				<div class="text-sm text-gray-600">
					<p>If the problem persists, please contact support.</p>
				</div>
			</div>
		</div>
	</main>
	
	<CruiseFooter cruiseInfo={defaultCruiseInfo} />
</div>