import type { TimeSlot } from '../../app.d.ts';

export const getColorClass = (slot: TimeSlot): string => {
	const colorClasses = {
		excursion:
			'bg-gradient-to-br from-amber-100 to-amber-200 border-amber-400 text-amber-900 shadow-amber-200/50',
		dining:
			'bg-gradient-to-br from-orange-100 to-orange-200 border-orange-400 text-orange-900 shadow-orange-200/50',
		cultural:
			'bg-gradient-to-br from-purple-100 to-purple-200 border-purple-400 text-purple-900 shadow-purple-200/50',
		nature:
			'bg-gradient-to-br from-green-100 to-green-200 border-green-400 text-green-900 shadow-green-200/50',
		free: 'bg-gradient-to-br from-lime-100 to-lime-200 border-lime-400 text-lime-800 shadow-lime-200/50',
		travel:
			'bg-gradient-to-br from-sky-100 to-sky-200 border-sky-400 text-sky-900 shadow-sky-200/50',
		meals:
			'bg-gradient-to-br from-red-100 to-orange-200 border-red-400 text-red-900 shadow-red-200/50',
	} as const;

	return colorClasses[slot.color] || colorClasses.free;
};
