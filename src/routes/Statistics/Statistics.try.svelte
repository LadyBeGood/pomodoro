<!-- 

<div class="overflow-auto h-svh w-svw no-scrollbar snap-y snap-mandatory text-(--luxury-white) ">
    <div class="h-svh snap-start snap-always"></div>
    <div class="h-svh snap-start snap-always"></div>
    <div class="h-svh snap-start snap-always"></div>
    <div class="h-svh snap-start snap-always"></div>
</div> -->



<!-- 
<script lang="ts">
    import { onMount, tick } from "svelte";
    import Chart from "chart.js/auto";
    import Calendar from "../../components/Calendar.svelte";

    let weeklyCanvas: HTMLCanvasElement;

    onMount(() => {
        let weekly: Chart<any>;

        // Colours dont work lol, all black
        setTimeout(() => {
            const white = getComputedStyle(document.documentElement).getPropertyValue("--luxury-white").trim();
            const black = getComputedStyle(document.documentElement).getPropertyValue("--blackout").trim();
    
            Chart.defaults.font.family = getComputedStyle(document.body).fontFamily;
            Chart.defaults.font.size = 12;
            Chart.defaults.color = white + "99";


            const tooltip = {
                displayColors: false,
                backgroundColor: black,
                titleColor: white,
                bodyColor: white,
                cornerRadius: 0,
                caretSize: 0,
                padding: 10,
            };

            weekly = new Chart(weeklyCanvas, {
                type: "bar",
                data: {
                    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                    datasets: [
                        {
                            label: "Hours",
                            data: [3.2, 4.5, 2.1, 5, 3.8, undefined, undefined],
                            backgroundColor: [white + "90", white + "90", white + "90 "  , white + "90", white + "90", white + "90", white + "90"],
                            borderRadius: Infinity,
                            borderSkipped: false,
                            barThickness: 35,
                        },
                        {
                            label: "Start time",
                            type: "line",
                            data: [5.6, 5.1, 3.5, 6.3, 5, undefined, undefined],
                            borderColor: "#FAFAFA",
                            backgroundColor: "transparent",
                            order: 0
                        },
                        {
                            label: "Start time",
                            type: "line",
                            data: [0.5, 1, 0.8, 1.2, 0.6, undefined, undefined],
                            borderColor: "#FAFAFA",
                            backgroundColor: "transparent",
                            order: -1,
                        },
                    ],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    // layout: { padding: { top: 80 } },
                    plugins: { 
                        legend: { 
                            display: false 
                        }, 
                        tooltip 
                    },
                    scales: {
                        x: { grid: { display: false }, border: { display: false } },
                        y: { display: false, beginAtZero: true },
                    },
                },
            });
        })

        

        return () => {
            weekly.destroy();
        };
    });




    
    let canvasElement: HTMLCanvasElement;
    let chart: Chart;

    const data = [
        { hour: 5,  count: Math.floor(Math.random() * 9) },
        { hour: 6,  count: Math.floor(Math.random() * 9) },
        { hour: 8,  count: Math.floor(Math.random() * 9) },
        { hour: 9,  count: Math.floor(Math.random() * 9) },
        { hour: 10, count: Math.floor(Math.random() * 9) },
        { hour: 11, count: Math.floor(Math.random() * 9) },
        { hour: 12, count: Math.floor(Math.random() * 9) },
        { hour: 13, count: Math.floor(Math.random() * 9) },
        { hour: 14, count: Math.floor(Math.random() * 9) },
        { hour: 15, count: Math.floor(Math.random() * 9) },
        { hour: 16, count: Math.floor(Math.random() * 9) },
        { hour: 17, count: Math.floor(Math.random() * 9) },
        { hour: 18, count: Math.floor(Math.random() * 9) },
        { hour: 19, count: Math.floor(Math.random() * 9) },
        { hour: 20, count: Math.floor(Math.random() * 9) },
        { hour: 21, count: Math.floor(Math.random() * 9) },
        { hour: 22, count: Math.floor(Math.random() * 9) },
        { hour: 23, count: Math.floor(Math.random() * 9) },
        { hour: 24, count: Math.floor(Math.random() * 9) },
        { hour: 1,  count: Math.floor(Math.random() * 9) },
        { hour: 2,  count: Math.floor(Math.random() * 9) },
        { hour: 3,  count: Math.floor(Math.random() * 9) },
        { hour: 4,  count: Math.floor(Math.random() * 9) },
    ];

    $effect(() => {
        chart = new Chart(canvasElement, {
            type: "line",
            data: {
                labels: data.map((row) => row.hour),
                datasets: [
                    {
                        // label: "{display: false}",
                        data: data.map((row) => row.count),
                        backgroundColor: "#FAFAFA",
                        borderColor: "#FAFAFA",
                        tension: 0.4,
                        
                        fill: {
                            target: "origin",
                            above: "#FAFAFA20",
                        },
                        
                    },
                ],
            },
            options: {
                plugins: {
                    legend: {display: false}
                },
                responsive: true, 
                maintainAspectRatio: false,
                scales: {
                    x: {grid: {display: false}},
                    y: {grid: {display: false}}
                },
            }
        });

        return () => {
            chart.destroy();
        };
    });



</script>

<div class="overflow-auto h-svh w-svw no-scrollbar snap-y snap-mandatory text-(--luxury-white)!">
    <div class="h-svh snap-start snap-always py-24 px-8 flex flex-col justify-center gap-12">
        <div class="grid place-items-center pl-1 ">
            <canvas bind:this={canvasElement}></canvas>
        </div>

        <div class="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
            <p class="text-right text-(--luxury-white)/60">Focus time</p>
            <p>4h 30m</p>
            <p class="text-right text-(--luxury-white)/60">Break time</p>
            <p>38m</p>
            <p class="text-right text-(--luxury-white)/60">Focus sessions</p>
            <p>9</p>
            <p class="text-right text-(--luxury-white)/60">Break sessions</p>
            <p>8</p>
        </div>
    </div>

    <div class="h-svh snap-start snap-always py-24 px-8 flex flex-col justify-center gap-12">
        <div class="relative h-[30svh] shrink-0">
            <canvas bind:this={weeklyCanvas}></canvas>
        </div>

        <div class="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
            <p class="text-right text-(--luxury-white)/60">Time focused</p>
            <p>21h 34m</p>
            <p class="text-right text-(--luxury-white)/60">Sessions</p>
            <p>63</p>
            <p class="text-right text-(--luxury-white)/60">Daily average</p>
            <p>3h 05m</p>
            <p class="text-right text-(--luxury-white)/60">Best day</p>
            <p>Thursday</p>
            <p class="text-right text-(--luxury-white)/60">Current streak</p>
            <p>6 days</p>
            <p class="text-right text-(--luxury-white)/60">Vs last week</p>
            <p>+12%</p>
        </div>
    </div>

    <div class="h-svh snap-start snap-always py-24 px-8 flex flex-col justify-center gap-12">
        <div class="min-h-[30svh] shrink-0 flex items-center">
            <div class="w-full">
                <Calendar />
            </div>
        </div>

        <div class="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
            <p class="text-right text-(--luxury-white)/60">Time focused</p>
            <p>82h 10m</p>
            <p class="text-right text-(--luxury-white)/60">Sessions</p>
            <p>241</p>
            <p class="text-right text-(--luxury-white)/60">Active days</p>
            <p>22 of 31</p>
            <p class="text-right text-(--luxury-white)/60">Best day</p>
            <p>Oct 9</p>
            <p class="text-right text-(--luxury-white)/60">Current streak</p>
            <p>6 days</p>
            <p class="text-right text-(--luxury-white)/60">Longest streak</p>
            <p>19 days</p>
        </div>
    </div>

    <div class="h-svh snap-start snap-always py-24 px-8 flex flex-col justify-center gap-12">
        <div class="grid grid-cols-4 gap-x-3 gap-y-5 shrink-0">
            {#each ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] as month, m}
                <div class="flex flex-col gap-2">
                    <p class="text-xs text-(--luxury-white)/60">{month}</p>
                    <div class="grid grid-cols-7 gap-0.5">
                        {#each { length: 30 } as _, d}
                            <span
                                class="aspect-square rounded-full bg-(--luxury-white)"
                                style="opacity: {[0.1, 0.1, 0.3, 0.55, 1, 0.3, 0.1][(m + d * 3) % 7]};"
                            ></span>
                        {/each}
                    </div>
                </div>
            {/each}
        </div>

        <div class="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
            <p class="text-right text-(--luxury-white)/60">Time focused</p>
            <p>912h 40m</p>
            <p class="text-right text-(--luxury-white)/60">Sessions</p>
            <p>2,104</p>
            <p class="text-right text-(--luxury-white)/60">Active days</p>
            <p>241</p>
            <p class="text-right text-(--luxury-white)/60">Best month</p>
            <p>October</p>
            <p class="text-right text-(--luxury-white)/60">Longest streak</p>
            <p>19 days</p>
            <p class="text-right text-(--luxury-white)/60">Vs last year</p>
            <p>+31%</p>
        </div>
    </div>
</div> -->


<script lang="ts">
    import Daily from "./Daily.svelte";
    import Weekly from "./Weekly.svelte";
    import Monthly from "./Monthly.svelte";
    import Yearly from "./Yearly.svelte";
</script>

<div class="overflow-auto h-svh w-svw no-scrollbar snap-y snap-mandatory text-(--luxury-white)!">
    <Daily />
    <Weekly />
    <Monthly />
    <Yearly />
</div>