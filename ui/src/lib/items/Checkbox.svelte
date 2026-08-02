<script lang="ts">
	import { untrack } from 'svelte';
	import { Nui } from '../nui';
	import Icon from '../Icon.svelte';
	import type { CheckboxItem } from '../types';

	let { item }: { item: CheckboxItem } = $props();

	let selected = $state(untrack(() => item.options.selected));

	function onClick() {
		if (item.options.disabled) return;
		selected = !selected;
		Nui.frontEndSound('SELECT');
		Nui.selected(item.id, { selected });
	}
</script>

<button type="button" class="item" class:disabled={item.options.disabled} onclick={onClick}>
	<Icon name={selected ? 'square-check' : 'square'} size="1.1vmin" />
	<span class="label">{item.label}</span>
</button>

<style>
	.item {
		display: flex;
		align-items: center;
		gap: 0.7vw;
		width: 100%;
		padding: 1vh 1.1vw;
		color: inherit;
		background: transparent;
		border: none;
		font-family: inherit;
		text-align: left;
		cursor: pointer;
		border-radius: var(--radius);
		transition: background 120ms ease;
	}

	.item:hover {
		background: rgba(139, 92, 246, 0.08);
	}

	.item:hover .label {
		color: var(--color-text);
		font-weight: 600;
	}

	.item.disabled {
		opacity: 0.35;
		pointer-events: none;
	}

	.label {
		font-size: 1.1vmin;
		color: rgba(232, 232, 236, 0.75);
		line-height: 1;
		transition: color 120ms ease;
	}

	.item :global(svg) {
		color: var(--color-primary-light);
		flex-shrink: 0;
	}
</style>
