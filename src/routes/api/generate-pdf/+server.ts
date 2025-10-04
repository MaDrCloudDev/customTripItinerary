import { generatePDF } from '../../../lib/utils/pdfGenerator.js';
import { json } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit';

export async function POST({ request, url }: RequestEvent) {
	try {
		const { viewMode, dayIndex, format } = await request.json();

		// Build the base URL for the current app
		const baseUrl = new URL('/', url.origin);

		const pdfBuffer = await generatePDF(baseUrl.toString(), {
			viewMode,
			dayIndex,
			format: format || 'A4',
		});

		return new Response(new Uint8Array(pdfBuffer), {
			headers: {
				'Content-Type': 'application/pdf',
				'Content-Disposition': `attachment; filename="itinerary-${viewMode}${
					dayIndex !== undefined ? `-day-${dayIndex + 1}` : ''
				}.pdf"`,
			},
		});
	} catch (error) {
		console.error('PDF generation error:', error);
		return json({ error: 'Failed to generate PDF' }, { status: 500 });
	}
}
