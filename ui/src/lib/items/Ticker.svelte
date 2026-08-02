<!-- typing a value below min clamps down to min, not up to max. chevron buttons still wrap (left below min -> max, right above max -> min) -->
<script lang="ts">
	import { untrack } from 'svelte';
	import { Nui } from '../nui';
	import Icon from '../Icon.svelte';
	import type { TickerItem } from '../types';

	let { item }: { item: TickerItem } = $props();

	let value = $state(untrack(() => item.options.current));

	function commit(v: number, sound: 'UPDOWN' | 'SELECT' = 'UPDOWN') {
		value = v;
		Nui.frontEndSound(sound);
		Nui.selected(item.id, { value: v });
	}

	function onLeft() {
		if (item.options.disabled) return;
		const min = item.options.min ?? 0;
		commit(value - 1 < min ? item.options.max : value - 1);
	}

	function onRight() {
		if (item.options.disabled) return;
		const min = item.options.min ?? 0;
		commit(value + 1 > item.options.max ? min : value + 1);
	}

	function onInput(e: Event) {
		if (item.options.disabled) return;
		const raw = (e.target as HTMLInputElement).value;
		const min = item.options.min ?? 0;
		let v = Number.parseInt(raw, 10);
		if (Number.isNaN(v)) v = min;
		else if (v > item.options.max) v = item.options.max;
		else if (v < min) v = min;
		commit(v, 'SELECT');
	}
</script>

<div class="item" class:disabled={item.options.disabled}>
	<span class="label">{item.label}</span>
	<div class="controls">
		<button type="button" class="chevron" onclick={onLeft} aria-label="Decrease"><Icon name="chevron-left" size="0.9vmin" /></button>
		<input type="number" class="value" {value} oninput={onInput} min={item.options.min} max={item.options.max} disabled={item.options.disabled} />
		<span class="max">/ {item.options.max}</span>
		<button type="button" class="chevron" onclick={onRight} aria-label="Increase"><Icon name="chevron-right" size="0.9vmin" /></button>
	</div>
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

	.controls {
		display: flex;
		align-items: center;
		gap: 0.4vw;
	}

	.chevron {
		background: rgba(232, 232, 236, 0.05);
		border: none;
		color: rgba(232, 232, 236, 0.7);
		cursor: pointer;
		padding: 0.4vh;
		display: flex;
		border-radius: var(--radius);
		transition: color 120ms ease;
	}

	.chevron:hover {
		color: var(--color-primary-light);
	}

	.value {
		width: 3vw;
		text-align: center;
		background: transparent;
		border: none;
		border-bottom: var(--border-subtle);
		color: var(--color-primary-light);
		font-weight: 600;
		font-size: 1.05vmin;
	}

	.value:focus {
		outline: none;
		border-bottom-color: var(--color-primary);
	}

	.max {
		font-size: 0.95vmin;
		color: rgba(232, 232, 236, 0.45);
	}
</style>
