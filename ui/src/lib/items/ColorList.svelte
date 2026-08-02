<script lang="ts">
	import { untrack } from 'svelte';
	import { Nui } from '../nui';
	import Icon from '../Icon.svelte';
	import type { ColorListItem, ColorListEntry } from '../types';

	let { item }: { item: ColorListItem } = $props();

	let currentIndex = $state(untrack(() => item.options.current));
	let showList = $state(false);

	const selectedColor = $derived(item.options.colors[currentIndex]);

	function swatchCss(c: ColorListEntry): string {
		return c.rgb ? `rgb(${c.rgb.r}, ${c.rgb.g}, ${c.rgb.b})` : (c.hex ?? '#000');
	}

	function pick(index: number) {
		currentIndex = index;
		showList = false;
		Nui.selected(item.id, { color: item.options.colors[index] });
	}
</script>

<button type="button" class="item" class:disabled={item.options.disabled} onclick={() => (showList = !item.options.disabled && !showList)}>
	<div class="swatch" style:background={swatchCss(selectedColor)}></div>
	<span class="label">{selectedColor.label}</span>
	<Icon name="palette" size="0.9vmin" />
</button>

{#if showList}
	<div
		class="backdrop"
		onclick={() => (showList = false)}
		onkeydown={(e) => e.key === 'Escape' && (showList = false)}
		role="button"
		tabindex="-1"
		aria-label="Close dialog"
	>
		<div class="dialog" onclick={(e) => e.stopPropagation()} onkeydown={(e) => e.stopPropagation()} role="dialog" aria-modal="true" tabindex="-1">
			<div class="title">Select Color</div>
			<div class="grid">
				{#each item.options.colors as color, i (i)}
					<button type="button" class="option" onclick={() => pick(i)}>
						<div class="swatch" style:background={swatchCss(color)}></div>
						<span>{color.label}</span>
					</button>
				{/each}
			</div>
		</div>
	</div>
{/if}

<style>
	.item {
		display: flex;
		align-items: center;
		gap: 0.7vw;
		width: 100%;
		padding: 1vh 1.1vw;
		color: inherit;
		background: transparent;
		border: var(--border-subtle);
		border-radius: var(--radius);
		font-family: inherit;
		text-align: left;
		cursor: pointer;
	}

	.item:hover {
		border-color: rgba(139, 92, 246, 0.4);
	}

	.item.disabled {
		opacity: 0.35;
		pointer-events: none;
	}

	.label {
		flex: 1;
		font-size: 1.1vmin;
		color: rgba(232, 232, 236, 0.85);
	}

	.item :global(svg) {
		color: rgba(232, 232, 236, 0.35);
	}

	.swatch {
		width: 1.4vmin;
		height: 1.4vmin;
		border-radius: 50%;
		border: 1px solid rgba(232, 232, 236, 0.25);
		flex-shrink: 0;
	}

	.backdrop {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.6);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 150;
		pointer-events: auto;
	}

	.dialog {
		width: 26vw;
		max-height: 60vh;
		overflow-y: auto;
		background: var(--color-bg-panel);
		border: var(--border-subtle);
		border-radius: var(--radius);
		padding: 2vh 1.6vw;
	}

	.title {
		font-family: var(--font-heading);
		font-size: 1.4vmin;
		color: var(--color-text);
		margin-bottom: 1.4vh;
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 0.6vh 0.8vw;
	}

	.option {
		display: flex;
		align-items: center;
		gap: 0.6vw;
		padding: 0.7vh 0.8vw;
		background: rgba(232, 232, 236, 0.05);
		border: var(--border-subtle);
		border-radius: var(--radius);
		color: var(--color-text);
		font-family: inherit;
		font-size: 1vmin;
		cursor: pointer;
	}

	.option:hover {
		border-color: rgba(139, 92, 246, 0.5);
		background: rgba(139, 92, 246, 0.1);
	}
</style>
