<script lang="ts">
	interface Props {
		icon: string;
		label: string;
		value: string;
	}

	let { icon, label, value }: Props = $props();
</script>

<div class="bg-white/20 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/30">
	<div class="text-2xl mb-2">{icon}</div>
	<div class="text-sm text-blue-100 font-medium">{label}</div>
	<div class="text-lg font-bold text-white">{value}</div>
</div>
