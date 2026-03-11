<script lang="ts">
    // State for the calendar
    let date = new Date();
    let currMonth = date.getMonth();
    let currYear = date.getFullYear();

    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
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
</script>

<div class="h-full w-full bg-luxury-white rounded-3xl">
    <div class="flex items-center rounded-tl-2xl rounded-tr-2xl justify-between pl-4 pr-2 py-1">
        <p class="text-md text-blackout">
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
    </div>


    <div class="m-2 mt-0">
        <div class="grid grid-cols-7 bg-blackout">
            {#each daysOfWeek as day}
                <div class="text-center text-xs font-semibold text-dravit-grey  tracking-wider py-2">
                    {day}
                </div>
            {/each}
        </div>

        <div class="grid grid-cols-7 gap-1 tabular-nums bg-blackout text-luxury-white rounded-b-2xl">
            {#each allDays as { day, current }}
                <div class="
                    aspect-square text-sm rounded-full grid place-items-center transition-all cursor-pointer hover:bg-dravit-grey hover:text-luxury-white
                    {current && isToday(day) ? 'bg-luxury-white text-blackout!' : ''}
                "> 
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