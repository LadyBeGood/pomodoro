<script lang="ts">
    import { navigate } from "../router";

    const settingTypes = [
        "General",
        "Theme",
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
 <div class="fixed top-0 left-0 right-0 bottom-0 bg-blackout/95"></div>

<!-- close button -->
<button title="Close Settings" onclick={() => navigate(-1)} class="absolute left-5 top-5 cursor-pointer z-50">
    <svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="28px" fill="#fafafa"><path d="M480-424 284-228q-11 11-28 11t-28-11q-11-11-11-28t11-28l196-196-196-196q-11-11-11-28t11-28q11-11 28-11t28 11l196 196 196-196q11-11 28-11t28 11q11 11 11 28t-11 28L536-480l196 196q11 11 11 28t-11 28q-11 11-28 11t-28-11L480-424Z"/></svg>
</button> 


<div class="absolute top-0 left-0 w-full h-full">
    <div class="bg-luxury-white absolute w-full h-full" 
        style="clip-path: polygon(100% 0, 90% 100%, 0 100%, 0 10%);">
    </div> 
</div>


<!-- Setting types -->
<div
    bind:this={settingTypesElement}
    class="overflow-auto pt-4 w-[90vw] absolute z-6 left-0 top-[10svh] origin-top-left flex gap-10 justify-start pl-8 text-sm tracking-widest"
>
    {#each settingTypes as settingType}
        <div class="cursor-pointer font-semibold text-blackout/60 hover:text-blackout transition-colors">
            {settingType.toUpperCase()}
        </div>
    {/each}
</div>



<div 
    bind:this={settingsMainElement}
    class=" z-5 absolute left-0 bottom-0 w-[90vw] bg-pink-800 h-[82svh] origin-bottom-right overflow-x-hidden"
>
    
</div>


