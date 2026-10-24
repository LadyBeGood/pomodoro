<script lang="ts">
    import Daily from "./Daily.svelte";
    import Weekly from "./Weekly.svelte";
    import Monthly from "./Monthly.svelte";
</script>

<div class="overflow-auto h-full w-full no-scrollbar snap-y snap-mandatory text-(--luxury-white)!">
    <Daily />
    <Weekly />
    <Monthly />
</div>