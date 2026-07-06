<script lang="ts">
    import { fade, slide } from "svelte/transition";
    import { navigate } from "../router";

    const settingTypes = [
        "General",
        "Pomodoro",
        "Statistics",
        "Credits",
    ]

    let settingTypesElement: HTMLDivElement;
    let settingsMainElement: HTMLDivElement;
    
    function getRotationAngle() {
        const angleInRadians = Math.atan2(window.innerHeight * 0.1, window.innerWidth );
        const angleInDegrees = angleInRadians * (180 / Math.PI);
        return -angleInDegrees;
    }

    // function getRotationAngle2() {
    //     const angleInRadians = Math.atan2(window.innerWidth * 0.1, window.innerHeight);
    //     const angleInDegrees = angleInRadians * (180 / Math.PI);
    //     return angleInDegrees;
    // }

    function updateLayout() {
        // const angle2 = getRotationAngle2();
        // settingsMainElement.style.transform = `rotate(${angle2}deg)`;
        // for (const child of settingsMainElement.children) {
        //     (child as HTMLElement).style.transform = `rotate(${-angle2}deg)`;
        //     console.log(child)
        // }
        settingTypesElement.style.transform = `rotate(${getRotationAngle()}deg)`;
    }

    $effect(() => {
        updateLayout();
        window.addEventListener("resize", updateLayout);

        // Cleanup
        return () => {
            window.removeEventListener("resize", updateLayout);
        };
    })

</script>






<!-- overlay -->
 <div class="z-1 fixed top-0 left-0 right-0 bottom-0 bg-blackout/95" out:slide={{ duration: 250, delay: 250 }}></div>

<!-- close button -->
<button title="Close Settings" onclick={() => navigate(-1)} class="absolute left-5 top-5 cursor-pointer z-2 text-luxury-white" transition:fade={{ duration: 250 }}>
    <svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="28px" fill="currentColor"><path d="M480-424 284-228q-11 11-28 11t-28-11q-11-11-11-28t11-28l196-196-196-196q-11-11-11-28t11-28q11-11 28-11t28 11l196 196 196-196q11-11 28-11t28 11q11 11 11 28t-11 28L536-480l196 196q11 11 11 28t-11 28q-11 11-28 11t-28-11L480-424Z"/></svg>
</button> 


<div class="z-1 absolute top-0 left-0 w-full h-full" in:slide={{ duration: 250 }} out:slide={{ duration: 250, delay: 250 }}>
    <div class="bg-luxury-white absolute w-full h-full" 
        style="clip-path: polygon(100% 0, 90% 100%, 0 100%, 0 10%);">
    </div> 
</div>


<!-- Setting types -->
<div
    bind:this={settingTypesElement}
    in:slide={{ duration: 250, delay: 250 }} out:slide={{ duration: 250}}
    class="z-1 overflow-auto py-4 w-[90vw] absolute left-0 top-[10svh] origin-top-left flex gap-8 justify-start pl-8 text-sm tracking-widest"
>
    {#each settingTypes as settingType}
        <div class="cursor-pointer font-semibold text-blackout/60 hover:text-blackout transition-colors">
            {settingType.toUpperCase()}
        </div>
    {/each}
</div>



<div 
    bind:this={settingsMainElement}
    in:slide={{ duration: 250, delay: 250 }} out:slide={{ duration: 250}}
    class="z-1 absolute left-0 bottom-0 w-[90vw] h-[82svh] grid"
>
    <div class="flex flex-col gap-10 overflow-auto  text-right">
        <div style="padding-right: calc(0 * 0.9vw);" class="">
            <div class="cursor-pointer">Theme</div>
            <div class="text-blackout/70 cursor-pointer text-xs">Dark</div>
        </div>

        
        <!-- <div style="padding-right: calc(2 * 0.9vw);" class="">
            <div class="cursor-pointer">Pomodoro Length</div>
            <div class="text-blackout/70 cursor-pointer text-xs">25 minutes</div>
        </div>
            
        <div style="padding-right: calc(3 * 0.9vw);" class="">
            <div class="cursor-pointer">Break Length</div>
            <div class="text-blackout/70 cursor-pointer text-xs">5 minutes</div>
        </div>
            
        <div style="padding-right: calc(4 * 0.9vw);" class="">
            <div class="cursor-pointer">Disable Breaks</div>
            <div class="text-blackout/70 cursor-pointer text-xs">off</div>
        </div> -->
                    
        <div style="padding-right: calc(1 * 0.9vw);" class="">
            <div class="cursor-pointer">Default home page</div>
            <div class="text-blackout/70 cursor-pointer text-xs">Pomodoro</div>
        </div>

        <div style="padding-right: calc(2 * 0.9vw);" class="">
            <div class="cursor-pointer">Show notifications</div>
            <div class="text-blackout/70 cursor-pointer text-xs">Yes</div>
        </div>
        

        <!-- <div style="padding-right: calc(6 * 0.9vw);" class="">
            <div class="cursor-pointer">Auto-start Pomodoro</div>
            <div class="text-blackout/70 cursor-pointer text-xs">off</div>
        </div>

        <div style="padding-right: calc(6 * 0.9vw);" class="">
            <div class="cursor-pointer">Auto-start Break</div>
            <div class="text-blackout/70 cursor-pointer text-xs">off</div>
        </div> -->
    </div>


    <div class="self-end w-full p-6 ">
        <div class="flex items-center justify-between">
            <div>
                <p class="font-semibold">Created by LadyBeGood</p>
                <p class="text-xs text-blackout/60 after:dark:content-['_🖤'] after:content-['_🤍']">with</p>
            </div>

            <div class="flex gap-4 items-center">
                <a title="Github Repository" class="w-12 h-12 flex items-center justify-center rounded-full bg-blackout text-luxury-white font-bold shadow-lg" href="https://github.com/LadyBeGood/pomodoro">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path d="M0 0h24v24H0z" fill="none" />
                        <path fill="currentColor" d="M12.001 2c-5.525 0-10 4.475-10 10a9.99 9.99 0 0 0 6.837 9.488c.5.087.688-.213.688-.476c0-.237-.013-1.024-.013-1.862c-2.512.463-3.162-.612-3.362-1.175c-.113-.288-.6-1.175-1.025-1.413c-.35-.187-.85-.65-.013-.662c.788-.013 1.35.725 1.538 1.025c.9 1.512 2.337 1.087 2.912.825c.088-.65.35-1.087.638-1.337c-2.225-.25-4.55-1.113-4.55-4.938c0-1.088.387-1.987 1.025-2.687c-.1-.25-.45-1.275.1-2.65c0 0 .837-.263 2.75 1.024a9.3 9.3 0 0 1 2.5-.337c.85 0 1.7.112 2.5.337c1.913-1.3 2.75-1.024 2.75-1.024c.55 1.375.2 2.4.1 2.65c.637.7 1.025 1.587 1.025 2.687c0 3.838-2.337 4.688-4.562 4.938c.362.312.675.912.675 1.85c0 1.337-.013 2.412-.013 2.75c0 .262.188.574.688.474A10.02 10.02 0 0 0 22 12c0-5.525-4.475-10-10-10" />
                    </svg>
                </a>
            </div>

        </div>
    </div>
</div>


