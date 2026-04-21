<script lang="ts">

</script>

<div class="flex items-center flex-col gap-4 ">
    <div
        class="text-luxury-white w-48 h-48 rounded-full p-2.5 relative tabular-nums"
        style="background: conic-gradient(var(--color-dravit-grey) 0% 60%, var(--color-luxury-white) 60% 100%);"
    >
        <!-- Small circle -->
        <div class="h-2.5 w-2.5 absolute bg-luxury-white rounded-full left-1/2 top-0 -translate-x-1/2"></div>
        <!-- rotating circle -->
        <div
            class="absolute h-full left-1/2 top-0 -translate-x-1/2"
            style="rotate: calc(60deg * 3.6);"
        >
            <div class="h-5 w-5 bg-luxury-white rounded-full -translate-y-1/4"></div>
        </div>
        <div class="h-full w-full rounded-full bg-blackout grid place-items-center text-4xl">
            <p>25:00</p>
        </div>
    </div>

    <div class="relative flex justify-center gap-10">
        
        <div class="p-3 bg-luxury-white rounded-full h-min">
            <!-- <svg xmlns="http://www.w3.org/2000/svg" height="21px" viewBox="0 -960 960 960" width="21px" fill="currentColor"><path d="M660-280v-400q0-17 11.5-28.5T700-720q17 0 28.5 11.5T740-680v400q0 17-11.5 28.5T700-240q-17 0-28.5-11.5T660-280Zm-440-35v-330q0-18 12-29t28-11q5 0 11 1t11 5l248 166q9 6 13.5 14.5T548-480q0 10-4.5 18.5T530-447L282-281q-5 4-11 5t-11 1q-16 0-28-11t-12-29Z"/></svg> -->
            <svg xmlns="http://www.w3.org/2000/svg" height="21px" viewBox="0 -960 960 960" width="21px" fill="currentColor"><path d="M184.39-257.39v-445.22q0-22.09 15.46-37.54 15.45-15.46 37.54-15.46t37.54 15.46q15.46 15.45 15.46 37.54v445.22q0 22.09-15.46 37.54-15.45 15.46-37.54 15.46t-37.54-15.46q-15.46-15.45-15.46-37.54Zm508.87-1.57L428.3-436.26q-11.82-7.7-17.74-19.3-5.91-11.61-5.91-24.44 0-12.83 5.91-24.44 5.92-11.6 17.74-19.3l264.96-177.3q6.7-4.57 14.39-6.42 7.7-1.85 14.96-1.85 21.09 0 37.04 14.68 15.96 14.67 15.96 38.33v352.6q0 23.66-15.96 38.33-15.95 14.68-37.04 14.68-7.26 0-14.96-1.85-7.69-1.85-14.39-6.42Z"/></svg>
        </div>
        <div class="bg-luxury-white rounded-full p-3 mt-8">
            <svg xmlns="http://www.w3.org/2000/svg" height="42px" viewBox="0 -960 960 960" width="42px" fill="currentColor"><path d="M320-273v-414q0-17 12-28.5t28-11.5q5 0 10.5 1.5T381-721l326 207q9 6 13.5 15t4.5 19q0 10-4.5 19T707-446L381-239q-5 3-10.5 4.5T360-233q-16 0-28-11.5T320-273Z"/></svg>
        </div>
        <div class="p-3 bg-luxury-white rounded-full h-min">
            <svg xmlns="http://www.w3.org/2000/svg" height="21px" viewBox="0 -960 960 960" width="21px" fill="currentColor"><path d="M331.87-87.3q-69.17-29.92-120.5-81.24-51.33-51.33-81.24-120.5-29.91-69.18-29.91-147.57 0-22.09 15.45-37.54 15.46-15.46 37.55-15.46 22.08 0 37.54 15.46 15.46 15.45 15.46 37.54 0 114.18 79.8 193.7 79.81 79.52 193.98 79.52 114.17 0 193.98-79.81 79.8-79.8 79.8-193.97 0-114.18-80.08-193.7-80.09-79.52-194.27-79.52h-6.56l26.65 26.65q13.13 13.13 12.91 31.11-.21 17.98-12.91 31.11-13.13 13.13-31.89 13.35-18.76.21-31.89-12.92l-104.7-104.69q-15.95-15.96-15.95-37.61T331.04-801l104.7-104.7q13.13-13.13 31.89-12.91 18.76.22 31.89 13.91 12.7 13.13 12.63 31.4-.06 18.26-13.19 31.39l-25.53 25.52h6q78.96 0 148.14 29.91 69.17 29.91 120.78 81.24t81.52 120.22q29.91 68.89 29.91 147.85 0 78.95-29.91 148.13-29.91 69.17-81.24 120.5-51.33 51.32-120.5 81.24Q558.96-57.39 480-57.39T331.87-87.3Z"/></svg>
        </div>

    </div>
</div>

<!-- 
<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#fff"><path d="M640-200q-33 0-56.5-23.5T560-280v-400q0-33 23.5-56.5T640-760q33 0 56.5 23.5T720-680v400q0 33-23.5 56.5T640-200Zm-320 0q-33 0-56.5-23.5T240-280v-400q0-33 23.5-56.5T320-760q33 0 56.5 23.5T400-680v400q0 33-23.5 56.5T320-200Z"/></svg>
-->

<style>
    .active {
        background-color: var(--color-blackout); 
        color: var(--color-luxury-white);
    }

</style>