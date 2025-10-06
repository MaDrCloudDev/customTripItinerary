import { DATE_FORMAT_OPTIONS } from '../constants.js';

export const formatDate = (dateStr: string): string => {
	try {
		if (!dateStr || dateStr.trim().length === 0) {
			throw new Error('Empty date string provided');
		}

		// Parse the date string manually to avoid timezone issues
		const [year, month, day] = dateStr.split('-').map(Number);
		const date = new Date(year, month - 1, day); // month is 0-indexed

		if (isNaN(date.getTime())) {
			throw new Error(`Invalid date string: ${dateStr}`);
		}

		const formatted = date.toLocaleDateString(
			DATE_FORMAT_OPTIONS.LOCALE,
			DATE_FORMAT_OPTIONS.LONG_DATE
		);

		return formatted;
	} catch (error) {
		console.error('Failed to format date:', error);

		return 'Invalid Date';
	}
};

export const formatTime = (time: string): string => {
	try {
		if (!time || !time.includes(':')) {
			throw new Error(`Invalid time format: ${time}`);
		}

		const [hours, minutes] = time.split(':');
		const hour = parseInt(hours, 10);

		if (isNaN(hour) || hour < 0 || hour > 23) {
			throw new Error(`Invalid hour: ${hours}`);
		}

		const ampm = hour >= 12 ? 'PM' : 'AM';

		const displayHour =
			hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;

		const formatted = `${displayHour}:${minutes} ${ampm}`;

		return formatted;
	} catch (error) {
		console.error('Failed to format time:', error);

		return 'Invalid Time';
	}
};

const normalizeTimeFormat = (time: string): string => {
	if (!time || !time.includes(':')) {
		throw new Error(`Invalid time format for normalization: ${time}`);
	}

	const [hours, minutes] = time.split(':');
	if (!hours || !minutes) {
		throw new Error(`Invalid time components: ${time}`);
	}

	const paddedHours = hours.padStart(2, '0');
	const paddedMinutes = minutes.padStart(2, '0');
	return `${paddedHours}:${paddedMinutes}`;
};

export const calculateDuration = (
	startTime: string,
	endTime: string
): string => {
	try {
		if (!startTime || !endTime) {
			throw new Error('Start time and end time are required');
		}

		const normalizedStart = normalizeTimeFormat(startTime);
		const normalizedEnd = normalizeTimeFormat(endTime);

		const start = new Date(`2000-01-01T${normalizedStart}:00`);
		const end = new Date(`2000-01-01T${normalizedEnd}:00`);

		if (isNaN(start.getTime()) || isNaN(end.getTime())) {
			throw new Error(
				`Invalid time format: ${startTime} - ${endTime} (normalized: ${normalizedStart} - ${normalizedEnd})`
			);
		}

		const diffMs = end.getTime() - start.getTime();

		if (diffMs < 0) {
			return '0min';
		}

		const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
		const diffMinutes = Math.floor(
			(diffMs % (1000 * 60 * 60)) / (1000 * 60)
		);

		let formatted: string;
		if (diffHours === 0) {
			formatted = `${diffMinutes}min`;
		} else if (diffMinutes === 0) {
			formatted = `${diffHours}hr`;
		} else {
			formatted = `${diffHours}hr ${diffMinutes}min`;
		}

		return formatted;
	} catch (error) {
		console.error('Failed to calculate duration:', error);

		return '0min';
	}
};
