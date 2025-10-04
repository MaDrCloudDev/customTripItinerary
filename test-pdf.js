#!/usr/bin/env node

/**
 * Test script for PDF generation functionality
 * Usage: node test-pdf.js
 */

import { generatePDF } from '../src/lib/utils/pdfGenerator.js';
import fs from 'fs';
import path from 'path';

async function testPDFGeneration() {
	console.log('Testing PDF generation...');

	try {
		// Test generating a PDF for day 1
		const pdfBuffer = await generatePDF('http://localhost:5173', {
			viewMode: 'single',
			dayIndex: 0,
		});

		// Save the PDF to test directory
		const testDir = path.join(process.cwd(), 'test-output');
		if (!fs.existsSync(testDir)) {
			fs.mkdirSync(testDir);
		}

		const outputPath = path.join(testDir, 'test-day-1.pdf');
		fs.writeFileSync(outputPath, pdfBuffer);

		console.log('✅ PDF generated successfully!');
		console.log(`📄 Saved to: ${outputPath}`);
		console.log(
			`📊 Size: ${(pdfBuffer.length / 1024).toFixed(2)} KB`
		);
	} catch (error) {
		console.error('❌ PDF generation failed:', error.message);
		console.log(
			'\n💡 Make sure the development server is running on http://localhost:5173'
		);
	}
}

testPDFGeneration();
