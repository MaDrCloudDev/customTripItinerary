<script>
	import { generateEnhancedClientPDF } from '../utils/enhancedClientPDF.js';
	
	export let viewMode;
	export let dayIndex;
	
	async function handleClientPDF() {
		try {
			console.log('Starting client-side PDF generation with:', { viewMode, dayIndex });
			
			await generateEnhancedClientPDF({
				viewMode,
				dayIndex: dayIndex !== undefined ? dayIndex : undefined
			});
			
			console.log('Client-side PDF generated successfully');
		} catch (error) {
			console.error('Client-side PDF generation error:', error);
			alert(`PDF generation failed: ${error.message}`);
		}
	}
</script>

<button
	onclick={handleClientPDF}
	class="px-3 py-1.5 text-xs rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-medium hover:shadow-md hover:scale-105 transition-all duration-300"
>
	🖨️ PDF
</button>