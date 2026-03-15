<script lang="ts">
    import Footer from "./Footer.svelte";
    import Header from "./Header.svelte";
    import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();
</script>


<Header />
{@render children()}
<Footer />