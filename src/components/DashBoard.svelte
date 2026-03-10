<script lang="ts">
    import Chart from "chart.js/auto";
    import Calender from "./Calender.svelte";

    let canvasElement: HTMLCanvasElement;
    let chart: Chart;

    const data = [
        { hour: 1,  count: Math.floor(Math.random() * 9) },
        { hour: 2,  count: Math.floor(Math.random() * 9) },
        { hour: 3,  count: Math.floor(Math.random() * 9) },
        { hour: 4,  count: Math.floor(Math.random() * 9) },
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
    ];

    $effect(() => {
        chart = new Chart(canvasElement, {
            type: "line",
            data: {
                labels: data.map((row) => row.hour),
                datasets: [
                    {
                        label: "Hours",
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

<div class="w-full h-full pt-22 pb-28 overflow-y-auto flex flex-col gap-20">
    <div class="px-4">
        <Calender />
    </div>
    <div class="grid place-items-center pl-1">
        <canvas class="" bind:this={canvasElement}></canvas>
    </div>
</div>
