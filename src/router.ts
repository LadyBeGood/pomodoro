// sv-router
import { createRouter } from 'sv-router';

// components
import DashBoard from "./components/DashBoard.svelte";
import Timer from "./components/Timer.svelte";
import Schedule from "./components/Schedule.svelte";
import Layout from "./components/Layout.svelte";
import Settings from './components/Settings.svelte';
import Music from './components/Music.svelte';


export const { p, navigate, isActive, route } = createRouter({
    "/": {
        "/": Timer,
        "/dashboard": DashBoard,
        "/schedule": Schedule,
        layout: Layout
    },
    "/settings": Settings,
    "/music": Music
});

