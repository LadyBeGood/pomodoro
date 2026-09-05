<script lang="ts">
    // Apple-style scroll dial (non-looping) for startOfTheDay or session/break length.
    // Scroll a column so the desired value sits in the middle highlight, then press Confirm.
    // The middle band is the selected value. No clicking on numbers is required.

    import { onMount } from "svelte";

    type Props = {
        type: "startOfTheDay" | "sessionLength" | "breakLength",
        initialValue: string,
        onConfirm: (value: string) => void,
    }

    let { type, initialValue, onConfirm }: Props = $props();

    let hours = $state(0);
    let minutes = $state(0);
    let seconds = $state(0);
    let period = $state("AM");

    // Parse incoming setting string
    if (type === "startOfTheDay") {
        const match = initialValue.match(/(\d+):(\d+)\s*(AM|PM)/i);
        if (match) {
            hours = parseInt(match[1]);
            minutes = parseInt(match[2]);
            period = match[3].toUpperCase();
        }
    } else {
        const hoursMatch = initialValue.match(/(\d+)\s*hours?/i);
        const minutesMatch = initialValue.match(/(\d+)\s*minutes?/i);
        const secondsMatch = initialValue.match(/(\d+)\s*seconds?/i);
        if (hoursMatch) hours = parseInt(hoursMatch[1]);
        if (minutesMatch) minutes = parseInt(minutesMatch[1]);
        if (secondsMatch) seconds = parseInt(secondsMatch[1]);
    }

    const itemHeight = 40;
    const visibleItems = 5;
    const containerHeight = itemHeight * visibleItems;
    const spacerHeight = (containerHeight - itemHeight) / 2;

    // Option lists (finite, no looping)
    const hoursOptions = type === "startOfTheDay"
        ? Array.from({ length: 12 }, (_, i) => i + 1)
        : Array.from({ length: 24 }, (_, i) => i);
    const minutesOptions = Array.from({ length: 60 }, (_, i) => i);
    const secondsOptions = Array.from({ length: 60 }, (_, i) => i);
    const periodOptions = ["AM", "PM"];

    let hoursContainer: HTMLDivElement;
    let minutesContainer: HTMLDivElement;
    let secondsContainer: HTMLDivElement;
    let periodContainer: HTMLDivElement;

    // Read which item is currently centered and update the matching state
    function updateFromScroll(container: HTMLDivElement, options: (number | string)[], setValue: (v: any) => void) {
        const index = Math.round(container.scrollTop / itemHeight);
        const clamped = Math.max(0, Math.min(index, options.length - 1));
        setValue(options[clamped]);
    }

    // Scroll each column to the initial value after mount
    onMount(() => {
        if (type === "startOfTheDay") {
            hoursContainer.scrollTop = (hours - 1) * itemHeight;
            minutesContainer.scrollTop = minutes * itemHeight;
            periodContainer.scrollTop = (period === "AM" ? 0 : 1) * itemHeight;
        } else {
            hoursContainer.scrollTop = hours * itemHeight;
            minutesContainer.scrollTop = minutes * itemHeight;
            secondsContainer.scrollTop = seconds * itemHeight;
        }
    });

    function formatValue(): string {
        if (type === "startOfTheDay") {
            return `${hours}:${minutes.toString().padStart(2, "0")} ${period}`;
        }
        const parts: string[] = [];
        if (hours > 0) parts.push(`${hours} hour${hours === 1 ? "" : "s"}`);
        if (minutes > 0) parts.push(`${minutes} minute${minutes === 1 ? "" : "s"}`);
        if (seconds > 0) parts.push(`${seconds} second${seconds === 1 ? "" : "s"}`);
        return parts.length > 0 ? parts.join(" ") : "0 minutes";
    }

    function handleConfirm() {
        onConfirm(formatValue());
    }
</script>

<div class="flex flex-col items-center gap-4 p-4 bg-white text-black">
    <div class="flex gap-4">
        <!-- Hours column -->
        <div class="flex flex-col items-center">
            <span class="mb-1 text-sm">Hours</span>
            <div class="relative overflow-hidden" style="height: {containerHeight}px; width: 4rem;">
                <!-- Middle highlight band -->
                <div class="absolute inset-x-0 top-1/2 z-10 -translate-y-1/2 border-y border-black pointer-events-none" style="height: {itemHeight}px;"></div>
                <div
                    bind:this={hoursContainer}
                    class="h-full overflow-y-auto snap-y snap-mandatory [&::-webkit-scrollbar]:hidden [scrollbar-width:none]"
                    onscrollend={() => updateFromScroll(hoursContainer, hoursOptions, (v) => (hours = v))}
                >
                    <div style="height: {spacerHeight}px;"></div>
                    {#each hoursOptions as value}
                        <div class="flex items-center justify-center snap-center" style="height: {itemHeight}px;">{value}</div>
                    {/each}
                    <div style="height: {spacerHeight}px;"></div>
                </div>
            </div>
        </div>

        <!-- Minutes column -->
        <div class="flex flex-col items-center">
            <span class="mb-1 text-sm">Minutes</span>
            <div class="relative overflow-hidden" style="height: {containerHeight}px; width: 4rem;">
                <div class="absolute inset-x-0 top-1/2 z-10 -translate-y-1/2 border-y border-black pointer-events-none" style="height: {itemHeight}px;"></div>
                <div
                    bind:this={minutesContainer}
                    class="h-full overflow-y-auto snap-y snap-mandatory [&::-webkit-scrollbar]:hidden [scrollbar-width:none]"
                    onscrollend={() => updateFromScroll(minutesContainer, minutesOptions, (v) => (minutes = v))}
                >
                    <div style="height: {spacerHeight}px;"></div>
                    {#each minutesOptions as value}
                        <div class="flex items-center justify-center snap-center" style="height: {itemHeight}px;">{value.toString().padStart(2, "0")}</div>
                    {/each}
                    <div style="height: {spacerHeight}px;"></div>
                </div>
            </div>
        </div>

        {#if type === "startOfTheDay"}
            <!-- AM/PM column -->
            <div class="flex flex-col items-center">
                <span class="mb-1 text-sm">Period</span>
                <div class="relative overflow-hidden" style="height: {containerHeight}px; width: 4rem;">
                    <div class="absolute inset-x-0 top-1/2 z-10 -translate-y-1/2 border-y border-black pointer-events-none" style="height: {itemHeight}px;"></div>
                    <div
                        bind:this={periodContainer}
                        class="h-full overflow-y-auto snap-y snap-mandatory [&::-webkit-scrollbar]:hidden [scrollbar-width:none]"
                        onscrollend={() => updateFromScroll(periodContainer, periodOptions, (v) => (period = v))}
                    >
                        <div style="height: {spacerHeight}px;"></div>
                        {#each periodOptions as value}
                            <div class="flex items-center justify-center snap-center" style="height: {itemHeight}px;">{value}</div>
                        {/each}
                        <div style="height: {spacerHeight}px;"></div>
                    </div>
                </div>
            </div>
        {:else}
            <!-- Seconds column -->
            <div class="flex flex-col items-center">
                <span class="mb-1 text-sm">Seconds</span>
                <div class="relative overflow-hidden" style="height: {containerHeight}px; width: 4rem;">
                    <div class="absolute inset-x-0 top-1/2 z-10 -translate-y-1/2 border-y border-black pointer-events-none" style="height: {itemHeight}px;"></div>
                    <div
                        bind:this={secondsContainer}
                        class="h-full overflow-y-auto snap-y snap-mandatory [&::-webkit-scrollbar]:hidden [scrollbar-width:none]"
                        onscrollend={() => updateFromScroll(secondsContainer, secondsOptions, (v) => (seconds = v))}
                    >
                        <div style="height: {spacerHeight}px;"></div>
                        {#each secondsOptions as value}
                            <div class="flex items-center justify-center snap-center" style="height: {itemHeight}px;">{value.toString().padStart(2, "0")}</div>
                        {/each}
                        <div style="height: {spacerHeight}px;"></div>
                    </div>
                </div>
            </div>
        {/if}
    </div>

    <button class="border border-black px-4 py-2 bg-white text-black" onclick={handleConfirm}>
        Confirm
    </button>
</div>