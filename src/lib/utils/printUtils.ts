/**
 * Print optimization utilities for the Viking Itinerary app
 * Dynamically adjusts content scaling based on content size
 */

export interface PrintConfig {
	viewMode: 'single' | 'timeline' | 'overview';
	contentHeight: number;
	scale: number;
}

/**
 * Calculate optimal print scale based on content height
 */
export function calculatePrintScale(
	contentHeight: number,
	maxHeight: number = 750
): number {
	if (contentHeight <= maxHeight) return 1;

	// Calculate scale to fit content within one page
	const scale = maxHeight / contentHeight;

	// Don't scale below 0.4 (40%) as text becomes unreadable
	return Math.max(0.4, Math.min(1, scale));
}

/**
 * Apply dynamic print optimizations
 */
export function optimizeForPrint(
	viewMode: 'single' | 'timeline' | 'overview'
): PrintConfig {
	const mainContent = document.querySelector('main');
	if (!mainContent) return { viewMode, contentHeight: 0, scale: 1 };

	// Get actual content height
	const contentHeight = mainContent.scrollHeight;
	const scale = calculatePrintScale(contentHeight);

	// Apply scaling to the print container
	const printContainer = document.querySelector('.print-single-page');
	if (printContainer instanceof HTMLElement) {
		printContainer.style.setProperty(
			'--print-scale',
			scale.toString()
		);
	}

	return {
		viewMode,
		contentHeight,
		scale,
	};
}

/**
 * Get print-specific recommendations
 */
export function getPrintRecommendations(
	config: PrintConfig
): string[] {
	const recommendations: string[] = [];

	if (config.scale < 0.7) {
		recommendations.push(
			'Content is dense - consider switching to a different view mode for better readability'
		);
	}

	if (config.viewMode === 'overview' && config.scale < 0.8) {
		recommendations.push(
			'Overview mode works best when printed in landscape orientation'
		);
	}

	if (config.viewMode === 'single' && config.contentHeight > 1000) {
		recommendations.push(
			'This day has many activities - timeline view might be more compact'
		);
	}

	if (config.scale < 0.5) {
		recommendations.push(
			'Consider printing fewer items or splitting across multiple pages'
		);
	}

	return recommendations;
}

/**
 * Print with optimizations
 */
export function printWithOptimization(
	viewMode: 'single' | 'timeline' | 'overview'
): void {
	// Apply optimizations
	const config = optimizeForPrint(viewMode);

	// Add printing class
	document.body.classList.add('printing');

	// Scroll to top
	window.scrollTo(0, 0);

	// Wait for styles to apply then print
	setTimeout(() => {
		window.print();

		// Clean up
		setTimeout(() => {
			document.body.classList.remove('printing');
		}, 1000);
	}, 300);
}
