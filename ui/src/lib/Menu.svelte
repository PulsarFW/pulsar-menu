<script lang="ts">
	import { onMount, type Component } from 'svelte';
	import { appState, menuState, closeMenu } from './store/menu.svelte';
	import { DEFAULT_MENU_LABEL } from '../config';
	import { Nui } from './nui';
	import Icon from './Icon.svelte';

	import Button from './items/Button.svelte';
	import AdvancedButton from './items/AdvancedButton.svelte';
	import Checkbox from './items/Checkbox.svelte';
	import Slider from './items/Slider.svelte';
	import Ticker from './items/Ticker.svelte';
	import ColorPicker from './items/ColorPicker.svelte';
	import ColorList from './items/ColorList.svelte';
	import Input from './items/Input.svelte';
	import NumberField from './items/NumberField.svelte';
	import Select from './items/Select.svelte';
	import Text from './items/Text.svelte';
	import Submenu from './items/Submenu.svelte';
	import SubmenuBack from './items/SubmenuBack.svelte';
	import type { MenuItem } from './types';

	const COMPONENTS: Record<MenuItem['type'], Component<{ item: any }>> = {
		BUTTON: Button,
		ADVANCED: AdvancedButton,
		CHECKBOX: Checkbox,
		SLIDER: Slider,
		TICKER: Ticker,
		COLORPICKER: ColorPicker,
		COLORLIST: ColorList,
		INPUT: Input,
		NUMBER: NumberField,
		SELECT: Select,
		TEXT: Text,
		SUBMENU: Submenu,
		GOBACK: SubmenuBack,
	};

	let dragOffset = $state({ x: 0, y: 0 });
	let dragging = false;
	let dragStart = { x: 0, y: 0 };

	$effect(() => {
		if (appState.hidden) dragOffset = { x: 0, y: 0 };
	});

	function onPointerDown(e: PointerEvent) {
		dragging = true;
		dragStart = { x: e.clientX - dragOffset.x, y: e.clientY - dragOffset.y };
		(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
	}

	function onPointerMove(e: PointerEvent) {
		if (!dragging) return;
		dragOffset = { x: e.clientX - dragStart.x, y: e.clientY - dragStart.y };
	}

	function onPointerUp() {
		dragging = false;
	}

	onMount(() => {
		const onKey = (e: KeyboardEvent) => {
			if (appState.hidden) return;
			if (e.key === 'Escape') closeMenu();
			else if (e.key === 'Shift' && (document.activeElement as HTMLElement | null)?.tagName !== 'TEXTAREA') {
				Nui.toggleFocusLoss();
			}
		};
		window.addEventListener('keyup', onKey);
		return () => window.removeEventListener('keyup', onKey);
	});
</script>

{#if !appState.hidden && menuState.menu}
	<div class="panel" style:transform="translate({dragOffset.x}px, {dragOffset.y}px)">
		<div
			class="header"
			role="button"
			tabindex="-1"
			onpointerdown={onPointerDown}
			onpointermove={onPointerMove}
			onpointerup={onPointerUp}
		>
			<div>
				<div class="title">{menuState.menu.label || DEFAULT_MENU_LABEL}</div>
				<div class="accent"></div>
			</div>
			<button type="button" class="chip" onclick={closeMenu} aria-label="Close"><Icon name="xmark" size="1.1vmin" /></button>
		</div>

		<div class="divider"></div>

		<div class="list">
			{#if menuState.menu.items.length > 0}
				{#each menuState.menu.items as item (item.id)}
					{@const Cmp = COMPONENTS[item.type] ?? Button}
					<Cmp {item} />
				{/each}
			{:else}
				<div class="empty">Menu Has No Content</div>
			{/if}
		</div>
	</div>
{/if}

<style>
	.panel {
		position: absolute;
		top: 25px;
		left: 25px;
		width: 26vw;
		max-width: 420px;
		max-height: 80vh;
		display: flex;
		flex-direction: column;
		background: rgba(6, 6, 8, 0.99);
		border: var(--border-primary);
		border-radius: var(--radius);
		overflow: hidden;
		pointer-events: auto;
	}

	.header {
		flex-shrink: 0;
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		padding: 1.4vh 1.1vw 1.1vh;
		cursor: move;
		touch-action: none;
	}

	.title {
		font-size: 1.1vmin;
		font-weight: 700;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--color-text);
		line-height: 1;
		max-width: 20vw;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.accent {
		width: 1.6vw;
		height: 2px;
		background: var(--color-primary);
		margin-top: 0.6vh;
	}

	.chip {
		background: transparent;
		border: none;
		color: rgba(232, 232, 236, 0.45);
		cursor: pointer;
		padding: 0.2vh;
		display: flex;
		transition: color 120ms ease;
	}

	.chip:hover {
		color: var(--color-text);
	}

	.divider {
		height: 1px;
		background: rgba(232, 232, 236, 0.08);
		flex-shrink: 0;
	}

	.list {
		flex: 1;
		min-height: 0;
		overflow-y: auto;
		padding: 1vh 1.1vw;
		display: flex;
		flex-direction: column;
		gap: 0.6vh;
	}

	.empty {
		font-size: 1.1vmin;
		color: var(--color-error);
		text-align: center;
		padding: 1.4vh 0;
	}
</style>
