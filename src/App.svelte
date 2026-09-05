<script lang="ts">
    import { untrack } from "svelte";
    import { Router } from "sv-router";
    import "./router";
    import { settings, applyTheme, applyDefaultHomePage, applyStartOfTheWeek, applySendNotifications } from "./shared/settings.svelte";
    import { audio, music } from "./shared/music.svelte";

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



    $effect(() => {
        audio.src = `/white-noises/${music.activeWhiteNoise.file}`;
        audio.loop = true;
        if (untrack(() => music.isPlaying)) audio.play();
    })

    $effect(() => {
        localStorage.setItem("activeWhiteNoise", JSON.stringify(music.activeWhiteNoise));
    })

    $effect(() => {
        if (music.isPlaying) audio.play();
        else audio.pause();
    })
</script>

<Router base="#" />