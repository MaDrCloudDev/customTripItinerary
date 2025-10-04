<script>
	export let viewMode;
	export let dayIndex;
	
	async function handlePuppeteerPrint() {
		try {
			const response = await fetch('/api/generate-pdf', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ viewMode, dayIndex })
			});
			
			if (response.ok) {
				const blob = await response.blob();
				const url = URL.createObjectURL(blob);
				const a = document.createElement('a');
				a.href = url;
				a.download = `itinerary-${viewMode}${dayIndex ? `-day-${dayIndex + 1}` : ''}.pdf`;
				a.click();
				URL.revokeObjectURL(url);
			}
		} catch (error) {
			console.error('PDF generation failed:', error);
			window.print(); // Fallback
		}
	}
</script>

<button
	onclick={handlePuppeteerPrint}
	class="px-3 py-1.5 text-xs rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-medium hover:shadow-md hover:scale-105 transition-all duration-300"
>
	🖨️ PDF
</button>