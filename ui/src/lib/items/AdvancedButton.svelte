<script lang="ts">
	import { Nui } from '../nui';
	import type { AdvancedButtonItem } from '../types';

	let { item }: { item: AdvancedButtonItem } = $props();

	function onClick() {
		if (item.options.disabled) return;
		Nui.frontEndSound('SELECT');
		Nui.selected(item.id);
	}
</script>

<button type="button" class="item" class:disabled={item.options.disabled} onclick={onClick}>
	<div class="dot"></div>
	<span class="label">{item.label}</span>
	<span class="secondary">{item.options.secondaryLabel}</span>
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

	.item:hover .dot {
		background: var(--color-primary);
	}

	.item:hover .label {
		color: var(--color-text);
		font-weight: 600;
	}

	.item.disabled {
		opacity: 0.35;
		pointer-events: none;
	}

	.dot {
		width: 5px;
		height: 5px;
		border-radius: 50%;
		background: rgba(232, 232, 236, 0.2);
		flex-shrink: 0;
		transition: background 120ms ease;
	}

	.label {
		flex: 1;
		font-size: 1.1vmin;
		color: rgba(232, 232, 236, 0.75);
		line-height: 1;
		transition: color 120ms ease;
	}

	.secondary {
		font-size: 0.95vmin;
		color: var(--color-primary-light);
		flex-shrink: 0;
	}
</style>
