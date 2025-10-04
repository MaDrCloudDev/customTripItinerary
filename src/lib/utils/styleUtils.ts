import type { TimeSlot } from '../types/itinerary.js';

export const getColorClass = (slot: TimeSlot) => {
	const colorClasses = {
		excursion:
			'bg-gradient-to-br from-blue-100 to-blue-200 border-blue-400 text-blue-900 shadow-blue-200/50',
		dining:
			'bg-gradient-to-br from-orange-100 to-orange-200 border-orange-400 text-orange-900 shadow-orange-200/50',
		cultural:
			'bg-gradient-to-br from-purple-100 to-purple-200 border-purple-400 text-purple-900 shadow-purple-200/50',
		nature:
			'bg-gradient-to-br from-green-100 to-green-200 border-green-400 text-green-900 shadow-green-200/50',
		free: 'bg-gradient-to-br from-gray-100 to-gray-200 border-gray-400 text-gray-700 shadow-gray-200/50',
		travel:
			'bg-gradient-to-br from-yellow-100 to-yellow-200 border-yellow-400 text-yellow-900 shadow-yellow-200/50',
		meals:
			'bg-gradient-to-br from-red-100 to-red-200 border-red-400 text-red-900 shadow-red-200/50',
	};

	return colorClasses[slot.color] || colorClasses.free;
};
