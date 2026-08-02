<script lang="ts">
	import { untrack } from 'svelte';
	import { Nui } from '../nui';
	import Icon from '../Icon.svelte';
	import type { SelectItem } from '../types';

	let { item }: { item: SelectItem } = $props();

	let value = $state(untrack(() => item.options.current));
	let open = $state(false);
	let root: HTMLDivElement;

	const selected = $derived(item.options.list.find((o) => o.value === value));

	function pick(v: string | number) {
		value = v;
		open = false;
		Nui.selected(item.id, { value: v });
	}

	function onWindowClick(e: MouseEvent) {
		if (open && root && !root.contains(e.target as Node)) open = false;
	}
</script>

<svelte:window onclick={onWindowClick} />

<div class="item" class:disabled={item.options.disabled} bind:this={root}>
	<span class="label">{item.label}</span>
	<div class="dropdown">
		<button type="button" class="control" class:open onclick={() => (open = !open)} disabled={item.options.disabled}>
			<span>{selected?.label ?? '—'}</span>
			<Icon name="chevron-left" size="0.8vmin" />
		</button>
		{#if open}
			<div class="panel">
				{#each item.options.list as opt (opt.value)}
					<button type="button" class="option" class:active={opt.value === value} onclick={() => pick(opt.value)}>
						{opt.label}
					</button>
				{/each}
			</div>
		{/if}
	</div>
</div>

<style>
	.item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 1vh 1.1vw;
		position: relative;
	}

	.item.disabled {
		opacity: 0.35;
		pointer-events: none;
	}

	.label {
		font-size: 1.1vmin;
		color: rgba(232, 232, 236, 0.75);
	}

	.dropdown {
		position: relative;
		width: 10vw;
	}

	.control {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		background: rgba(232, 232, 236, 0.05);
		border: var(--border-subtle);
		border-radius: var(--radius);
		padding: 0.5vh 0.6vw;
		font-size: 1vmin;
		font-family: inherit;
		color: var(--color-text);
		cursor: pointer;
	}

	.control :global(svg) {
		transform: rotate(-90deg);
		transition: transform 120ms ease;
		color: rgba(232, 232, 236, 0.45);
	}

	.control.open :global(svg) {
		transform: rotate(90deg);
	}

	.panel {
		position: absolute;
		top: calc(100% + 0.4vh);
		left: 0;
		right: 0;
		z-index: 20;
		background: var(--color-bg-panel-alt);
		border: var(--border-subtle);
		border-radius: var(--radius);
		max-height: 20vh;
		overflow-y: auto;
		box-shadow: 0 0.8vh 2vh rgba(0, 0, 0, 0.5);
	}

	.option {
		display: block;
		width: 100%;
		padding: 0.6vh 0.6vw;
		background: transparent;
		border: none;
		font-family: inherit;
		color: var(--color-text);
		font-size: 1vmin;
		text-align: left;
		cursor: pointer;
	}

	.option:hover {
		background: rgba(139, 92, 246, 0.12);
	}

	.option.active {
		color: var(--color-primary-light);
	}
</style>
