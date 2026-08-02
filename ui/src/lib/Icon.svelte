<!-- hand-picks a small fixed icon set since lua never supplies a icon name for this resource -->
<script lang="ts">
	import {
		faChevronRight,
		faChevronLeft,
		faSquare,
		faSquareCheck,
		faXmark,
		faPalette,
		faCircleCheck,
		type IconDefinition,
	} from '@fortawesome/free-solid-svg-icons';

	const ICONS: Record<string, IconDefinition> = {
		'chevron-right': faChevronRight,
		'chevron-left': faChevronLeft,
		square: faSquare,
		'square-check': faSquareCheck,
		xmark: faXmark,
		palette: faPalette,
		'circle-check': faCircleCheck,
	};

	let { name, size = '1em' }: { name: string; size?: string } = $props();

	const icon = $derived(ICONS[name] ?? faSquare);
	const path = $derived(icon.icon[4] as string);
	const viewBox = $derived(`0 0 ${icon.icon[0]} ${icon.icon[1]}`);
</script>

<svg {viewBox} width={size} height={size} fill="currentColor" aria-hidden="true">
	<path d={path} />
</svg>
