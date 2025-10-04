#!/usr/bin/env node

/**
 * Simple test to verify PDF generation is working
 */

import fetch from 'node-fetch';
import fs from 'fs';

async function testPDFGeneration() {
	console.log('🧪 Testing PDF generation...');

	try {
		const response = await fetch(
			'http://localhost:5173/api/generate-pdf',
			{
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ viewMode: 'single', dayIndex: 0 }),
			}
		);

		if (response.ok) {
			const pdfBuffer = await response.arrayBuffer();
			fs.writeFileSync('test-output.pdf', Buffer.from(pdfBuffer));
			console.log('✅ PDF generated successfully!');
			console.log(
				`📄 Size: ${(pdfBuffer.byteLength / 1024).toFixed(1)} KB`
			);
			console.log('📁 Saved as: test-output.pdf');
		} else {
			console.error(
				'❌ PDF generation failed:',
				response.status,
				response.statusText
			);
		}
	} catch (error) {
		console.error('❌ Error:', error.message);
		console.log(
			'💡 Make sure the dev server is running on http://localhost:5173'
		);
	}
}

testPDFGeneration();
