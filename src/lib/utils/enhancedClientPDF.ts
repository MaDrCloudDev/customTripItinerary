/**
 * Enhanced client-side PDF generation that matches Puppeteer output exactly
 * Uses the same logic, scaling, and content preparation as the server-side version
 */

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export interface ClientPDFOptions {
	viewMode: 'single' | 'timeline' | 'overview';
	dayIndex?: number;
	format?: 'a4' | 'letter';
	scale?: number;
}

/**
 * Force all colors to hex/rgb for html2canvas compatibility
 */
function convertModernColorsForCanvas(): void {
	// Add comprehensive hex color overrides for all Tailwind 4 oklch colors
	const styleElement = document.createElement('style');
	styleElement.id = 'pdf-color-conversion';
	styleElement.textContent = `
		/* Override ALL Tailwind CSS variables with hex values for html2canvas */
		:root, :host {
			/* Override ALL potentially problematic colors and gradients with solid colors */
			/* Override Tailwind 4 oklch colors with hex equivalents */
			--color-red-100: #fee2e2 !important;
			--color-red-200: #fecaca !important;
			--color-red-400: #f87171 !important;
			--color-red-900: #7f1d1d !important;
			--color-orange-100: #ffedd5 !important;
			--color-orange-200: #fed7aa !important;
			--color-orange-300: #fdba74 !important;
			--color-orange-400: #fb923c !important;
			--color-orange-600: #ea580c !important;
			--color-orange-700: #c2410c !important;
			--color-orange-900: #7c2d12 !important;
			--color-amber-300: #fcd34d !important;
			--color-amber-500: #f59e0b !important;
			--color-yellow-100: #fef3c7 !important;
			--color-yellow-200: #fde68a !important;
			--color-yellow-400: #fbbf24 !important;
			--color-yellow-500: #f59e0b !important;
			--color-yellow-600: #d97706 !important;
			--color-yellow-900: #78350f !important;
			--color-green-100: #dcfce7 !important;
			--color-green-200: #bbf7d0 !important;
			--color-green-400: #4ade80 !important;
			--color-green-600: #16a34a !important;
			--color-green-700: #15803d !important;
			--color-green-900: #14532d !important;
			--color-emerald-100: #d1fae5 !important;
			--color-emerald-500: #10b981 !important;
			--color-emerald-600: #059669 !important;
			--color-emerald-700: #047857 !important;
			--color-teal-500: #14b8a6 !important;
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
			--color-indigo-600: #4f46e5 !important;
			--color-indigo-700: #4338ca !important;
			--color-purple-600: #9333ea !important;
			--color-purple-700: #7c3aed !important;
			--color-pink-400: #f472b6 !important;
			--color-pink-500: #ec4899 !important;
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
			--color-slate-100: #f1f5f9 !important;
			--color-slate-200: #e2e8f0 !important;
			--color-slate-300: #cbd5e1 !important;
			--color-slate-400: #94a3b8 !important;
			--color-slate-500: #64748b !important;
			--color-slate-600: #475569 !important;
			--color-slate-700: #334155 !important;
			--color-slate-800: #1e293b !important;
			--color-slate-900: #0f172a !important;
		}
		
		/* Text colors - preserve actual card text colors */
		.text-blue-900 { color: #1e3a8a !important; }
		.text-orange-900 { color: #7c2d12 !important; }
		.text-purple-900 { color: #581c87 !important; }
		.text-green-900 { color: #14532d !important; }
		.text-gray-700 { color: #374151 !important; }
		.text-yellow-900 { color: #713f12 !important; }
		.text-red-900 { color: #7f1d1d !important; }
		.text-white { color: #ffffff !important; }
		
		/* Other common text colors */
		.text-blue-600 { color: #2563eb !important; }
		.text-blue-700 { color: #1d4ed8 !important; }
		.text-blue-800 { color: #1e40af !important; }
		.text-emerald-600 { color: #059669 !important; }
		.text-teal-500 { color: #14b8a6 !important; }
		.text-gray-600 { color: #4b5563 !important; }
		.text-gray-900 { color: #111827 !important; }
		
		/* Background colors */
		.bg-white { background-color: #ffffff !important; }
		.bg-white\/60 { background-color: rgba(255, 255, 255, 0.6) !important; }
		.bg-white\/50 { background-color: rgba(255, 255, 255, 0.5) !important; }
		.bg-white\/80 { background-color: rgba(255, 255, 255, 0.8) !important; }
		
		/* Activity card individual colors */
		.bg-blue-100 { background-color: #dbeafe !important; }
		.bg-blue-200 { background-color: #bfdbfe !important; }
		.bg-orange-100 { background-color: #ffedd5 !important; }
		.bg-orange-200 { background-color: #fed7aa !important; }
		.bg-purple-100 { background-color: #f3e8ff !important; }
		.bg-purple-200 { background-color: #e9d5ff !important; }
		.bg-green-100 { background-color: #dcfce7 !important; }
		.bg-green-200 { background-color: #bbf7d0 !important; }
		.bg-gray-100 { background-color: #f3f4f6 !important; }
		.bg-gray-200 { background-color: #e5e7eb !important; }
		.bg-yellow-100 { background-color: #fef3c7 !important; }
		.bg-yellow-200 { background-color: #fde68a !important; }
		.bg-red-100 { background-color: #fee2e2 !important; }
		.bg-red-200 { background-color: #fecaca !important; }
		
		/* Solid colors for buttons/accents */
		.bg-blue-600 { background-color: #2563eb !important; }
		.bg-blue-700 { background-color: #1d4ed8 !important; }
		.bg-blue-800 { background-color: #1e40af !important; }
		.bg-emerald-500 { background-color: #10b981 !important; }
		.bg-teal-500 { background-color: #14b8a6 !important; }
		
		/* Print info styles */
		.bg-blue-50 { background-color: #eff6ff !important; }
		
		/* Gradients with hex colors */
		.bg-gradient-to-r { 
			background: linear-gradient(to right, #2563eb, #10b981) !important; 
		}
		.bg-gradient-to-br { 
			background: linear-gradient(to bottom right, #2563eb, #1d4ed8, #059669) !important; 
		}
		.from-blue-600 { --tw-gradient-from: #2563eb !important; }
		.from-blue-700 { --tw-gradient-from: #1d4ed8 !important; }
		.via-blue-700 { --tw-gradient-via: #1d4ed8 !important; }
		.to-blue-800 { --tw-gradient-to: #1e40af !important; }
		.to-emerald-600 { --tw-gradient-to: #059669 !important; }
		.from-emerald-500 { --tw-gradient-from: #10b981 !important; }
		.to-teal-500 { --tw-gradient-to: #14b8a6 !important; }
		
		/* Border colors - preserve actual card border colors */
		.border-blue-400 { border-color: #60a5fa !important; }
		.border-orange-400 { border-color: #fb923c !important; }
		.border-purple-400 { border-color: #c084fc !important; }
		.border-green-400 { border-color: #4ade80 !important; }
		.border-gray-400 { border-color: #9ca3af !important; }
		.border-yellow-400 { border-color: #facc15 !important; }
		.border-red-400 { border-color: #f87171 !important; }
		
		/* Other common border colors */
		.border-blue-500 { border-color: #3b82f6 !important; }
		.border-white\/30 { border-color: rgba(255, 255, 255, 0.3) !important; }
		.border-white\/40 { border-color: rgba(255, 255, 255, 0.4) !important; }
		.border-blue-400\/50 { border-color: rgba(96, 165, 250, 0.5) !important; }
		
		/* Use solid colors instead of gradients to prevent canvas issues */
		body {
			background: #dbeafe !important;
		}
		
		/* Convert activity card gradients to solid colors that match the theme */
		.bg-gradient-to-br.from-blue-100.to-blue-200,
		*[class*="from-blue-100"] {
			background: #dbeafe !important; /* Light blue matching the theme */
		}
		.bg-gradient-to-br.from-orange-100.to-orange-200,
		*[class*="from-orange-100"] {
			background: #ffedd5 !important; /* Light orange */
		}
		.bg-gradient-to-br.from-purple-100.to-purple-200,
		*[class*="from-purple-100"] {
			background: #f3e8ff !important; /* Light purple */
		}
		.bg-gradient-to-br.from-green-100.to-green-200,
		*[class*="from-green-100"] {
			background: #dcfce7 !important; /* Light green */
		}
		.bg-gradient-to-br.from-gray-100.to-gray-200,
		*[class*="from-gray-100"] {
			background: #f3f4f6 !important; /* Light gray */
		}
		.bg-gradient-to-br.from-yellow-100.to-yellow-200,
		*[class*="from-yellow-100"] {
			background: #fef3c7 !important; /* Light yellow */
		}
		.bg-gradient-to-br.from-red-100.to-red-200,
		*[class*="from-red-100"] {
			background: #fee2e2 !important; /* Light red */
		}
		
		/* Print button - use solid emerald */
		.bg-gradient-to-r.from-emerald-500.to-teal-500,
		*[class*="from-emerald-500"] {
			background: #10b981 !important;
		}
		
		/* Connector elements - use solid amber */
		.bg-gradient-to-b.from-amber-300.to-orange-300,
		*[class*="from-amber-300"] {
			background: #fcd34d !important;
		}
		
		/* All other gradients become solid colors */
		.bg-gradient-to-r,
		.bg-gradient-to-br,
		.bg-gradient-to-b,
		.bg-gradient-to-l,
		*[class*="gradient"] {
			background: #dbeafe !important;
		}
		
		/* Scrollbar - solid color */
		::-webkit-scrollbar-thumb {
			background: #1d4ed8 !important;
		}
		
		.shimmer {
			background: rgba(255, 255, 255, 0.4) !important;
			animation: none !important;
		}
		
		/* PDF-specific styles for overview grid - gentle overrides */
		.overview-grid {
			display: grid;
			grid-template-columns: repeat(2, 1fr);
			gap: 1rem;
			width: 100%;
			visibility: visible;
		}
		
		.overview-card {
			display: flex;
			flex-direction: column;
			visibility: visible;
			opacity: 1;
			break-inside: avoid;
			min-height: 200px;
		}
	`;
	document.head.appendChild(styleElement);
}

/**
 * Enhanced client-side PDF generation that matches Puppeteer exactly
 */
export async function generateEnhancedClientPDF(
	options: ClientPDFOptions
): Promise<void> {
	const { viewMode, dayIndex, format = 'a4' } = options;

	try {
		console.log('Starting enhanced PDF generation:', {
			viewMode,
			dayIndex,
		});

		// Step 1: Convert unsupported CSS colors to compatible formats
		convertModernColorsForCanvas();

		// Step 2: Prepare the page for PDF (same as Puppeteer)
		const contentInfo = await preparePageForPDF();

		console.log('Content info:', contentInfo);

		// Step 3: Calculate optimal scale (same logic as Puppeteer)
		const pdfPageHeight = 11 * 72; // 11 inches * 72 points per inch (A4 height)
		const pdfPageWidth = 8.5 * 72; // 8.5 inches * 72 points per inch (A4 width)
		const margins = 28.8; // 0.2 inch margins total

		const availableHeight = pdfPageHeight - margins;
		const availableWidth = pdfPageWidth - margins;

		// Calculate scaling AFTER we have safe dimensions
		const safeContentWidth = Math.max(contentInfo.width || 0, 1400);
		const safeContentHeight = Math.max(contentInfo.height || 0, 1000);

		const scaleForHeight =
			availableHeight / (safeContentHeight * 0.5);
		const scaleForWidth = availableWidth / (safeContentWidth * 0.5);
		const optimalScale = Math.min(
			scaleForHeight,
			scaleForWidth,
			0.95
		);

		console.log('PDF scaling with safe dimensions:', {
			originalHeight: contentInfo.height,
			safeContentHeight,
			availableHeight,
			scaleForHeight,
			scaleForWidth,
			optimalScale,
		});

		// Step 4: Capture the content
		const main = document.querySelector('main') as HTMLElement;
		if (!main) throw new Error('Main content not found');

		// FINAL validation before canvas creation - absolutely prevent 0-sized canvas
		const finalWidth = Math.max(contentInfo.width || 0, 1400);
		const finalHeight = Math.max(contentInfo.height || 0, 1000);

		if (
			finalWidth <= 0 ||
			finalHeight <= 0 ||
			!isFinite(finalWidth) ||
			!isFinite(finalHeight)
		) {
			throw new Error(
				`CRITICAL: Cannot create canvas with dimensions: ${finalWidth}x${finalHeight}`
			);
		}

		console.log('Creating canvas with SAFE dimensions:', {
			original: {
				width: contentInfo.width,
				height: contentInfo.height,
			},
			final: { width: finalWidth, height: finalHeight },
		});

		// Remove any canvas elements with zero dimensions to prevent createPattern errors
		const canvases = main.querySelectorAll('canvas');
		canvases.forEach((canvas) => {
			if (canvas.width === 0 || canvas.height === 0) {
				console.warn('Removing canvas with zero dimensions:', canvas);
				canvas.remove();
			}
		});

		// Remove any img elements that might not have loaded or have zero dimensions
		const images = main.querySelectorAll('img');
		images.forEach((img) => {
			if (
				img.naturalWidth === 0 ||
				img.naturalHeight === 0 ||
				!img.complete
			) {
				console.warn('Removing problematic image:', img);
				img.remove();
			}
		});

		// Remove any SVG elements that might have zero dimensions
		const svgs = main.querySelectorAll('svg');
		svgs.forEach((svg) => {
			const rect = svg.getBoundingClientRect();
			if (rect.width === 0 || rect.height === 0) {
				console.warn('Removing SVG with zero dimensions:', svg);
				svg.remove();
			}
		});

		// Additional aggressive cleanup - remove any elements that commonly cause canvas issues
		const problematicElements = main.querySelectorAll(
			'video, iframe, object, embed, applet'
		);
		problematicElements.forEach((el) => {
			console.warn(
				'Removing potentially problematic element:',
				el.tagName
			);
			el.remove();
		});

		// Force remove any elements with pseudo-elements that might create hidden canvases
		const elementsWithPseudo = main.querySelectorAll(
			'.shimmer, [class*="animate-"], [class*="transition-"]'
		);
		elementsWithPseudo.forEach((el) => {
			(el as HTMLElement).style.animation = 'none';
			(el as HTMLElement).style.transition = 'none';
		});

		let canvas;
		try {
			canvas = await html2canvas(main, {
				scale: 1, // Reduced scale to prevent memory issues
				useCORS: true,
				allowTaint: false, // Set to false to prevent taint issues
				backgroundColor: '#ffffff',
				width: finalWidth,
				height: finalHeight,
				scrollX: 0,
				scrollY: 0,
				windowWidth: finalWidth,
				windowHeight: finalHeight,
				logging: false, // Disable logging to reduce noise
				foreignObjectRendering: false, // Disable foreign object rendering to prevent canvas issues
				removeContainer: true, // Clean up temporary containers
				imageTimeout: 0, // Don't wait for images that might not load
				onclone: (clonedDoc) => {
					// Additional cleanup in the cloned document
					const clonedCanvases = clonedDoc.querySelectorAll('canvas');
					clonedCanvases.forEach((canvas) => {
						if (canvas.width === 0 || canvas.height === 0) {
							canvas.remove();
						}
					});

					const clonedImages = clonedDoc.querySelectorAll('img');
					clonedImages.forEach((img) => {
						if (
							img.naturalWidth === 0 ||
							img.naturalHeight === 0 ||
							!img.complete
						) {
							img.remove();
						}
					});

					const clonedSvgs = clonedDoc.querySelectorAll('svg');
					clonedSvgs.forEach((svg) => {
						const rect = svg.getBoundingClientRect();
						if (rect.width === 0 || rect.height === 0) {
							svg.remove();
						}
					});
				},
				ignoreElements: (element) => {
					// Only skip the most problematic elements for canvas
					if (element.tagName === 'CANVAS') {
						return true;
					}

					// Skip images only if they're actually problematic
					if (element.tagName === 'IMG') {
						const img = element as HTMLImageElement;
						return (
							img.naturalWidth === 0 ||
							img.naturalHeight === 0 ||
							!img.complete
						);
					}

					// Skip SVGs only if they have zero dimensions
					if (element.tagName === 'SVG') {
						const rect = element.getBoundingClientRect();
						return rect.width === 0 || rect.height === 0;
					}

					// Skip video and other media elements
					if (
						['VIDEO', 'IFRAME', 'OBJECT', 'EMBED', 'APPLET'].includes(
							element.tagName
						)
					) {
						return true;
					}

					// Only skip specific problematic animations, not all transitions
					if (element.classList) {
						const classList = Array.from(element.classList);
						if (
							classList.some(
								(cls) =>
									cls.includes('shimmer') ||
									cls.includes('animate-fade') ||
									cls.includes('animate-pulse') ||
									cls.includes('animate-spin')
							)
						) {
							return true;
						}
					}

					return false;
				},
			});
		} catch (canvasError) {
			console.error(
				'html2canvas failed, trying fallback approach:',
				canvasError
			);

			// Fallback: Try with more restrictive settings
			try {
				canvas = await html2canvas(main, {
					scale: 0.5, // Even smaller scale
					useCORS: false,
					allowTaint: false,
					backgroundColor: '#ffffff',
					width: Math.min(finalWidth, 1200),
					height: Math.min(finalHeight, 800),
					scrollX: 0,
					scrollY: 0,
					windowWidth: Math.min(finalWidth, 1200),
					windowHeight: Math.min(finalHeight, 800),
					logging: false,
					foreignObjectRendering: false,
					removeContainer: true,
					imageTimeout: 0,
					onclone: (clonedDoc) => {
						// Ultra-aggressive cleanup in fallback
						const toRemove = clonedDoc.querySelectorAll(
							'canvas, img, svg, video, iframe, object, embed, *[style*="background-image"]'
						);
						toRemove.forEach((el) => el.remove());
					},
					ignoreElements: (element) => {
						// Ultra-aggressive ignoring in fallback
						return (
							element.tagName === 'CANVAS' ||
							element.tagName === 'SVG' ||
							element.tagName === 'IMG' ||
							element.tagName === 'VIDEO' ||
							element.tagName === 'IFRAME' ||
							element.tagName === 'OBJECT' ||
							element.tagName === 'EMBED' ||
							Boolean(
								(element as HTMLElement).style?.backgroundImage
							) ||
							element.classList?.length > 0 // Skip anything with classes in fallback
						);
					},
				});
			} catch (fallbackError) {
				console.error(
					'Fallback html2canvas also failed:',
					fallbackError
				);
				const errorMessage =
					canvasError instanceof Error
						? canvasError.message
						: String(canvasError);
				throw new Error(
					`PDF generation failed: ${errorMessage}. Please try again or use a different browser.`
				);
			}
		}

		console.log('Canvas created successfully:', {
			canvasWidth: canvas.width,
			canvasHeight: canvas.height,
		});

		// Validate the resulting canvas
		if (canvas.width <= 0 || canvas.height <= 0) {
			throw new Error(
				`Invalid canvas dimensions: ${canvas.width}x${canvas.height}`
			);
		}

		// Step 5: Create PDF with exact same dimensions as Puppeteer
		const imgData = canvas.toDataURL('image/png');
		const pdf = new jsPDF({
			orientation: 'portrait',
			unit: 'pt', // Use points like Puppeteer
			format: format === 'a4' ? 'a4' : 'letter',
		});

		const pdfWidth = pdf.internal.pageSize.getWidth();
		const pdfHeight = pdf.internal.pageSize.getHeight();

		// Apply the same scaling logic as Puppeteer using safe dimensions
		const finalScale = Math.max(optimalScale, 0.4);
		const scaledWidth = finalWidth * finalScale;
		const scaledHeight = finalHeight * finalScale;

		// Center content with 0.2 inch margins (same as Puppeteer)
		const marginPt = 14.4; // 0.2 inch = 14.4 points
		const x = marginPt;
		const y = marginPt;

		// Add the image to PDF
		pdf.addImage(
			imgData,
			'PNG',
			x,
			y,
			Math.min(scaledWidth, pdfWidth - marginPt * 2),
			Math.min(scaledHeight, pdfHeight - marginPt * 2)
		);

		// Step 6: Save the PDF
		const filename = `itinerary-${viewMode}${
			dayIndex !== undefined ? `-day-${dayIndex + 1}` : ''
		}.pdf`;

		pdf.save(filename);

		console.log('PDF generated successfully:', filename);
	} catch (error) {
		console.error('Enhanced PDF generation failed:', error);
		throw error;
	} finally {
		// Step 7: Restore page state
		restorePageAfterPDF();
	}
}

/**
 * Prepare page for PDF - same logic as Puppeteer
 */
async function preparePageForPDF(): Promise<{
	height: number;
	width: number;
	activityCount: number;
}> {
	// Hide navigation, footer, and non-essential elements (same as Puppeteer)
	const elementsToHide = document.querySelectorAll(
		'.no-print, nav, footer, button:not(.print-button)'
	);

	elementsToHide.forEach((el) => {
		(el as HTMLElement).style.display = 'none';
	});

	// Get the main content
	const main = document.querySelector('main');
	if (!main) throw new Error('Main content not found');

	// Force body and html to allow full content (same as Puppeteer)
	document.body.style.height = 'auto';
	document.body.style.minHeight = '100vh';
	document.documentElement.style.height = 'auto';

	// Force the main content and all children to show full content
	main.style.height = 'auto';
	main.style.minHeight = '800px';
	main.style.maxHeight = 'none';
	main.style.overflow = 'visible';
	main.style.display = 'block';
	main.style.visibility = 'visible';

	// Remove height constraints from all descendant elements
	const allElements = main.querySelectorAll('*');
	allElements.forEach((el) => {
		const htmlEl = el as HTMLElement;
		htmlEl.style.height = 'auto';
		htmlEl.style.maxHeight = 'none';
		htmlEl.style.overflow = 'visible';
		htmlEl.style.display = htmlEl.style.display || '';
		htmlEl.style.visibility = 'visible';
	});

	// Special handling for overview grid (same as Puppeteer)
	const overviewGrid = document.querySelector('.overview-grid');
	if (overviewGrid) {
		const htmlGrid = overviewGrid as HTMLElement;
		htmlGrid.style.display = 'grid';
		htmlGrid.style.gridTemplateColumns = 'repeat(2, 1fr)';
		htmlGrid.style.gap = '1rem';
		htmlGrid.style.width = '100%';
		htmlGrid.style.height = 'auto';
		htmlGrid.style.maxHeight = 'none';
		htmlGrid.style.minHeight = '400px';
		htmlGrid.style.visibility = 'visible';

		// Ensure all overview cards are visible
		const overviewCards = htmlGrid.querySelectorAll('.overview-card');
		overviewCards.forEach((card) => {
			const htmlCard = card as HTMLElement;
			htmlCard.style.display = 'flex';
			htmlCard.style.flexDirection = 'column';
			htmlCard.style.visibility = 'visible';
			htmlCard.style.opacity = '1';
			htmlCard.style.height = 'auto';
			htmlCard.style.minHeight = '200px';
		});

		console.log('Overview grid prepared:', {
			gridFound: true,
			cardsFound: overviewCards.length,
			gridDimensions: {
				width: htmlGrid.offsetWidth,
				height: htmlGrid.offsetHeight,
			},
		});
	} else {
		console.log('No overview grid found');
	}

	// Force layout recalculation
	main.offsetHeight;
	main.offsetWidth;

	// Wait longer for layout to settle
	await new Promise((resolve) => setTimeout(resolve, 1000));

	// Clean up any problematic elements that could cause createPattern errors
	const canvases = document.querySelectorAll('canvas');
	canvases.forEach((canvas) => {
		if (canvas.width === 0 || canvas.height === 0) {
			console.warn(
				'Removing zero-dimension canvas in preparation phase:',
				canvas
			);
			canvas.remove();
		}
	});

	const images = document.querySelectorAll('img');
	images.forEach((img) => {
		if (
			img.naturalWidth === 0 ||
			img.naturalHeight === 0 ||
			!img.complete
		) {
			console.warn(
				'Removing problematic image in preparation phase:',
				img
			);
			img.remove();
		}
	});

	const svgs = document.querySelectorAll('svg');
	svgs.forEach((svg) => {
		const rect = svg.getBoundingClientRect();
		if (rect.width === 0 || rect.height === 0) {
			console.warn(
				'Removing zero-dimension SVG in preparation phase:',
				svg
			);
			svg.remove();
		}
	});

	// Get content dimensions with proper validation
	const mainElement = main as HTMLElement;

	// Force a reflow to ensure dimensions are calculated
	mainElement.offsetHeight;

	const scrollHeight = mainElement.scrollHeight;
	const offsetHeight = mainElement.offsetHeight;
	const scrollWidth = mainElement.scrollWidth;
	const offsetWidth = mainElement.offsetWidth;

	console.log('Raw dimensions:', {
		scrollHeight,
		offsetHeight,
		scrollWidth,
		offsetWidth,
	});

	// CRITICAL: Ensure minimum dimensions to prevent 0-sized canvas
	// Force absolute minimums regardless of computed values
	const height = Math.max(
		scrollHeight || 0,
		offsetHeight || 0,
		1000 // Increased minimum height
	);
	const width = Math.max(
		scrollWidth || 0,
		offsetWidth || 0,
		1400 // Increased minimum width
	);

	console.log('Final dimensions with forced minimums:', {
		height,
		width,
	});

	// ABSOLUTE validation to prevent zero-sized canvas
	if (
		height <= 0 ||
		width <= 0 ||
		!isFinite(height) ||
		!isFinite(width) ||
		height < 100 ||
		width < 100
	) {
		console.error('BLOCKING: Invalid dimensions detected!', {
			height,
			width,
			scrollHeight,
			offsetHeight,
			scrollWidth,
			offsetWidth,
		});

		// Force safe dimensions and continue
		const safeHeight = 1000;
		const safeWidth = 1400;
		console.warn(
			`Forcing safe dimensions: ${safeWidth}x${safeHeight}`
		);

		const activityCount = document.querySelectorAll(
			'.activity-card, .timeline-item, .day-card, [class*="activity"], [class*="timeline"]'
		).length;

		return { height: safeHeight, width: safeWidth, activityCount };
	}

	// Count activities for verification first
	const activityCount = document.querySelectorAll(
		'.activity-card, .timeline-item, .day-card, [class*="activity"], [class*="timeline"]'
	).length;

	// Additional safety check
	if (height < 100 || width < 100) {
		console.warn(
			'Suspiciously small dimensions detected, forcing minimums'
		);
		const safeHeight = Math.max(height, 800);
		const safeWidth = Math.max(width, 1200);
		return { height: safeHeight, width: safeWidth, activityCount };
	}

	// Debug overview content
	const overviewCards = document.querySelectorAll(
		'.overview-card, [class*="overview"]'
	);
	const gridElements = document.querySelectorAll('[class*="grid"]');
	const dayElements = document.querySelectorAll(
		'[class*="Day"], *[text*="Day"]'
	);

	console.log('Content analysis:', {
		activityCount,
		overviewCards: overviewCards.length,
		gridElements: gridElements.length,
		dayElements: dayElements.length,
		mainTextContent:
			mainElement.textContent?.substring(0, 200) + '...',
	});

	return { height, width, activityCount };
}

/**
 * Restore page after PDF generation
 */
function restorePageAfterPDF(): void {
	// Remove temporary style element
	const styleElement = document.getElementById(
		'pdf-color-conversion'
	);
	if (styleElement) {
		styleElement.remove();
	}

	// Restore hidden elements
	const elementsToShow = document.querySelectorAll(
		'.no-print, nav, footer, button:not(.print-button)'
	);

	elementsToShow.forEach((el) => {
		(el as HTMLElement).style.display = '';
	});

	// Reset body and html
	document.body.style.height = '';
	document.documentElement.style.height = '';

	// Reset main content
	const main = document.querySelector('main');
	if (main) {
		main.style.height = '';
		main.style.maxHeight = '';
		main.style.overflow = '';
	}
}
/**
 * Generate PDF for specific day
 */
export async function generateDayPDF(
	dayIndex: number,
	viewMode: 'single' | 'timeline' = 'single'
): Promise<void> {
	return generateEnhancedClientPDF({ viewMode, dayIndex });
}

/**
 * Generate PDF for overview
 */
export async function generateOverviewPDF(): Promise<void> {
	return generateEnhancedClientPDF({ viewMode: 'overview' });
}
