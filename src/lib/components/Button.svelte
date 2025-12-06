<script lang="ts">
	import type { Snippet } from 'svelte';

	type ButtonVariant = 'primary' | 'secondary' | 'active' | 'icon' | 'icon-active' | 'nav';

	interface Props {
		variant?: ButtonVariant;
		disabled?: boolean;
		type?: 'button' | 'submit' | 'reset';
		onclick?: () => void;
		onkeydown?: (e: KeyboardEvent) => void;
		class?: string;
		children?: Snippet;
	}

	let { 
		variant = 'primary', 
		disabled = false, 
		type = 'button', 
		onclick, 
		class: className = '', 
		onkeydown,
		children
	}: Props = $props();

	const variantClasses = {
		primary: 'px-3 py-2 rounded-full bg-gradient-to-r from-blue-700 to-blue-800 text-white font-medium disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-lg hover:scale-105',
		secondary: 'px-3 py-1.5 text-xs rounded-full font-medium transition-all duration-300 bg-blue-200 text-blue-800 hover:bg-blue-300',
		active: 'px-3 py-1.5 text-xs rounded-full font-medium transition-all duration-300 bg-gradient-to-r from-blue-700 to-blue-800 text-white shadow-md',
		icon: 'px-3 py-2 text-xs rounded-lg font-medium transition-all duration-300 flex flex-col items-center gap-0.5 min-w-[70px] bg-blue-200 text-blue-800 hover:bg-blue-300',
		'icon-active': 'px-3 py-2 text-xs rounded-lg font-medium transition-all duration-300 flex flex-col items-center gap-0.5 min-w-[70px] bg-gradient-to-r from-blue-700 to-blue-800 text-white shadow-md',
		nav: 'px-3 py-2 rounded-full font-medium transition-all duration-300 flex items-center gap-2 flex-shrink-0 bg-gradient-to-r from-blue-700 to-blue-800 text-white disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed hover:shadow-lg hover:scale-105',
	};

	let baseClass = $derived(variantClasses[variant as keyof typeof variantClasses] || variantClasses.primary);
</script>

<button
	{type}
	{disabled}
	{onclick}
	{onkeydown}
	class="{baseClass} {className}"
>
	{@render children?.()}
</button>
