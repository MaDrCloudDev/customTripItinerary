<script lang="ts">
	// This component provides additional print optimizations
	// and can be used to show print preview or print tips
	
	interface Props {
		currentView: 'single' | 'timeline' | 'overview';
	}
	
	let { currentView }: Props = $props();
	
	// Print mode toggle
	let useSimplePrint = $state(false);
	
	// Show print tips based on current view
	const getPrintTips = (view: string) => {
		switch(view) {
			case 'single':
				return "Single day view prints best in portrait orientation with detailed activity cards.";
			case 'timeline':
				return "Timeline view prints in a compact hourly format, great for quick reference.";
			case 'overview':
				return "Overview prints all days in a grid format - best for getting the big picture.";
			default:
				return "Choose your preferred view and click print for optimized single-page printing.";
		}
	};

	// Toggle print mode
	const togglePrintMode = () => {
		useSimplePrint = !useSimplePrint;
		
		// Add or remove class to body for print mode switching
		if (useSimplePrint) {
			document.body.classList.add('simple-print-mode');
		} else {
			document.body.classList.remove('simple-print-mode');
		}
	};
</script>

<!-- Print Tips (hidden on print) -->
<div class="no-print bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
	<div class="flex items-center justify-between">
		<div class="flex items-center gap-2 text-sm text-blue-800">
			<span>🖨️</span>
			<span class="font-medium">Print Tip:</span>
			<span>{getPrintTips(currentView)}</span>
		</div>
		
		<div class="flex items-center gap-2">
			<label class="text-xs text-blue-700 font-medium">
				<input 
					type="checkbox" 
					bind:checked={useSimplePrint}
					onchange={togglePrintMode}
					class="mr-1"
				/>
				Simple Print Mode
			</label>
		</div>
	</div>
	
	{#if useSimplePrint}
		<div class="mt-2 text-xs text-blue-600">
			📌 Simple mode uses basic CSS for better compatibility if print preview hangs.
		</div>
	{/if}
</div>

<!-- Additional print-specific styles -->
<style>
	:global(.printing) {
		/* Additional styles when printing class is active */
		overflow: hidden !important;
	}
	
	:global(.printing *) {
		/* Ensure all text remains readable */
		color: black !important;
		background: white !important;
	}
	
	:global(.printing .bg-gradient-to-br) {
		/* Override gradients specifically */
		background: #f8f9fa !important;
		border: 1px solid #ccc !important;
	}
</style>