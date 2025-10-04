import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const response = await resolve(event);

	// Add bot prevention headers
	response.headers.set(
		'X-Robots-Tag',
		'noindex, nofollow, noarchive, nosnippet, noimageindex, nocache'
	);
	response.headers.set('X-Frame-Options', 'DENY');
	response.headers.set('X-Content-Type-Options', 'nosniff');

	return response;
};
