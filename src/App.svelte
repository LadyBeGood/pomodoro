<script lang="ts">
    import { Router } from "sv-router";
    import "./router";
    import { settings, applyTheme, applyDefaultHomePage, applyStartOfTheWeek } from "./shared/settings.svelte";

    $effect(() => {
        settings.theme;
        applyTheme();
    })

    $effect(() => {
        settings.defaultHomePage;
        applyDefaultHomePage();
    })

    $effect(() => {
        settings.startOfTheWeek;
        applyStartOfTheWeek();
    })
</script>

<Router base="#" />