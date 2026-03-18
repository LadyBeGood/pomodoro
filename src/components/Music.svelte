
<script lang="ts">
    import { navigate } from "../router";

    const whiteNoises = [
        { id: 136403, name: "Stream Nov",        creator: "juskiddink",  src: "./white-noise/" },
        { id: 167057, name: "School Canteen",    creator: "slag777",     src: "./white-noise/" },
        { id: 827225, name: "Rain",              creator: "filmscore",   src: "./white-noise/" },
        { id: 521772, name: "Rain on rooftop",   creator: "mrfossy",     src: "./white-noise/" },
        { id: 733288, name: "Rain and thunder",  creator: "soundrack",   src: "./white-noise/" },
        { id: 540299, name: "Coffee shop",       creator: "aidansamuel", src: "./white-noise/" },
        { id: 627079, name: "Diner in Virginia", creator: "laggardson",  src: "./white-noise/" },

        // { id: 901201, name: "Forest Birds",      creator: "naturewave",   src: "./white-noise/" },
        // { id: 901202, name: "Night Crickets",    creator: "naturewave",   src: "./white-noise/" },
        // { id: 901203, name: "Ocean Waves",       creator: "seasound",     src: "./white-noise/" },
        // { id: 901204, name: "Wind in Trees",     creator: "ambientlab",   src: "./white-noise/" },
        // { id: 901205, name: "Library Ambience",  creator: "quietspace",   src: "./white-noise/" },
        // { id: 901206, name: "Keyboard Typing",   creator: "workroom",     src: "./white-noise/" },
        // { id: 901207, name: "Fireplace",         creator: "fireside",     src: "./white-noise/" },
        // { id: 901208, name: "Train Ride",        creator: "railambient",  src: "./white-noise/" },
        // { id: 901209, name: "Airplane Cabin",    creator: "travelsound",  src: "./white-noise/" },
        // { id: 901210, name: "City Night",        creator: "urbanloop",    src: "./white-noise/" }
    ]

    const whiteNoiseTypes = [
        "Nature", // includes rainfall
        "Social", // includes diner, cafe, canteen noises
        "Indoor",   // 
    ]

    let whiteNoiseTypesElement: HTMLDivElement;
    
    function getRotationAngle() {
        const angleInRadians = Math.atan2(window.innerWidth, window.innerHeight * 0.1);
        const angleInDegrees = angleInRadians * (180 / Math.PI);
        return 90 - angleInDegrees;
    }

    function updateLayout() {
        whiteNoiseTypesElement.style.transform = `rotate(${getRotationAngle()}deg)`
    }

    $effect(() => {
        updateLayout();
        window.addEventListener('resize', updateLayout);

        // Cleanup
        return () => {
            window.removeEventListener('resize', updateLayout);
        };
    })

</script>


<!-- overlay -->
 <div class="fixed top-0 left-0 right-0 bottom-0 bg-blackout/95"></div>

<!-- close button -->
<button title="Close Music Menu" onclick={() => navigate(-1)} class="absolute right-5 top-5 z-50 cursor-pointer">
    <svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="28px" fill="#fafafa"><path d="M480-424 284-228q-11 11-28 11t-28-11q-11-11-11-28t11-28l196-196-196-196q-11-11-11-28t11-28q11-11 28-11t28 11l196 196 196-196q11-11 28-11t28 11q11 11 11 28t-11 28L536-480l196 196q11 11 11 28t-11 28q-11 11-28 11t-28-11L480-424Z"/></svg>
</button>


<div class="absolute top-0 left-0 w-full h-full">
    <div class="bg-luxury-white absolute w-full h-full" 
        style="clip-path: polygon(0 0, 100% 10%, 100% 100%, 10% 100%);">
    </div> 
</div>


<!-- 
 - Apparently `justify-content: flex-end` does not let the element overflow properly. Read more here:
 - https://github.com/philipwalton/flexbugs/issues/53
 - Adding `margin-left: auto;` to the first element is a simple workaround, just like the good ol' CSS days :)
 -->
<div
    bind:this={whiteNoiseTypesElement}
    class="overflow-auto pt-4 w-[90vw] absolute right-0 top-[10svh] origin-top-right flex gap-10 pr-8 text-sm tracking-widest"
>
    {#each whiteNoiseTypes as whiteNoiseType, i}
        <div style={i === 0 ? "margin-left: auto;" : ""} class="cursor-pointer font-semibold text-blackout/60 hover:text-blackout transition-colors">
            {whiteNoiseType.toUpperCase()}
        </div>
    {/each}
</div>


<div class="absolute right-0 bottom-0 w-[90vw] h-[82svh] grid">
    <div class="flex flex-col gap-6 overflow-auto">
        {#each whiteNoises as whiteNoise, i}
            <div style="padding-left: calc({i} * 0.9vw);">
                <div data-id="{whiteNoise.id}"  class="cursor-pointer">{whiteNoise.name}</div>
                <div class="text-blackout/70 cursor-pointer text-xs">{whiteNoise.creator}</div>
            </div>
        {/each}
    </div>


    
    <div class="self-end w-full p-6 ">

        <div class="flex items-center justify-between">

            <div>
                <p class="font-semibold">Deep Focus</p>
                <p class="text-xs text-blackout/60">Ambient Session</p>
            </div>

            <div class="flex gap-4 items-center">

                <div class="text-blackout/70 hover:text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M220-280v-400q0-17 11.5-28.5T260-720q17 0 28.5 11.5T300-680v400q0 17-11.5 28.5T260-240q-17 0-28.5-11.5T220-280Zm458-1L430-447q-9-6-13.5-14.5T412-480q0-10 4.5-18.5T430-513l248-166q5-4 11-5t11-1q16 0 28 11t12 29v330q0 18-12 29t-28 11q-5 0-11-1t-11-5Z"/></svg>
                </div>

                <div class="w-12 h-12 flex items-center justify-center rounded-full bg-blackout text-luxury-white font-bold shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M320-273v-414q0-17 12-28.5t28-11.5q5 0 10.5 1.5T381-721l326 207q9 6 13.5 15t4.5 19q0 10-4.5 19T707-446L381-239q-5 3-10.5 4.5T360-233q-16 0-28-11.5T320-273Z"/></svg>
                </div>

                <div class="text-blackout/70 hover:text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M660-280v-400q0-17 11.5-28.5T700-720q17 0 28.5 11.5T740-680v400q0 17-11.5 28.5T700-240q-17 0-28.5-11.5T660-280Zm-440-35v-330q0-18 12-29t28-11q5 0 11 1t11 5l248 166q9 6 13.5 14.5T548-480q0 10-4.5 18.5T530-447L282-281q-5 4-11 5t-11 1q-16 0-28-11t-12-29Z"/></svg>
                </div>

            </div>

        </div>

    </div>

</div> 


