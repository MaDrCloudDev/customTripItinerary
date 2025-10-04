/**
 * Enhanced print utilities with multiple PDF generation options
 */

import {
	downloadDayPDF,
	downloadOverviewPDF,
} from './pdfDownload.js';
import { generateSmartPDF } from './clientPDF.js';

export type PrintMethod = 'puppeteer' | 'client' | 'browser';

export interface PrintOptions {
	method?: PrintMethod;
	viewMode: 'single' | 'timeline' | 'overview';
	dayIndex?: number;
}

/**
 * Smart print function that tries multiple methods
 */
export async function smartPrint(
	options: PrintOptions
): Promise<void> {
	const { method = 'puppeteer', viewMode, dayIndex } = options;

	try {
		switch (method) {
			case 'puppeteer':
				if (viewMode === 'overview') {
					await downloadOverviewPDF();
				} else if (dayIndex !== undefined) {
					await downloadDayPDF(dayIndex, viewMode);
				}
				break;

			case 'client':
				const filename =
					viewMode === 'overview'
						? 'itinerary-overview.pdf'
						: `itinerary-${viewMode}-day-${(dayIndex || 0) + 1}.pdf`;
				await generateSmartPDF(undefined, filename);
				break;

			case 'browser':
			default:
				window.print();
				break;
		}
	} catch (error) {
		console.error(`${method} print failed:`, error);

		// Fallback chain: puppeteer -> client -> browser
		if (method === 'puppeteer') {
			console.log('Falling back to client-side PDF generation...');
			await smartPrint({ ...options, method: 'client' });
		} else if (method === 'client') {
			console.log('Falling back to browser print...');
			window.print();
		} else {
			throw error;
		}
	}
}
