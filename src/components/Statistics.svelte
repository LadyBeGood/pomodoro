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

<div class="w-full h-full pt-22 pb-28 overflow-y-auto flex flex-col gap-10 px-4">
    <div>
        <div class="flex gap-2 mb-8 bg-luxury-white rounded-full px-3 py-1">
            <div class="flex text-blackout text-sm items-center gap-2 cursor-pointer">
                <div>
                    <!-- <svg xmlns="http://www.w3.org/2000/svg" height="22px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M289-329q-29-29-29-71t29-71q29-29 71-29t71 29q29 29 29 71t-29 71q-29 29-71 29t-71-29ZM200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-40q0-17 11.5-28.5T280-880q17 0 28.5 11.5T320-840v40h320v-40q0-17 11.5-28.5T680-880q17 0 28.5 11.5T720-840v40h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Z"/></svg> -->
                     <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="currentColor"><path d="M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-40q0-17 11.5-28.5T280-880q17 0 28.5 11.5T320-840v40h320v-40q0-17 11.5-28.5T680-880q17 0 28.5 11.5T720-840v40h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Z"/></svg>
                </div>
                <div>
                    March 10, 2026
                </div>
            </div>

            <div class="ml-auto hover:bg-dravit-grey hover:text-luxury-white text-blackout  rounded-full p-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M680-160q-17 0-28.5-11.5T640-200v-200q0-17 11.5-28.5T680-440h80q17 0 28.5 11.5T800-400v200q0 17-11.5 28.5T760-160h-80Zm-240 0q-17 0-28.5-11.5T400-200v-560q0-17 11.5-28.5T440-800h80q17 0 28.5 11.5T560-760v560q0 17-11.5 28.5T520-160h-80Zm-240 0q-17 0-28.5-11.5T160-200v-360q0-17 11.5-28.5T200-600h80q17 0 28.5 11.5T320-560v360q0 17-11.5 28.5T280-160h-80Z"/></svg>
            </div>
            <div class="bg-blackout text-luxury-white rounded-full p-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M97-280q0-17 13-30l213-213q23-23 57-23t57 23l103 103 256-289q11-13 28.5-13t29.5 12q11 11 11.5 26.5T855-656L596-364q-23 26-57 27.5T480-360L380-460 170-250q-13 13-30 13t-30-13q-13-13-13-30Z"/></svg>
            </div>
        </div>
        <div class="grid place-items-center pl-1 ">
            <canvas bind:this={canvasElement}></canvas>
        </div>
    </div>
</div>
