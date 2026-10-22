<script lang="ts">
    import Daily from "./Daily.svelte";
    import Weekly from "./Weekly.svelte";
    import Monthly from "./Monthly.svelte";
    import Yearly from "./Yearly.svelte";
</script>

<div class="overflow-auto h-svh no-scrollbar snap-y snap-mandatory text-(--luxury-white)!">
    <Daily />
    <Weekly />
    <Monthly />
    <!-- <Yearly /> -->
</div>