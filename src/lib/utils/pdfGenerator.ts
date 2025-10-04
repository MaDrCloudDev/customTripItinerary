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

		// Inject CSS to override OKLAB colors with RGB equivalents for PDF compatibility
		await page.addStyleTag({
			content: `
				/* Override ALL OKLAB color variables with RGB equivalents for PDF compatibility */
				:root, :host {
					/* Red colors */
					--color-red-50: #fef2f2 !important;
					--color-red-100: #fee2e2 !important;
					--color-red-200: #fecaca !important;
					--color-red-400: #f87171 !important;
					--color-red-500: #ef4444 !important;
					--color-red-600: #dc2626 !important;
					--color-red-700: #b91c1c !important;
					--color-red-900: #7f1d1d !important;
					
					/* Orange colors */
					--color-orange-50: #fff7ed !important;
					--color-orange-100: #ffedd5 !important;
					--color-orange-200: #fed7aa !important;
					--color-orange-300: #fdba74 !important;
					--color-orange-400: #fb923c !important;
					--color-orange-500: #f97316 !important;
					--color-orange-600: #ea580c !important;
					--color-orange-700: #c2410c !important;
					--color-orange-900: #7c2d12 !important;
					
					/* Amber colors */
					--color-amber-300: #fcd34d !important;
					--color-amber-500: #f59e0b !important;
					
					/* Yellow colors */
					--color-yellow-50: #fffbeb !important;
					--color-yellow-100: #fef3c7 !important;
					--color-yellow-200: #fde68a !important;
					--color-yellow-400: #facc15 !important;
					--color-yellow-500: #eab308 !important;
					--color-yellow-600: #ca8a04 !important;
					--color-yellow-700: #a16207 !important;
					--color-yellow-900: #713f12 !important;
					
					/* Green colors */
					--color-green-50: #f0fdf4 !important;
					--color-green-100: #dcfce7 !important;
					--color-green-200: #bbf7d0 !important;
					--color-green-400: #4ade80 !important;
					--color-green-500: #22c55e !important;
					--color-green-600: #16a34a !important;
					--color-green-700: #15803d !important;
					--color-green-900: #14532d !important;
					
					/* Emerald colors */
					--color-emerald-100: #d1fae5 !important;
					--color-emerald-500: #10b981 !important;
					--color-emerald-600: #059669 !important;
					--color-emerald-700: #047857 !important;
					
					/* Teal colors */
					--color-teal-500: #14b8a6 !important;
					
					/* Blue colors */
					--color-blue-50: #eff6ff !important;
					--color-blue-100: #dbeafe !important;
					--color-blue-200: #bfdbfe !important;
					--color-blue-300: #93c5fd !important;
					--color-blue-400: #60a5fa !important;
					--color-blue-500: #3b82f6 !important;
					--color-blue-600: #2563eb !important;
					--color-blue-700: #1d4ed8 !important;
					--color-blue-800: #1e40af !important;
					--color-blue-900: #1e3a8a !important;
					
					/* Indigo colors */
					--color-indigo-600: #4f46e5 !important;
					--color-indigo-700: #4338ca !important;
					
					/* Purple colors */
					--color-purple-50: #faf5ff !important;
					--color-purple-100: #f3e8ff !important;
					--color-purple-200: #e9d5ff !important;
					--color-purple-400: #c084fc !important;
					--color-purple-500: #a855f7 !important;
					--color-purple-600: #9333ea !important;
					--color-purple-700: #7c3aed !important;
					--color-purple-900: #581c87 !important;
					
					/* Pink colors */
					--color-pink-400: #f472b6 !important;
					--color-pink-500: #ec4899 !important;
					
					/* Slate colors */
					--color-slate-100: #f1f5f9 !important;
					--color-slate-200: #e2e8f0 !important;
					--color-slate-300: #cbd5e1 !important;
					--color-slate-400: #94a3b8 !important;
					--color-slate-500: #64748b !important;
					--color-slate-600: #475569 !important;
					--color-slate-700: #334155 !important;
					--color-slate-800: #1e293b !important;
					--color-slate-900: #0f172a !important;
					
					/* Gray colors */
					--color-gray-50: #f9fafb !important;
					--color-gray-100: #f3f4f6 !important;
					--color-gray-200: #e5e7eb !important;
					--color-gray-300: #d1d5db !important;
					--color-gray-400: #9ca3af !important;
					--color-gray-500: #6b7280 !important;
					--color-gray-600: #4b5563 !important;
					--color-gray-700: #374151 !important;
					--color-gray-800: #1f2937 !important;
					--color-gray-900: #111827 !important;
					
					/* Basic colors */
					--color-black: #000000 !important;
					--color-white: #ffffff !important;
				}
				
				/* Force all gradients to use RGB instead of OKLAB */
				.bg-gradient-to-b,
				.bg-gradient-to-br,
				.bg-gradient-to-l,
				.bg-gradient-to-r {
					--tw-gradient-position: to bottom !important;
				}
				
				/* Override any remaining color-mix functions */
				* {
					color: inherit !important;
				}
				
				/* Specific background overrides */
				.bg-white\/80 { background-color: rgba(255, 255, 255, 0.8) !important; }
				.bg-white\/60 { background-color: rgba(255, 255, 255, 0.6) !important; }
				.bg-white\/50 { background-color: rgba(255, 255, 255, 0.5) !important; }
				.bg-white\/40 { background-color: rgba(255, 255, 255, 0.4) !important; }
				.bg-white\/20 { background-color: rgba(255, 255, 255, 0.2) !important; }
				.bg-white\/95 { background-color: rgba(255, 255, 255, 0.95) !important; }
				.bg-blue-100\/80 { background-color: rgba(219, 234, 254, 0.8) !important; }
				.bg-blue-100\/60 { background-color: rgba(219, 234, 254, 0.6) !important; }
				
				/* Border color overrides */
				.border-white\/30 { border-color: rgba(255, 255, 255, 0.3) !important; }
				.border-white\/40 { border-color: rgba(255, 255, 255, 0.4) !important; }
				.border-blue-200\/50 { border-color: rgba(191, 219, 254, 0.5) !important; }
				.border-blue-400\/50 { border-color: rgba(96, 165, 250, 0.5) !important; }
				.border-blue-500\/50 { border-color: rgba(59, 130, 246, 0.5) !important; }
			`
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

		// Handle potential canvas and image issues that cause createPattern errors
		await page.evaluate(() => {
			// Remove any canvas elements with zero dimensions
			const canvases = document.querySelectorAll('canvas');
			canvases.forEach(canvas => {
				if (canvas.width === 0 || canvas.height === 0) {
					canvas.remove();
				}
			});

			// Remove any img elements that might not have loaded or have zero dimensions
			const images = document.querySelectorAll('img');
			images.forEach(img => {
				if (img.naturalWidth === 0 || img.naturalHeight === 0 || !img.complete) {
					img.remove();
				}
			});

			// Remove any SVG elements that might have zero dimensions
			const svgs = document.querySelectorAll('svg');
			svgs.forEach(svg => {
				const rect = svg.getBoundingClientRect();
				if (rect.width === 0 || rect.height === 0) {
					svg.remove();
				}
			});

			// Force recalculation of all styles
			document.body.offsetHeight;
		});

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
