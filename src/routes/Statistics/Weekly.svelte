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
                            data: [3.2, 4.5, 2.1, 7, 3.8, undefined, undefined],
                            backgroundColor: white,
                            borderRadius: Infinity,
                            borderSkipped: false,
                            barThickness: 32,
                        },
                        {
                            label: "Start time",
                            type: "line",
                            data: [0.5, 1, 0.8, 1.2, 0.6, undefined, undefined],
                            borderColor: grey,
                            backgroundColor: white,
                            order: -1,
                        },
                        {
                            label: "End time",
                            type: "line",
                            data: [5.6, 5.1, 3.5, 6.3, 5, undefined, undefined],
                            borderColor: grey,
                            backgroundColor: white,
                            order: -1,
                        },
                    ],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { 
                            display: false
                        },
                        tooltip: {
                            displayColors: false,
                            titleAlign: "center",
                            bodyColor: white,
                            cornerRadius: 10,
                            caretSize: 0,
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

<div class="h-full max-w-100 mx-auto snap-start snap-always pt-24 pb-36 px-8 flex flex-col justify-center gap-6">
    <div class="relative h-[50%] shrink-0">
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
            <div>21 - 28 Oct</div>
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



    <div>
        <div class="grid grid-cols-2 gap-x-6 gap-y-4 text-sm">
            <div class="text-right">
                <p class="text-right text-(--luxury-white)/60">Total focus time</p>
                <p>21h 34m</p>
            </div>
            <div class="text-left">
                <p class="text-(--luxury-white)/60">Daily average</p>
                <p>3h 05m</p>
            </div>
        </div>

        <div class="grid grid-cols-2 gap-x-6 gap-y-4 text-sm mt-4">
            <div class="text-right">
                <p class="text-right text-(--luxury-white)/60">Active days</p>
                <p>6 of 7</p>
            </div>
            <div class="text-sm text-left">
                <p class="text-(--luxury-white)/70">Best day</p>
                <p>Friday</p>
            </div>
        </div>
    </div>
</div>