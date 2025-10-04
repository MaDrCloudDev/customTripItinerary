/**
 * Client-side PDF generation utilities
 * Handles PDF downloads without relying on browser print styles
 */

export interface PDFDownloadOptions {
	viewMode: 'single' | 'timeline' | 'overview';
	dayIndex?: number;
	format?: 'A4' | 'Letter';
}

/**
 * Download PDF for current view
 */
export async function downloadPDF(
	options: PDFDownloadOptions
): Promise<void> {
	try {
		const response = await fetch('/api/generate-pdf', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(options),
		});

		if (!response.ok) {
			throw new Error(
				`PDF generation failed: ${response.statusText}`
			);
		}

		// Create blob and download
		const blob = await response.blob();
		const url = URL.createObjectURL(blob);

		const a = document.createElement('a');
		a.href = url;
		a.download = `itinerary-${options.viewMode}${
			options.dayIndex !== undefined
				? `-day-${options.dayIndex + 1}`
				: ''
		}.pdf`;

		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);

		URL.revokeObjectURL(url);
	} catch (error) {
		console.error('Error downloading PDF:', error);
		throw error;
	}
}

/**
 * Download PDF for current day
 */
export async function downloadDayPDF(
	dayIndex: number,
	viewMode: 'single' | 'timeline' = 'single'
): Promise<void> {
	return downloadPDF({ viewMode, dayIndex });
}

/**
 * Download overview PDF
 */
export async function downloadOverviewPDF(): Promise<void> {
	return downloadPDF({ viewMode: 'overview' });
}
