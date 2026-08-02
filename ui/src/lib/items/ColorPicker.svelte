<!-- native <input type="color">, zero-dependency, styled like pulsar_hud's Confirm/Input dialogs since this is a transient popover -->
<script lang="ts">
	import { untrack } from 'svelte';
	import { Nui } from '../nui';
	import type { ColorPickerItem, RGB } from '../types';

	let { item }: { item: ColorPickerItem } = $props();

	let currColor = $state(untrack(() => item.options.current));
	let showPicker = $state(false);
	let tColor = $state(untrack(() => item.options.current));

	function toHex({ r, g, b }: RGB): string {
		const c = (n: number) => n.toString(16).padStart(2, '0');
		return `#${c(r)}${c(g)}${c(b)}`;
	}

	function fromHex(hex: string): RGB {
		return {
			r: Number.parseInt(hex.slice(1, 3), 16),
			g: Number.parseInt(hex.slice(3, 5), 16),
			b: Number.parseInt(hex.slice(5, 7), 16),
		};
	}

	function onOpen() {
		if (item.options.disabled) return;
		tColor = currColor;
		showPicker = true;
	}

	function onSave() {
		currColor = tColor;
		Nui.selected(item.id, { color: currColor });
		showPicker = false;
	}
</script>

<button
	type="button"
	class="item"
	class:disabled={item.options.disabled}
	style:background="rgb({currColor.r}, {currColor.g}, {currColor.b})"
	onclick={onOpen}
>
	<span class="swatch-label">Select Color : rgb({currColor.r}, {currColor.g}, {currColor.b})</span>
</button>

{#if showPicker}
	<div
		class="backdrop"
		onclick={() => (showPicker = false)}
		onkeydown={(e) => e.key === 'Escape' && (showPicker = false)}
		role="button"
		tabindex="-1"
		aria-label="Close dialog"
	>
		<div class="dialog" onclick={(e) => e.stopPropagation()} onkeydown={(e) => e.stopPropagation()} role="dialog" aria-modal="true" tabindex="-1">
			<div class="title">Select Color</div>
			<input type="color" value={toHex(tColor)} oninput={(e) => (tColor = fromHex((e.target as HTMLInputElement).value))} />
			<div class="actions">
				<button type="button" class="btn btn-ghost" onclick={() => (showPicker = false)}>Cancel</button>
				<button type="button" class="btn btn-primary" onclick={onSave}>Save Color</button>
			</div>
		</div>
	</div>
{/if}

<style>
	.item {
		width: 100%;
		padding: 1vh 1.1vw;
		border: var(--border-subtle);
		border-radius: var(--radius);
		font-size: 1.05vmin;
		font-weight: 600;
		text-align: center;
		color: #ffffff;
		text-shadow: 0 1px 3px rgba(0, 0, 0, 0.8);
		cursor: pointer;
	}

	.item.disabled {
		opacity: 0.35;
		pointer-events: none;
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
		width: 22vw;
		background: var(--color-bg-panel);
		border: var(--border-subtle);
		border-radius: var(--radius);
		padding: 2vh 1.6vw;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1.4vh;
	}

	.title {
		font-family: var(--font-heading);
		font-size: 1.4vmin;
		color: var(--color-text);
	}

	input[type='color'] {
		width: 100%;
		height: 6vh;
		border: var(--border-subtle);
		border-radius: var(--radius);
		background: transparent;
		cursor: pointer;
	}

	.actions {
		display: flex;
		justify-content: flex-end;
		gap: 0.8vw;
		width: 100%;
	}

	.btn {
		border: var(--border-subtle);
		background: transparent;
		padding: 0.7vh 1.2vw;
		font-size: 1.05vmin;
		cursor: pointer;
		border-radius: var(--radius);
		color: var(--color-text-muted);
		font-family: inherit;
	}

	.btn-ghost:hover {
		color: var(--color-text);
	}

	.btn-primary {
		color: var(--color-text);
		border-color: rgba(139, 92, 246, 0.5);
		background: rgba(139, 92, 246, 0.18);
	}

	.btn-primary:hover {
		background: rgba(139, 92, 246, 0.32);
	}
</style>
