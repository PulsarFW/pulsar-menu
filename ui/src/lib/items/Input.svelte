<script lang="ts">
	import { untrack } from 'svelte';
	import { Nui } from '../nui';
	import type { InputItem } from '../types';

	let { item }: { item: InputItem } = $props();

	let value = $state(untrack(() => item.options.current ?? ''));

	function onInput(e: Event) {
		value = (e.target as HTMLTextAreaElement).value;
		Nui.selected(item.id, { value });
	}
</script>

<div class="item" class:disabled={item.options.disabled}>
	<span class="label">{item.label}</span>
	<textarea rows="2" {value} oninput={onInput} disabled={item.options.disabled} maxlength={item.options.max}></textarea>
</div>

<style>
	.item {
		padding: 1vh 1.1vw;
	}

	.item.disabled {
		opacity: 0.35;
		pointer-events: none;
	}

	.label {
		display: block;
		font-size: 1.1vmin;
		color: rgba(232, 232, 236, 0.75);
		margin-bottom: 0.5vh;
	}

	textarea {
		width: 100%;
		resize: none;
		background: rgba(232, 232, 236, 0.05);
		border: var(--border-subtle);
		border-radius: var(--radius);
		padding: 0.6vh 0.6vw;
		font-size: 1.05vmin;
		color: var(--color-text);
	}

	textarea:focus {
		outline: none;
		border-color: var(--color-primary);
	}
</style>
