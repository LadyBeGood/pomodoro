<script lang="ts">
    import { Router } from "sv-router";
    import "./router";
    import { settings, applyTheme, applyDefaultHomePage } from "./shared/settings.svelte";

    $effect(() => {
        settings.theme;
        applyTheme();
    })
    $effect(() => {
        settings.defaultHomePage;
        applyDefaultHomePage();
    })
</script>

<Router base="#" />