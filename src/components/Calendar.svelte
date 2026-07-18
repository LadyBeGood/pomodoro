<script lang="ts">
    // State for the calendar
    let date = new Date();
    let currMonth = date.getMonth();
    let currYear = date.getFullYear();

    // const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const daysOfWeek = ["S", "M", "T", "W", "T", "F", "S"];
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    // Reactive logic to calculate the grid
    $: daysInMonth = new Date(currYear, currMonth + 1, 0).getDate();
    $: firstDayOfMonth = new Date(currYear, currMonth, 1).getDay();

    // Previous month's trailing days
    $: prevMonthLastDay = new Date(currYear, currMonth, 0).getDate();
    $: paddingDays = Array.from({ length: firstDayOfMonth }, (_, i) => ({
        day: /* prevMonthLastDay - firstDayOfMonth + i + 1 */ "",
        current: false,
    }));

    // Current month's days
    $: currentDays = Array.from({ length: daysInMonth }, (_, i) => ({
        day: i + 1,
        current: true,
    }));

    // Total grid (to keep a consistent 6-row look, you can add trailing days if needed)
    $: allDays = [...paddingDays, ...currentDays];

    function nextMonth() {
        if (currMonth === 11) {
            currMonth = 0;
            currYear++;
        } else {
            currMonth++;
        }
    }

    function prevMonth() {
        if (currMonth === 0) {
            currMonth = 11;
            currYear--;
        } else {
            currMonth--;
        }
    }

    const isToday = (day: number) => {
        const today = new Date();
        return (
            day === today.getDate() &&
            currMonth === today.getMonth() &&
            currYear === today.getFullYear()
        );
    };

    // const heatmap2 = [
    //     [0, 1, 0, 2, 1, 0, 3],
    //     [2, 3, 1, 0, 2, 1, 2],
    //     [1, 2, 3, 4, 2, 1, 0],
    //     [0, 1, 2, 2, 3, 2, 1],
    //     [1, 0, 1, 3, 4, 2, 2],
    //     [2, 1, 0, 2, 3, 4, 3],
    //     [3, 2, 1, 1, 2, 3, 4],
    //     [2, 1, 2, 0, 1, 2, 3],
    //     [1, 0, 1, 2, 2, 3, 2],
    //     [0, 1, 2, 3, 4, 3, 2],
    //     [1, 2, 3, 2, 1, 0, 1],
    //     [2, 3, 4, 3, 2, 1, 0],
    //     [3, 2, 1, 2, 3, 4, 2],
    //     [2, 1, 0, 1, 2, 3, 1],
    //     [1, 2, 3, 4, 2, 1, 0],
    //     [0, 1, 2, 3, 4, 3, 2],
    // ];

    const opacity = ["10", "30", "70", "100"];
</script>

<div class="h-full w-full rounded-3xl">
    <!-- <div class="flex items-center rounded-tl-2xl rounded-tr-2xl justify-between pl-4 pr-2 py-1">
        <p class="text-md text-luxury-white">
            {months[currMonth]}, {currYear}
        </p>
        <div class="flex space-x-2">
            <button on:click={prevMonth} class="p-2 hover:bg-slate-200 rounded-full transition-colors text-dravit-grey" title="previous month">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6" /></svg>
            </button>
            <button on:click={nextMonth} class="p-2 hover:bg-slate-200 rounded-full transition-colors text-dravit-grey" title="next month">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6" /></svg>
            </button>
        </div>
    </div> -->

    <div class="flex gap-2 mb-4 bg-luxury-white rounded-full px-3 py-1">
        <button  on:click={prevMonth} title="previous month" class="hover:bg-blackout hover:text-luxury-white text-blackout rounded-full p-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6" /></svg>
        </button>

        <div class="flex text-blackout text-sm items-center gap-2 font-medium ml-auto mr-auto">
            <!-- <div>
                <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="currentColor"><path d="M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-40q0-17 11.5-28.5T280-880q17 0 28.5 11.5T320-840v40h320v-40q0-17 11.5-28.5T680-880q17 0 28.5 11.5T720-840v40h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Z"/></svg>
            </div> -->
            <div>
                {months[currMonth]}, {currYear}
            </div>
        </div>

        <button on:click={nextMonth} title="next month" class=" bg-luxury-white rounded-full p-1.5 hover:bg-blackout hover:text-luxury-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6" /></svg>
        </button>
    </div>


    <div class="m-2 mt-0">
        <!-- <div class="grid grid-cols-7 bg-blackout">
            {#each daysOfWeek as day}
                <div class="text-center text-xs font-semibold text-dravit-grey  tracking-wider py-2">
                    {day}
                </div>
            {/each}
        </div> -->

        <div class="grid grid-cols-7 gap-1 tabular-nums bg-blackout text-luxury-white rounded-b-2xl">
            {#each allDays as { day, current }}
                {@const randIdx = Math.floor(Math.random() * opacity.length)}
                <div class="overlay
                    aspect-square font-medium text-sm grid place-items-center transition-all cursor-pointer relative bg-luxury-white/(--bg-opacity) 
                    {current && isToday(+day) ? 'rounded-full' : ''}
                "
                    style="
                        --bg: {day === "" ? "transparent" : `color-mix(in srgb, #fafafa ${opacity[randIdx]}%, #1f1f1f ${100 - +opacity[randIdx]}%)`};
                        --br: {isToday(+day) ? "999px" : "0"};
                        background-color: {day === "" ? "transparent" : `rgba(250, 250, 250, ${opacity[randIdx]}%)`}; 
                        color: {randIdx >= 2 ? "var(--color-blackout)" : "var(--color-luxury-white)"};
                    "
                > 
                    {day}
                </div>
            {/each}
        </div>
    </div>
    
</div>

<!-- 



    <div class="p-4">
        <div class="grid grid-cols-7 mb-2">
            {#each daysOfWeek as day}
                <div class="text-center text-xs font-semibold text-slate-400  tracking-wider py-2"
                > {day}
                </div>
            {/each}
        </div>

        <div class="grid grid-cols-7 gap-1">
            {#each allDays as { day, current }}
                <div class="aspect-square flex items-center justify-center text-sm rounded-lg transition-all cursor-pointer
          {current     ? 'text-slate-700 hover:bg-indigo-50 hover:text-indigo-600'     : 'text-slate-300'}
          {current && isToday(day)     ? 'bg-indigo-600 !text-white font-bold shadow-md shadow-indigo-200'     : ''}"
                > {day}
                </div>
            {/each}
        </div>
    </div>

-->

<style>
    /* .overlay::before {
        background-color: var(--bg) !important;
        border-radius: var(--br);
    } */
</style>