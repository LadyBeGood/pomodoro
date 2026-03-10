<script lang="ts">
</script>

<div class="flex items-center flex-col gap-4">
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
            <p>01:30</p>
        </div>
    </div>

    <div class="bg-luxury-white rounded-full p-3 translate-y-6">
        <svg xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 -960 960 960" width="36px" fill="currentColor"><path d="M320-273v-414q0-17 12-28.5t28-11.5q5 0 10.5 1.5T381-721l326 207q9 6 13.5 15t4.5 19q0 10-4.5 19T707-446L381-239q-5 3-10.5 4.5T360-233q-16 0-28-11.5T320-273Z"/></svg>
    </div>
</div>
