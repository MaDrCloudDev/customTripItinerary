/**
 * Client-side PDF generation using jsPDF and html2canvas
 * Alternative to Puppeteer for simpler setup
 */

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export interface ClientPDFOptions {
	element?: HTMLElement;
	filename?: string;
	format?: 'a4' | 'letter';
	orientation?: 'portrait' | 'landscape';
	scale?: number;
}

/**
 * Generate PDF from HTML element using html2canvas + jsPDF
 */
export async function generateClientPDF(
	options: ClientPDFOptions = {}
): Promise<void> {
	const {
		element = document.querySelector('main') as HTMLElement,
		filename = 'itinerary.pdf',
		format = 'a4',
		orientation = 'portrait',
		scale = 2,
	} = options;

	if (!element) {
		throw new Error('No element found to convert to PDF');
	}

	try {
		// Prepare element for full content capture
		const originalStyles = {
			height: element.style.height,
			maxHeight: element.style.maxHeight,
			overflow: element.style.overflow,
		};

		// Force element to show all content
		element.style.height = 'auto';
		element.style.maxHeight = 'none';
		element.style.overflow = 'visible';

		// Also fix any scrollable containers within
		const scrollContainers = element.querySelectorAll(
			'[style*="overflow"], .overflow-hidden, .overflow-y-auto, .h-96, .max-h-96'
		);
		const containerOriginalStyles: {
			element: HTMLElement;
			styles: any;
		}[] = [];

		scrollContainers.forEach((container) => {
			const htmlContainer = container as HTMLElement;
			containerOriginalStyles.push({
				element: htmlContainer,
				styles: {
					height: htmlContainer.style.height,
					maxHeight: htmlContainer.style.maxHeight,
					overflow: htmlContainer.style.overflow,
				},
			});

			htmlContainer.style.height = 'auto';
			htmlContainer.style.maxHeight = 'none';
			htmlContainer.style.overflow = 'visible';
		});

		// Hide navigation, footer, and non-essential elements temporarily
		const elementsToHide = document.querySelectorAll(
			'.no-print, nav, footer, button:not(.print-button)'
		);
		const originalDisplays: string[] = [];

		elementsToHide.forEach((el, index) => {
			const htmlEl = el as HTMLElement;
			originalDisplays[index] = htmlEl.style.display;
			htmlEl.style.display = 'none';
		});

		// Wait a moment for layout to settle
		await new Promise((resolve) => setTimeout(resolve, 200));

		// Get the full content dimensions
		const fullWidth = Math.max(
			element.scrollWidth,
			element.offsetWidth
		);
		const fullHeight = Math.max(
			element.scrollHeight,
			element.offsetHeight
		);

		console.log('Capturing full content:', { fullWidth, fullHeight });

		// Capture the full content
		const canvas = await html2canvas(element, {
			scale: Math.min(scale, 3), // Limit scale to prevent memory issues
			useCORS: true,
			allowTaint: true,
			backgroundColor: '#ffffff',
			width: fullWidth,
			height: fullHeight,
			scrollX: 0,
			scrollY: 0,
			windowWidth: fullWidth,
			windowHeight: fullHeight,
		});

		// Restore all original styles
		element.style.height = originalStyles.height;
		element.style.maxHeight = originalStyles.maxHeight;
		element.style.overflow = originalStyles.overflow;

		// Restore container styles
		containerOriginalStyles.forEach(
			({ element: containerEl, styles }) => {
				containerEl.style.height = styles.height;
				containerEl.style.maxHeight = styles.maxHeight;
				containerEl.style.overflow = styles.overflow;
			}
		);

		// Restore hidden elements
		elementsToHide.forEach((el, index) => {
			const htmlEl = el as HTMLElement;
			htmlEl.style.display = originalDisplays[index];
		});

		// Calculate dimensions to fit page
		const imgData = canvas.toDataURL('image/png');
		const pdf = new jsPDF({
			orientation,
			unit: 'mm',
			format,
		});

		const pdfWidth = pdf.internal.pageSize.getWidth();
		const pdfHeight = pdf.internal.pageSize.getHeight();

		const imgWidth = canvas.width;
		const imgHeight = canvas.height;

		// Calculate scaling for larger content that fits on single page
		const marginMm = 8; // Small but reasonable margins
		const availableWidth = pdfWidth - marginMm * 2;
		const availableHeight = pdfHeight - marginMm * 2;

		const scaleX = availableWidth / (imgWidth * 0.22); // Balanced px to mm ratio
		const scaleY = availableHeight / (imgHeight * 0.22);
		const finalScale = Math.min(scaleX, scaleY, 1.0); // Ensure single page fit

		const scaledWidth = imgWidth * 0.264583 * finalScale;
		const scaledHeight = imgHeight * 0.264583 * finalScale;

		// Center the content with small margins
		const x = (pdfWidth - scaledWidth) / 2;
		const y = (pdfHeight - scaledHeight) / 2;

		pdf.addImage(imgData, 'PNG', x, y, scaledWidth, scaledHeight);
		pdf.save(filename);
	} catch (error) {
		console.error('Error generating PDF:', error);
		throw error;
	}
}

/**
 * Generate PDF for current day view
 */
export async function generateDayPDF(
	dayIndex: number,
	viewMode: string = 'single'
): Promise<void> {
	const filename = `itinerary-${viewMode}-day-${dayIndex + 1}.pdf`;
	await generateClientPDF({ filename });
}

/**
 * Generate PDF for overview
 */
export async function generateOverviewPDF(): Promise<void> {
	const filename = 'itinerary-overview.pdf';
	await generateClientPDF({ filename });
}

/**
 * Smart PDF generation that attempts to fit content on single page
 */
export async function generateSmartPDF(
	element?: HTMLElement,
	filename: string = 'itinerary.pdf'
): Promise<void> {
	const targetElement =
		element || (document.querySelector('main') as HTMLElement);

	if (!targetElement) {
		throw new Error('No content element found');
	}

	// Try to optimize content size before generation
	const originalTransform = targetElement.style.transform;
	const originalWidth = targetElement.style.width;

	try {
		// Calculate if content needs scaling
		const contentHeight = targetElement.scrollHeight;
		const viewportHeight = window.innerHeight;

		if (contentHeight > viewportHeight * 0.9) {
			// Scale down content to fit better
			const scale = (viewportHeight * 0.9) / contentHeight;
			const clampedScale = Math.max(0.5, Math.min(1, scale));

			targetElement.style.transform = `scale(${clampedScale})`;
			targetElement.style.transformOrigin = 'top left';
			targetElement.style.width = `${100 / clampedScale}%`;

			// Wait for layout to settle
			await new Promise((resolve) => setTimeout(resolve, 100));
		}

		await generateClientPDF({
			element: targetElement,
			filename,
			scale: 1.5, // Higher quality
		});
	} finally {
		// Restore original styles
		targetElement.style.transform = originalTransform;
		targetElement.style.width = originalWidth;
	}
}
