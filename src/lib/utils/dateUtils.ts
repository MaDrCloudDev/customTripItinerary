export const formatDate = (dateStr: string) => {
	const date = new Date(dateStr);
	return date.toLocaleDateString('en-US', {
		weekday: 'long',
		month: 'long',
		day: 'numeric',
	});
};

export const formatTime = (time: string) => {
	const [hours, minutes] = time.split(':');
	const hour = parseInt(hours);
	const ampm = hour >= 12 ? 'PM' : 'AM';
	const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
	return `${displayHour}:${minutes} ${ampm}`;
};

export const calculateDuration = (
	startTime: string,
	endTime: string
) => {
	const start = new Date(`2000-01-01T${startTime}:00`);
	const end = new Date(`2000-01-01T${endTime}:00`);
	const diffMs = end.getTime() - start.getTime();
	const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
	const diffMinutes = Math.floor(
		(diffMs % (1000 * 60 * 60)) / (1000 * 60)
	);

	if (diffHours === 0) {
		return `${diffMinutes}min`;
	} else if (diffMinutes === 0) {
		return `${diffHours}hr`;
	} else {
		return `${diffHours}hr ${diffMinutes}min`;
	}
};
