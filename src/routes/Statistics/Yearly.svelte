<div class="h-svh snap-start snap-always py-24 px-8 flex flex-col justify-center gap-12">
    <div class="grid grid-cols-4 gap-x-3 gap-y-5 shrink-0">
        {#each ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] as month, m}
            <div class="flex flex-col gap-2">
                <p class="text-xs text-(--luxury-white)/60">{month}</p>
                <div class="grid grid-cols-7 gap-0.5">
                    {#each { length: 30 } as _, d}
                        <span
                            class="aspect-square rounded-full bg-(--luxury-white)"
                            style="opacity: {[0.1, 0.1, 0.3, 0.55, 1, 0.3, 0.1][(m + d * 3) % 7]};"
                        ></span>
                    {/each}
                </div>
            </div>
        {/each}
    </div>

    <div class="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
        <p class="text-right text-(--luxury-white)/60">Time focused</p>
        <p>912h 40m</p>
        <p class="text-right text-(--luxury-white)/60">Sessions</p>
        <p>2,104</p>
        <p class="text-right text-(--luxury-white)/60">Active days</p>
        <p>241</p>
        <p class="text-right text-(--luxury-white)/60">Best month</p>
        <p>October</p>
        <p class="text-right text-(--luxury-white)/60">Longest streak</p>
        <p>19 days</p>
        <p class="text-right text-(--luxury-white)/60">Vs last year</p>
        <p>+31%</p>
    </div>
</div>