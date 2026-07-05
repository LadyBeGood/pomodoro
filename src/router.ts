// sv-router
import { createRouter } from 'sv-router';

// components
import Statistics from "./components/Statistics.svelte";
import Home from "./components/Home.svelte";
import Tasks from "./components/Tasks.svelte";
import Layout from "./components/Layout.svelte";
import Settings from './components/Settings.svelte';
import Music from './components/Music.svelte';


export const { p, navigate, isActive, route } = createRouter({
    "/": {
        "/": Home,
        "/statistics": Statistics,
        "/tasks": Tasks,
        layout: Layout
    },
    "/settings": Settings,
    "/music": Music
});



