<script lang="ts">
    import { Router } from "sv-router";
    import "./router";
    import { settings, applyTheme } from "./shared/settings.svelte";

    $effect(() => {
        settings.theme;
        applyTheme();
    })
    settings.theme = "dark"
</script>

<Router base="#" />