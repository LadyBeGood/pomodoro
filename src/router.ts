import { createRouter } from "sv-router";

import Layout from "./components/Layout.svelte";
import Statistics from "./routes/Statistics.svelte";
import Home from "./routes/Home.svelte";
import Tasks from "./routes/Tasks.svelte";
import Settings from "./routes/Settings.svelte";
import Music from "./routes/Music.svelte";


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



