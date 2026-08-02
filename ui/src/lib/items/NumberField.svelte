<!-- Named NumberField, not Number, to avoid shadowing the JS Number global -->
<script lang="ts">
	import { untrack } from 'svelte';
	import { Nui } from '../nui';
	import type { NumberItem } from '../types';

	let { item }: { item: NumberItem } = $props();

	let value = $state(untrack(() => item.options.current ?? ''));

	function onInput(e: Event) {
		value = (e.target as HTMLInputElement).value;
		Nui.selected(item.id, { value });
	}
</script>

<div class="item" class:disabled={item.options.disabled}>
	<span class="label">{item.label}</span>
	<input
		type="number"
		{value}
		oninput={onInput}
		disabled={item.options.disabled}
		min={item.options.min}
		max={item.options.max}
		step={item.options.step ?? 1}
	/>
</div>

<style>
	.item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 1vh 1.1vw;
	}

	.item.disabled {
		opacity: 0.35;
		pointer-events: none;
	}

	.label {
		font-size: 1.1vmin;
		color: rgba(232, 232, 236, 0.75);
	}

	input {
		width: 5vw;
		text-align: center;
		background: rgba(232, 232, 236, 0.05);
		border: var(--border-subtle);
		border-radius: var(--radius);
		padding: 0.5vh 0.4vw;
		font-size: 1.05vmin;
		color: var(--color-primary-light);
		font-weight: 600;
	}

	input:focus {
		outline: none;
		border-color: var(--color-primary);
	}
</style>
