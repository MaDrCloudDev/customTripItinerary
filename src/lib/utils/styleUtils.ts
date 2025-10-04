import type { TimeSlot } from '../types/itinerary.js';

// Beautiful warm color mapping
export const getColorClass = (slot: TimeSlot) => {
	const colorClasses = {
		excursion:
			'bg-gradient-to-br from-blue-100 to-indigo-200 border-blue-300 text-blue-800 shadow-blue-200/50',
		dining:
			'bg-gradient-to-br from-orange-100 to-amber-200 border-orange-300 text-orange-800 shadow-orange-200/50',
		cultural:
			'bg-gradient-to-br from-purple-100 to-violet-200 border-purple-300 text-purple-800 shadow-purple-200/50',
		nature:
			'bg-gradient-to-br from-emerald-100 to-green-200 border-emerald-300 text-emerald-800 shadow-emerald-200/50',
		free: 'bg-gradient-to-br from-gray-100 to-slate-200 border-gray-300 text-gray-700 shadow-gray-200/50',
		travel:
			'bg-gradient-to-br from-yellow-100 to-amber-200 border-yellow-300 text-yellow-800 shadow-yellow-200/50',
		meals:
			'bg-gradient-to-br from-rose-100 to-pink-200 border-rose-300 text-rose-800 shadow-rose-200/50',
	};

	return colorClasses[slot.color] || colorClasses.free;
};
