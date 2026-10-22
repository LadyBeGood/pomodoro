<script lang="ts">
    import Chart from "chart.js/auto";
    import { settings } from "../../shared/settings.svelte"; 

    let canvas: HTMLCanvasElement;

    const hours = [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 0, 1, 2, 3, 4];
    const data = hours.map((hour) => ({ hour, count: Math.floor(Math.random() * 9) }));

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
                type: "line",
                data: {
                    labels: data.map((row) => row.hour),
                    datasets: [
                        {
                            label: "Hours",
                            data: data.map((row) => row.count),
                            backgroundColor: white,
                            borderColor: white,
                            tension: 0.4,
                            fill: { target: "origin", above: white + "20" },
                        },
                    ],
                },
                options: {
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
                            boxPadding: 20,
                        }
                    },
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        x: { grid: { display: false } },
                        y: { grid: { display: false } },
                    }
                },
            });
        }, 250);        

        return () => {
            clearInterval(myInterval);
            chart?.destroy();
        }
    });
</script>

<div class="h-svh snap-start snap-always  pt-24 pb-36 px-8 flex flex-col justify-center gap-6">
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
            <div>28 Oct</div>
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
        <p>4h 30m</p>
        <p class="text-right text-(--luxury-white)/60">Break time</p>
        <p>38m</p>
        <p class="text-right text-(--luxury-white)/60">Sessions</p>
        <p>9</p>
        <p class="text-right text-(--luxury-white)/60">Breaks</p>
        <p>8</p>
    </div>
</div>