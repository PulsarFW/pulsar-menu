<!-- dragging the track only updates the local preview value, nothing sent to Lua until the save checkmark is clicked -->
<script lang="ts">
	import { untrack } from 'svelte';
	import { Nui } from '../nui';
	import Icon from '../Icon.svelte';
	import type { SliderItem } from '../types';

	let { item }: { item: SliderItem } = $props();

	let currValue = $state(untrack(() => item.options.current));
	let savedValue = $state(untrack(() => item.options.current));

	function onSave() {
		if (item.options.disabled || currValue === savedValue) return;
		savedValue = currValue;
		Nui.frontEndSound('SELECT');
		Nui.selected(item.id, { value: currValue });
	}
</script>

<div class="item" class:disabled={item.options.disabled}>
	<div class="row">
		<span class="label">{item.label}</span>
		{#if currValue !== savedValue}
			<button type="button" class="save" onclick={onSave} aria-label="Save"><Icon name="circle-check" size="1.1vmin" /></button>
		{/if}
	</div>
	<div class="track-row">
		<input
			type="range"
			min={item.options.min}
			max={item.options.max}
			step={item.options.step ?? 1}
			bind:value={currValue}
			disabled={item.options.disabled}
		/>
		<span class="value">{currValue}</span>
	</div>
</div>

<style>
	.item {
		padding: 1vh 1.1vw;
	}

	.item.disabled {
		opacity: 0.35;
		pointer-events: none;
	}

	.row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 0.6vh;
	}

	.label {
		font-size: 1.1vmin;
		color: rgba(232, 232, 236, 0.75);
	}

	.save {
		background: transparent;
		border: none;
		color: var(--color-success);
		cursor: pointer;
		display: flex;
		padding: 0;
	}

	.track-row {
		display: flex;
		align-items: center;
		gap: 0.6vw;
	}

	input[type='range'] {
		flex: 1;
		accent-color: var(--color-primary);
		height: 4px;
		cursor: pointer;
	}

	.value {
		font-size: 1vmin;
		color: var(--color-primary-light);
		min-width: 2vw;
		text-align: right;
	}
</style>
