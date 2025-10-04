/**
 * PDF Generation utility using Puppeteer
 * Generates print-perfect PDFs without relying on CSS print styles
 */

import puppeteer from 'puppeteer';
import type { ViewMode } from '../types/itinerary.js';

export interface PDFOptions {
	viewMode: ViewMode;
	dayIndex?: number;
	format?: 'A4' | 'Letter';
	scale?: number;
}

/**
 * Generate PDF for a specific view
 */
export async function generatePDF(
	baseUrl: string,
	options: PDFOptions
): Promise<Buffer> {
	const browser = await puppeteer.launch({
		headless: true,
		args: ['--no-sandbox', '--disable-setuid-sandbox'],
	});

	try {
		const page = await browser.newPage();

		// Set a large viewport to capture all content
		await page.setViewport({
			width: 1200, // Wide enough for most content
			height: 3000, // Tall enough to avoid truncation
			deviceScaleFactor: 1,
		});

		// Build URL with parameters
		const url = new URL(baseUrl);
		url.searchParams.set('viewMode', options.viewMode);
		if (options.dayIndex !== undefined) {
			url.searchParams.set('dayIndex', options.dayIndex.toString());
		}
		url.searchParams.set('printMode', 'true');

		await page.goto(url.toString(), {
			waitUntil: 'networkidle0',
			timeout: 30000,
		});

		// Wait for content to load and stabilize
		await page.waitForFunction(
			() => document.readyState === 'complete'
		);

		// Wait for Svelte components to finish rendering
		await new Promise((resolve) => setTimeout(resolve, 2000));

		// Wait for any remaining layout shifts
		await page.waitForFunction(
			() => {
				const main = document.querySelector('main');
				return main && main.scrollHeight > 200; // Ensure we have substantial content
			},
			{ timeout: 5000 }
		);

		// Measure and prepare content for PDF
		const contentInfo = await page.evaluate(() => {
			// Hide navigation, footer, and non-essential elements
			const elementsToHide = document.querySelectorAll(
				'.no-print, nav, footer, button:not(.print-button)'
			);
			elementsToHide.forEach((el) => {
				(el as HTMLElement).style.display = 'none';
			});

			// Get the main content
			const main = document.querySelector('main');
			if (!main) return { height: 0, width: 0, activityCount: 0 };

			// Force body and html to allow full content
			document.body.style.height = 'auto';
			document.documentElement.style.height = 'auto';

			// Force the main content and all children to show full content
			main.style.height = 'auto';
			main.style.maxHeight = 'none';
			main.style.overflow = 'visible';

			// Remove height constraints from all descendant elements
			const allElements = main.querySelectorAll('*');
			allElements.forEach((el) => {
				const htmlEl = el as HTMLElement;
				htmlEl.style.height = 'auto';
				htmlEl.style.maxHeight = 'none';
				htmlEl.style.overflow = 'visible';
			});

			// Special handling for overview grid
			const overviewGrid = main.querySelector(
				'.overview-grid, .grid'
			);
			if (overviewGrid) {
				(overviewGrid as HTMLElement).style.display = 'grid';
				(overviewGrid as HTMLElement).style.gridTemplateColumns =
					'repeat(2, 1fr)';
				(overviewGrid as HTMLElement).style.gap = '1rem';
				(overviewGrid as HTMLElement).style.width = '100%';
			}

			// Force layout recalculation
			main.offsetHeight;

			// Count activities to verify we're getting all content
			const activityCards = main.querySelectorAll(
				'.bg-white.border, [class*="ActivityCard"], [class*="TimeSlot"]'
			);
			const timeSlots = main.querySelectorAll(
				'[class*="slot"], .space-y-4 > div, .space-y-6 > div'
			);
			// Also check for overview grid items
			const overviewCards = main.querySelectorAll(
				'.overview-grid > div, .grid > div, [class*="day-card"]'
			);

			const contentHeight = Math.max(
				main.scrollHeight,
				main.offsetHeight
			);
			const contentWidth = Math.max(
				main.scrollWidth,
				main.offsetWidth
			);

			return {
				height: contentHeight,
				width: contentWidth,
				activityCount: Math.max(
					activityCards.length,
					timeSlots.length,
					overviewCards.length
				),
				viewportHeight: window.innerHeight,
				viewportWidth: window.innerWidth,
			};
		});

		console.log('Content dimensions:', contentInfo);
		console.log(
			`Found ${contentInfo.activityCount} activities/elements in content`
		);

		// Calculate optimal scale for PDF page
		const pdfPageHeight = 11 * 72; // 11 inches * 72 points per inch (A4 height)
		const pdfPageWidth = 8.5 * 72; // 8.5 inches * 72 points per inch (A4 width)
		const margins = 28.8; // 0.2 inch margins total (top + bottom) - 0.2in * 2 * 72pts/in

		const availableHeight = pdfPageHeight - margins;
		const availableWidth = pdfPageWidth - margins;

		// Calculate scale for larger content that still fits on single page
		const scaleForHeight =
			availableHeight / (contentInfo.height * 0.5); // More generous ratio for larger content
		const scaleForWidth = availableWidth / (contentInfo.width * 0.5);
		const optimalScale = Math.min(
			scaleForHeight,
			scaleForWidth,
			0.95
		); // Ensure single page fit with safety margin

		console.log('PDF scaling:', {
			contentHeight: contentInfo.height,
			availableHeight,
			scaleForHeight,
			scaleForWidth,
			optimalScale,
		});

		// Generate PDF with optimized scaling
		const pdf = await page.pdf({
			format: options.format || 'A4',
			printBackground: true,
			margin: {
				top: '0.2in',
				bottom: '0.2in',
				left: '0.2in',
				right: '0.2in',
			},
			scale: Math.max(optimalScale, 0.4), // Reasonable minimum scale
			preferCSSPageSize: false,
			width: `${contentInfo.width}px`,
			height: `${contentInfo.height}px`,
		});

		return Buffer.from(pdf);
	} finally {
		await browser.close();
	}
}

/**
 * Generate PDF for current day view
 */
export async function generateDayPDF(
	baseUrl: string,
	dayIndex: number,
	viewMode: ViewMode = 'single'
): Promise<Buffer> {
	return generatePDF(baseUrl, {
		viewMode,
		dayIndex,
	});
}

/**
 * Generate PDF for overview
 */
export async function generateOverviewPDF(
	baseUrl: string
): Promise<Buffer> {
	return generatePDF(baseUrl, {
		viewMode: 'overview',
	});
}
