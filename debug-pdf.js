#!/usr/bin/env node

/**
 * Debug PDF generation to see content capture
 * Usage: node debug-pdf.js
 */

import puppeteer from 'puppeteer';

async function debugPDFContent() {
	console.log('🔍 Debugging PDF content capture...');

	const browser = await puppeteer.launch({
		headless: false, // Show browser for debugging
		args: ['--no-sandbox', '--disable-setuid-sandbox'],
	});

	try {
		const page = await browser.newPage();

		// Set a large viewport
		await page.setViewport({
			width: 1200,
			height: 3000,
			deviceScaleFactor: 1,
		});

		// Go to the app in single day view
		const url =
			'http://localhost:5173?viewMode=single&dayIndex=0&printMode=true';
		console.log(`📍 Navigating to: ${url}`);

		await page.goto(url, {
			waitUntil: 'networkidle0',
			timeout: 30000,
		});

		await page.waitForFunction(
			() => document.readyState === 'complete'
		);

		await new Promise((resolve) => setTimeout(resolve, 3000));

		// Debug content
		const debugInfo = await page.evaluate(() => {
			const main = document.querySelector('main');
			if (!main) return { error: 'No main element found' };

			// Count different types of content
			const allDivs = main.querySelectorAll('div').length;
			const activityCards = main.querySelectorAll('.bg-white').length;
			const timeSlots = main.querySelectorAll(
				'.space-y-4 > div, .space-y-6 > div'
			).length;
			const allChildren = main.children.length;

			// Get text content to see what's actually there
			const textContent = main.textContent?.slice(0, 500) + '...';

			return {
				scrollHeight: main.scrollHeight,
				offsetHeight: main.offsetHeight,
				clientHeight: main.clientHeight,
				allDivs,
				activityCards,
				timeSlots,
				allChildren,
				textContent,
				innerHTML: main.innerHTML.slice(0, 1000) + '...',
			};
		});

		console.log('📊 Content debug info:', debugInfo);

		// Take a screenshot for comparison
		await page.screenshot({
			path: 'debug-content.png',
			fullPage: true,
		});
		console.log('📸 Screenshot saved as debug-content.png');

		// Keep browser open for manual inspection
		console.log(
			'🔍 Browser kept open for inspection. Press Ctrl+C when done.'
		);
		await new Promise(() => {}); // Keep running
	} catch (error) {
		console.error('❌ Debug failed:', error);
	} finally {
		await browser.close();
	}
}

debugPDFContent();
