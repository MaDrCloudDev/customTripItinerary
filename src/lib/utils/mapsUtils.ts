export const createGoogleMapsUrl = (location: string): string => {
	const encodedLocation = encodeURIComponent(location);
	return `https://www.google.com/maps/search/?api=1&query=${encodedLocation}`;
};

export const openGoogleMaps = (location: string): void => {
	const url = createGoogleMapsUrl(location);
	window.open(url, '_blank', 'noopener,noreferrer');
};
