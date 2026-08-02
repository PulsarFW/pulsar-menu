<!-- sends FrontEndSound(BACK) + Selected{id}, then goBack() handles the nav-stack update, see store/menu.svelte.ts -->
<script lang="ts">
	import { Nui } from '../nui';
	import Icon from '../Icon.svelte';
	import { goBack } from '../store/menu.svelte';
	import type { GoBackItem } from '../types';

	let { item }: { item: GoBackItem } = $props();

	function onClick() {
		if (item.options.disabled) return;
		Nui.frontEndSound('BACK');
		Nui.selected(item.id);
		goBack();
	}
</script>

<button type="button" class="item" class:disabled={item.options.disabled} onclick={onClick}>
	<Icon name="chevron-left" size="0.9vmin" />
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
		background: rgba(229, 72, 77, 0.08);
	}

	.item:hover .label {
		color: var(--color-text);
		font-weight: 600;
	}

	.item:hover :global(svg) {
		color: var(--color-error);
	}

	.item.disabled {
		opacity: 0.35;
		pointer-events: none;
	}

	.label {
		flex: 1;
		font-size: 1.1vmin;
		color: rgba(232, 232, 236, 0.75);
		line-height: 1;
		transition: color 120ms ease;
	}

	.item :global(svg) {
		color: rgba(232, 232, 236, 0.35);
		flex-shrink: 0;
		transition: color 120ms ease;
	}
</style>
