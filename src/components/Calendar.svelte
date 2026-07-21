<script lang="ts">
    /*==============================*/
    /* Types                        */
    /*==============================*/
    type CalendarDay = {
        day: number | string,
        current: boolean,
        isToday: boolean,
        isFuture: boolean,
    }

    /*==============================*/
    /* Constants                    */
    /*==============================*/
    const daysOfWeek = [
        "Sun", 
        "Mon", 
        "Tue", 
        "Wed", 
        "Thu", 
        "Fri", 
        "Sat",
    ];

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

    const opacities = ["10", "30", "70", "100"];


    /*==============================*/
    /* States                       */
    /*==============================*/
    let currentDate = $state(new Date());
    let currMonth = $state(currentDate.getMonth());
    let currYear = $state(currentDate.getFullYear());

    const daysInMonth = $derived(new Date(currYear, currMonth + 1, 0).getDate());
    const firstDayOfMonth = $derived(new Date(currYear, currMonth, 1).getDay());
    const allDays = $derived.by<CalendarDay[]>(() => {
        const today = new Date();
        const targetToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());

        // Empty padding blocks representing trailing weeks
        const padding: CalendarDay[] = Array.from({ length: firstDayOfMonth }, () => ({
            day: "",
            current: false,
            isToday: false,
            isFuture: true,
        }));

        // Active day tracks
        const active: CalendarDay[] = Array.from({ length: daysInMonth }, (_, i) => {
            const dayNumber = i + 1;
            const evalDate = new Date(currYear, currMonth, dayNumber);

            return {
                day: dayNumber,
                current: true,
                isToday: dayNumber === today.getDate() && currMonth === today.getMonth() && currYear === today.getFullYear(),
                isFuture: evalDate > targetToday,
            };
        });

        return [...padding, ...active];
    });

    /*==============================*/
    /* Handlers                     */
    /*==============================*/
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
</script>

<div class="h-full w-full rounded-3xl">
    <!-- Header Navigation Section -->
    <div class="flex gap-2 bg-luxury-white rounded-full px-1 py-1">
        <button onclick={prevMonth} title="previous month" class="hover:bg-blackout hover:text-luxury-white text-blackout rounded-full p-1.5 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6" /></svg>
        </button>

        <div class="flex text-blackout text-sm items-center gap-2 font-medium ml-auto mr-auto">
            <div>{months[currMonth]}, {currYear}</div>
        </div>

        <button onclick={nextMonth} title="next month" class="bg-luxury-white rounded-full p-1.5 hover:bg-blackout hover:text-luxury-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6" /></svg>
        </button>
    </div>

    <!-- Calendar Grid Body -->
    <div>
        <div class="grid grid-cols-7 my-2">
            {#each daysOfWeek as day}
                <div class="text-center text-xs font-semibold text-luxury-white tracking-wider py-2">
                    {day}
                </div>
            {/each}
        </div>

        <div class="grid grid-cols-7 gap-1 tabular-nums bg-blackout text-luxury-white rounded-b-2xl">
            {#each allDays as item}
                {@const randomId = Math.floor(Math.random() * opacities.length)}

                <div class="overlay aspect-square font-medium text-sm grid place-items-center transition-all cursor-pointer relative
                    {item.isToday ? "rounded-full border-luxury-white" : "rounded-xs"}"
                    style="
                        background-color: {item.day === "" || item.isFuture ? "transparent" : `rgba(250, 250, 250, ${opacities[randomId]}%)`}; 
                        color: {randomId >= opacities.length / 2 && !item.isFuture ? "var(--color-blackout)" : "var(--color-luxury-white)"};
                    "
                > 
                    {item.day}
                </div>
            {/each}
        </div>        
    </div>
</div>