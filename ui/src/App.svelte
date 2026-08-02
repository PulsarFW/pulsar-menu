<script lang="ts">
	import { onMount } from 'svelte';
	import { attachMessageListener } from './lib/messages';
	import Menu from './lib/Menu.svelte';

	onMount(() => attachMessageListener());
</script>

<main>
	<Menu />
</main>

<style>
	main {
		position: relative;
		width: 100vw;
		height: 100vh;
		overflow: hidden;
	}
</style>
