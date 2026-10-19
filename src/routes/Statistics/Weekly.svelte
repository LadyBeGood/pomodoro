<script lang="ts">
    import Chart from "chart.js/auto";
    import { settings } from "../../shared/settings.svelte";

    let canvas: HTMLCanvasElement;

    $effect(() => {
        settings.theme;
        let chart: Chart<any> | undefined;

        const myInterval = setInterval(() => {
            const white = getComputedStyle(canvas).getPropertyValue("--luxury-white").trim();
            const black = getComputedStyle(canvas).getPropertyValue("--blackout").trim();
            const grey = getComputedStyle(canvas).getPropertyValue("--dravit-grey").trim();
            if (white === "" || black === "" || grey === "") return;
            clearInterval(myInterval);

            Chart.defaults.font.family = getComputedStyle(document.body).fontFamily;
            Chart.defaults.font.size = 12;
            Chart.defaults.color = white + "99";
            Chart.defaults.font.weight = "bold";

            chart = new Chart(canvas, {
                type: "bar",
                data: {
                    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                    datasets: [
                        {
                            label: "Hours",
                            data: [3.2, 4.5, 2.1, 5, 3.8, undefined, undefined],
                            backgroundColor: white,
                            borderRadius: Infinity,
                            borderSkipped: false,
                            barThickness: 35,
                        }
                    ],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { display: false },
                        tooltip: {
                            displayColors: false,
                            titleAlign: "center",
                            bodyColor: white,
                            cornerRadius: 10,
                            caretSize: 10,
                            padding: 10,
                            backgroundColor: black,
                            borderWidth: 1.5,
                            borderColor: grey,
                        },
                    },
                    scales: {
                        x: { grid: { display: false }, border: { display: false } },
                        y: { display: false, beginAtZero: true },
                    },
                },
            });
        }, 250);


        return () => {
            clearInterval(myInterval);
            chart?.destroy();
        };
    });
</script>

<div class="h-svh snap-start snap-always py-24 px-8 flex flex-col justify-center gap-6">
    <div class="relative h-[30svh] shrink-0">
        <canvas bind:this={canvas}></canvas>
    </div>


    <div class="flex gap-2 bg-(--luxury-white) rounded-full px-1 py-1">
        <button
            title="Previous month"
            class="hover:bg-(--blackout) hover:text-(--luxury-white) text-(--blackout) rounded-full p-1.5 transition-colors"
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6" /></svg>
        </button>

        <div class="flex text-(--blackout) text-sm items-center gap-2 font-medium ml-auto mr-auto">
            <div>20 - 24</div>
        </div>

        <button
            title="Next month"
            class="bg-(--luxury-white) text-(--blackout) rounded-full p-1.5 hover:bg-(--blackout) hover:text-(--luxury-white) transition-colors"
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="m9 18 6-6-6-6" />
            </svg>
        </button>
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