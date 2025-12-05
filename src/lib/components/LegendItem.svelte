<script lang="ts">
	interface Props {
		color: 'excursion' | 'cultural' | 'travel' | 'meals' | 'free';
		label: string;
	}

	let { color, label }: Props = $props();

	const colorMap = {
		excursion: 'from-amber-100 to-amber-200 border-amber-400',
		cultural: 'from-purple-100 to-purple-200 border-purple-400',
		travel: 'from-sky-100 to-sky-200 border-sky-400',
		meals: 'from-red-100 to-orange-200 border-red-400',
		free: 'from-lime-100 to-lime-200 border-lime-400',
	};
</script>

<div class="flex items-center gap-1">
	<div class="w-4 h-4 bg-gradient-to-br {colorMap[color]} border rounded"></div>
	<span>{label}</span>
</div>
