<script lang="ts">
    import { Router } from "sv-router";
    import "./router";
    import { settings, applyTheme, applyDefaultHomePage, applyStartOfTheWeek, applySendNotifications } from "./shared/settings.svelte";

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

    $effect(() => {
        settings.sendNotifications;
        applySendNotifications();
    })
</script>

<Router base="#" />