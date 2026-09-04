<script lang="ts">
    const hours = Array.from({ length: 12 }, (_, i) =>
        String(i + 1).padStart(2, '0')
    );

    const minutes = Array.from({ length: 60 }, (_, i) =>
        String(i).padStart(2, '0')
    );

    const periods = ['AM', 'PM'];

    let hour = $state('05');
    let minute = $state('00');
    let period = $state('AM');
</script>

<div class="flex flex-col items-center gap-4">
    <div class="relative flex h-48 items-center justify-center overflow-hidden rounded-3xl bg-(--luxury-white)">
        <!-- selection highlight -->
        <div class="pointer-events-none absolute h-12 w-full border-y border-(--blackout)/10 bg-(--blackout)/5"></div>

        {#each [hours, minutes, periods] as list, column}
            <div
                class="h-full w-16 overflow-y-auto scroll-smooth snap-y snap-mandatory no-scrollbar text-center"
            >
                <div class="h-18 shrink-0"></div>

                {#each list as item}
                    <button
                        class="block h-12 w-full snap-center text-lg font-medium tabular-nums hover:text-(--blackout)"
                        onclick={() => {
                            if (column === 0) hour = item;
                            if (column === 1) minute = item;
                            if (column === 2) period = item;
                        }}
                    >
                        {item}
                    </button>
                {/each}

                <div class="h-18 shrink-0"></div>
            </div>
        {/each}
    </div>
</div>
