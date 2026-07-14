<script lang="ts">
    /*==============================*/
    /* Imports                      */
    /*==============================*/
    import { onMount } from "svelte";
    import { scrollIndex } from "./state.svelte";

    /*==============================*/
    /* Constants                    */
    /*==============================*/
    const localStorageKey = "pomodoro_timer_data";
    const focusDurationInSeconds = 1 * 10; // 25 minutes in seconds


    /*==============================*/
    /* States                       */
    /*==============================*/
    let savedTime = focusDurationInSeconds;

    const stored = localStorage.getItem(localStorageKey);
    if (stored !== null) {
        try {
            const parsed = JSON.parse(stored);
            if (parsed.timeLeft) {
                savedTime = parsed.timeLeft;
            }
        } catch (error) {
            console.error("Failed to parse timer storage", error);
        }
    }

    let timeLeft = $state(savedTime);
    let isRunning = $state(false);
    let intervalId: number | null = null;

    let minutes = $derived(Math.floor(timeLeft / 60).toString().padStart(2, "0"));
    let seconds = $derived((timeLeft % 60).toString().padStart(2, "0"));
    let progressPercent = $derived(((focusDurationInSeconds - timeLeft) / focusDurationInSeconds) * 100);

    /*==============================*/
    /* Refs                         */
    /*==============================*/
    let homeElement: HTMLDivElement;


    /*==============================*/
    /* Handlers                     */
    /*==============================*/
    function handleScroll() {
        const currentScroll = homeElement.scrollLeft;
        const maxScroll = homeElement.scrollWidth - homeElement.clientWidth;

        // Check if it is on the left side
        if (currentScroll <= maxScroll / 2) {
            scrollIndex.value = 1;
        } 
        
        // Check if is on the right side
        else if (currentScroll >= maxScroll / 2) {
            scrollIndex.value = 2;
        }
    }

    function startTimer() {
        if (isRunning) return;
        isRunning = true;
        
        intervalId = setInterval(() => {
            if (timeLeft > 1) {
                timeLeft--;
            } else {
                timeLeft--;
                setTimeout(() => {
                    alert("Pomodoro session finished!");
                    resetTimer();
                });
            }
        }, 1000);
    }

    function pauseTimer() {
        isRunning = false;
        if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
        }
    }

    function toggleTimer() {
        if (isRunning) {
            pauseTimer();
        } else {
            startTimer();
        }
    }

    function resetTimer() {
        pauseTimer();
        timeLeft = focusDurationInSeconds;
    }

    /*==============================*/
    /* Life cycles                  */
    /*==============================*/
    onMount(() => {
        if (scrollIndex.value === 1) {
            homeElement.scrollTo(0, 0);
        } else {
            homeElement.scrollTo(homeElement.clientWidth, 0)
        }
    })

    /*==============================*/
    /* Effects                      */
    /*==============================*/
    $effect(() => {
        localStorage.setItem(localStorageKey, JSON.stringify({ timeLeft }));
    });
</script>


<div 
    bind:this={homeElement} 
    onscroll={handleScroll} 
    class="flex overflow-auto w-svw no-scrollbar snap-x snap-mandatory"
>
    
    <div class="flex items-center justify-center shrink-0 flex-col gap-4 w-svw h-svh snap-start snap-always">
        <div
            class="text-luxury-white w-48 h-48 rounded-full p-2.5 relative uppercase"
            style="background: conic-gradient(var(--color-luxury-white) 0% {100 - progressPercent}%, var(--color-dravit-grey) 0 100%);"
        >
            <div class="h-2.5 w-2.5 absolute bg-luxury-white rounded-full left-1/2 top-0 -translate-x-1/2"></div>
            
            <div
                class="absolute h-full left-1/2 top-0 -translate-x-1/2"
                style="rotate: calc({100 - progressPercent} * 3.6deg);"
            >
                <div class="h-5 w-5 bg-luxury-white rounded-full -translate-y-1/4"></div>
            </div>
            
            <div class="h-full  w-full rounded-full bg-blackout grid place-items-center text-4xl">
                <p class="tabular-nums font-features-['calt']">
                    <!-- 
                     - This is a hack; `calt` font feature in Manrope font 
                     - is only triggered when `:` is immediately preceded 
                     - by a capital letter.
                     -->
                    {minutes}<span aria-hidden="true" class="text-transparent -ml-[1ch]">A</span>:{seconds}
                </p>
            </div>
        </div>

        <div class="relative flex justify-center gap-10">
            <button onclick={resetTimer} title="Restart" class="p-3 bg-luxury-white text-blackout rounded-full h-min">
                <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.06734 19.5173C6.05861 19.081 5.17997 18.4886 4.43141 17.7402C3.68284 16.9916 3.09047 16.113 2.65428 15.1042C2.21809 14.0954 2 13.0193 2 11.8762C2 11.554 2.11266 11.2803 2.33797 11.055C2.56343 10.8295 2.83723 10.7168 3.15937 10.7168C3.48137 10.7168 3.7551 10.8295 3.98056 11.055C4.20602 11.2803 4.31875 11.554 4.31875 11.8762C4.31875 13.5413 4.90062 14.9537 6.06437 16.1133C7.22827 17.273 8.64271 17.8528 10.3077 17.8528C11.9727 17.8528 13.3871 17.2709 14.551 16.107C15.7147 14.9432 16.2966 13.5289 16.2966 11.8639C16.2966 10.1988 15.7127 8.78639 14.5449 7.62672C13.3769 6.46705 11.9603 5.88722 10.2952 5.88722L9.70454 5.88479L10.7126 7.10837C10.9041 7.29985 10.9983 7.52669 10.995 7.7889C10.992 8.05111 10.8979 8.27795 10.7126 8.46943C10.5212 8.66091 10.2886 8.75825 10.015 8.76146C9.74147 8.76452 9.50893 8.67032 9.31745 8.47884L7.04919 5.55056C6.81658 5.31781 6.70028 5.04357 6.70028 4.72784C6.70028 4.41211 6.81658 4.13787 7.04919 3.90512L9.63279 1.28249C9.82427 1.09101 10.0568 0.996872 10.3304 1.00008C10.604 1.00329 10.8365 1.10471 11.028 1.30436C11.2132 1.49584 11.3053 1.7248 11.3043 1.99124C11.3034 2.25753 11.2072 2.48641 11.0157 2.67789L10.164 3.56847H10.2952C11.4467 3.56847 12.5269 3.78656 13.5358 4.22275C14.5445 4.65894 15.4252 5.25131 16.1778 5.99988C16.9305 6.74844 17.5249 7.62504 17.9611 8.62969C18.3973 9.63433 18.6154 10.7124 18.6154 11.8639C18.6154 13.0153 18.3973 14.0954 17.9611 15.1042C17.5249 16.113 16.9325 16.9916 16.184 17.7402C15.4354 18.4886 14.5568 19.081 13.548 19.5173C12.5393 19.9535 11.4592 20.1716 10.3077 20.1716C9.15619 20.1716 8.07607 19.9535 7.06734 19.5173Z" fill="currentColor"/></svg>
            </button>
            
            <button 
                onclick={toggleTimer} 
                title={isRunning ? "Pause" : "Play"} 
                class="bg-luxury-white text-blackout rounded-full p-3 mt-8 transition-transform active:scale-95"
            >
                {#if isRunning}
                    <svg xmlns="http://www.w3.org/2000/svg" height="42px" viewBox="0 -960 960 960" width="42px" fill="currentColor"><path d="M640-200q-33 0-56.5-23.5T560-280v-400q0-33 23.5-56.5T640-760q33 0 56.5 23.5T720-680v400q0 33-23.5 56.5T640-200Zm-320 0q-33 0-56.5-23.5T240-280v-400q0-33 23.5-56.5T320-760q33 0 56.5 23.5T400-680v400q0 33-23.5 56.5T320-200Z"/></svg>
                {:else}
                    <svg xmlns="http://www.w3.org/2000/svg" height="42px" viewBox="0 -960 960 960" width="42px" fill="currentColor"><path d="M320-273v-414q0-17 12-28.5t28-11.5q5 0 10.5 1.5T381-721l326 207q9 6 13.5 15t4.5 19q0 10-4.5 19T707-446L381-239q-5 3-10.5 4.5T360-233q-16 0-28-11.5T320-273Z"/></svg>
                    {/if} 
                </button>
                
                <button title="Next session" class="p-3 bg-luxury-white text-blackout rounded-full h-min transition-transform active:scale-95">
                    <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.9665 15.3696V5.63041C16.9665 5.30826 16.8537 5.03453 16.6283 4.80922C16.403 4.58376 16.1292 4.47103 15.8071 4.47103C15.4849 4.47103 15.2112 4.58376 14.9859 4.80922C14.7604 5.03453 14.6477 5.30826 14.6477 5.63041V15.3696C14.6477 15.6917 14.7604 15.9655 14.9859 16.1908C15.2112 16.4162 15.4849 16.529 15.8071 16.529C16.1292 16.529 16.403 16.4162 16.6283 16.1908C16.8537 15.9655 16.9665 15.6917 16.9665 15.3696ZM5.83494 15.3352L11.6309 11.4568C11.8033 11.3445 11.9327 11.2038 12.019 11.0346C12.1052 10.8653 12.1483 10.6871 12.1483 10.5C12.1483 10.3129 12.1052 10.1347 12.019 9.96537C11.9327 9.79621 11.8033 9.65548 11.6309 9.54319L5.83494 5.66475C5.73723 5.5981 5.6323 5.55129 5.52016 5.52431C5.40786 5.49733 5.29878 5.48384 5.19291 5.48384C4.88534 5.48384 4.61526 5.59088 4.38266 5.80497C4.14991 6.01891 4.03353 6.2984 4.03353 6.64344V14.3566C4.03353 14.7016 4.14991 14.9811 4.38266 15.195C4.61526 15.4091 4.88534 15.5162 5.19291 15.5162C5.29878 15.5162 5.40786 15.5027 5.52016 15.4757C5.6323 15.4487 5.73723 15.4019 5.83494 15.3352Z" fill="currentColor"/></svg>
                </button>
            </div>
        </div>
        
    <button onclick={toggleTimer} class="flex items-center justify-center shrink-0 flex-col gap-4 w-svw h-svh snap-start snap-always select-none">
        <div class="text-luxury-white rounded-full p-2.5 relative tabular-nums">
            <div class="h-full w-full rounded-full bg-blackout grid place-items-center text-9xl leading-none">
                <p>{minutes}</p>
                <p>{seconds}</p>
            </div>
        </div>

        <!-- <p class="dark:text-luxury-white/40 text-luxury-white/60">
            {isRunning ? "Click anywhere to pause" : "Click anywhere to start"}
        </p> -->
    </button>
</div>



<style>
    .active {
        background-color: var(--color-blackout); 
        color: var(--color-luxury-white);
    }

</style>