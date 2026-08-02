<!-- non-interactive text/heading block, options.classes is a small class-name vocabulary Lua callers pass, e.g. {"heading", "center"} -->
<script lang="ts">
	import DOMPurify from 'dompurify';
	import type { TextItem } from '../types';

	let { item }: { item: TextItem } = $props();

	const classes = $derived((item.options.classes ?? []).join(' '));
</script>

<div class="text {classes}">{@html DOMPurify.sanitize(item.label)}</div>

<style>
	.text {
		text-align: left;
		font-size: 1.1vmin;
		line-height: 1.6;
		color: rgba(232, 232, 236, 0.9);
		padding: 0.5vh 1.1vw;
	}

	.text :global(.heading) {
		font-size: 1.6vmin;
		font-weight: 700;
		padding-bottom: 1vh;
		border-bottom: var(--border-subtle);
		margin-bottom: 0.4vh;
	}

	.text :global(.textSmall) {
		font-size: 0.85vmin;
		opacity: 0.8;
	}

	.text :global(.textMedium) {
		font-size: 1.1vmin;
	}

	.text :global(.textLarge) {
		font-size: 1.4vmin;
		font-weight: 600;
	}

	.text :global(.textExtraLarge) {
		font-size: 1.8vmin;
		font-weight: 700;
	}

	.text :global(.code) {
		font-family: 'Courier New', monospace;
		background: rgba(0, 0, 0, 0.3);
		padding: 0.2vh 0.4vw;
		border-radius: var(--radius);
		border: var(--border-subtle);
	}

	:global(.left) {
		text-align: left;
	}

	:global(.center) {
		text-align: center;
	}

	:global(.right) {
		text-align: right;
	}

	:global(.bold) {
		font-weight: 700;
	}

	:global(.pad) {
		padding: 1vh 1vw;
		background: rgba(232, 232, 236, 0.05);
		border-radius: var(--radius);
		border: var(--border-subtle);
	}

	:global(.colorPrimary) {
		color: var(--color-primary-light);
	}

	:global(.colorError) {
		color: var(--color-error);
	}

	:global(.colorWarning) {
		color: var(--color-warning);
	}

	:global(.colorSuccess) {
		color: var(--color-success);
	}
</style>
