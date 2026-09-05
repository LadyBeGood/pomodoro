<script lang="ts">
    import { fade, slide } from "svelte/transition";
    import { onMount } from "svelte";

    type Props = {
        type: "startOfTheDay" | "sessionLength" | "breakLength",
        initialValue: string,
        onConfirm: (value: string) => void,
    }

    let { type, initialValue, onConfirm }: Props = $props();

    const hours = Array.from({ length: 12 }, (_, i) =>
        String(i + 1).padStart(2, "0")
    );

    const hours24 = Array.from({ length: 24 }, (_, i) =>
        String(i).padStart(2, "0")
    );

    const minutes = Array.from({ length: 60 }, (_, i) =>
        String(i).padStart(2, "0")
    );

    const periods = ["AM", "PM"];

    const seconds = Array.from({ length: 60 }, (_, i) =>
        String(i).padStart(2, "0")
    );

    // Parse the incoming setting string once, synchronously, so state
    // starts correct on first render (scroll position is set in onMount,
    // once the container elements exist).
    function parseInitial() {
        if (type === "startOfTheDay") {
            const match = initialValue.match(/(\d+):(\d+)\s*(AM|PM)/i);
            if (match) {
                return {
                    hour: match[1].padStart(2, "0"),
                    minute: match[2].padStart(2, "0"),
                    period: match[3].toUpperCase(),
                    second: "00",
                };
            }
            return { hour: "05", minute: "00", period: "AM", second: "00" };
        }

        const hoursMatch = initialValue.match(/(\d+)\s*hours?/i);
        const minutesMatch = initialValue.match(/(\d+)\s*minutes?/i);
        const secondsMatch = initialValue.match(/(\d+)\s*seconds?/i);

        return {
            hour: hoursMatch ? hoursMatch[1].padStart(2, "0") : "00",
            minute: minutesMatch ? minutesMatch[1].padStart(2, "0") : "00",
            period: "AM",
            second: secondsMatch ? secondsMatch[1].padStart(2, "0") : "00",
        };
    }

    const parsed = parseInitial();

    let hour = $state(parsed.hour);
    let minute = $state(parsed.minute);
    let period = $state(parsed.period);
    let second = $state(parsed.second);

    const itemHeight = 48; // matches h-12 on each button

    let containers: HTMLDivElement[] = [];

    // Read which item sits centered in a column and update the matching state.
    function handleScrollEnd(column: number, list: string[]) {
        const container = containers[column];
        const index = Math.round(container.scrollTop / itemHeight);
        const clamped = Math.max(0, Math.min(index, list.length - 1));
        const value = list[clamped];

        if (column === 0) hour = value;
        else if (column === 1) minute = value;
        else if (type === "startOfTheDay") period = value;
        else second = value;
    }

    // Scroll a column so a given item sits centered.
    function scrollToValue(column: number, list: string[], value: string) {
        const index = list.indexOf(value);
        if (index === -1) return;
        containers[column].scrollTop = index * itemHeight;
    }

    onMount(() => {
        scrollToValue(0, type === "startOfTheDay" ? hours : hours24, hour);
        scrollToValue(1, minutes, minute);
        scrollToValue(2, type === "startOfTheDay" ? periods : seconds, type === "startOfTheDay" ? period : second);
    });

    function formatValue(): string {
        if (type === "startOfTheDay") {
            return `${Number(hour)}:${minute} ${period}`;
        }
        const h = Number(hour), m = Number(minute), s = Number(second);
        const parts: string[] = [];
        if (h > 0) parts.push(`${h} hour${h === 1 ? "" : "s"}`);
        if (m > 0) parts.push(`${m} minute${m === 1 ? "" : "s"}`);
        if (s > 0) parts.push(`${s} second${s === 1 ? "" : "s"}`);
        return parts.length > 0 ? parts.join(" ") : "0 minutes";
    }

    function handleConfirm() {
        onConfirm(formatValue());
    }
</script>




<div class="flex flex-col items-center gap-4 w-60">
    <div class="grid grid-cols-3 text-sm  w-full justify-items-center text-center text-(--blackout) absolute -translate-y-10">
        <span class="w-full h-fit" style="background-image: linear-gradient(var(--luxury-white) 0 50%, transparent 0);">Hour</span>
        <span class="w-full h-fit" style="background-image: linear-gradient(var(--luxury-white) 0 50%, transparent 0);">Minute</span>
        <span class="w-full h-fit" style="background-image: linear-gradient(var(--luxury-white) 0 50%, transparent 0);">{ type === "startOfTheDay" ? "Period" : "Second"}</span>
    </div>

    <div class="h-48 w-full relative">
    
        <!-- selection highlight -->


        <!-- <div
            transition:fade|global={{ duration: 200, delay: 40 }}
            class="pointer-events-none absolute top-1/2 left-1/2 -translate-1/2 z-999  h-12 w-full transition-colors"
            style="backdrop-filter: url(&quot;data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='luxury-blackout' x='0' y='0' width='2000%25' height='2000%25' color-interpolation-filters='sRGB'%3E%3CfeComponentTransfer%3E%3CfeFuncR type='linear' slope='-1' intercept='1.102'/%3E%3CfeFuncG type='linear' slope='-1' intercept='1.102'/%3E%3CfeFuncB type='linear' slope='-1' intercept='1.102'/%3E%3CfeFuncA type='identity'/%3E%3C/feComponentTransfer%3E%3C/filter%3E%3C/svg%3E#luxury-blackout&quot;);"
        ></div> -->

        <div class="relative grid grid-cols-3 h-full items-center w-full overflow-hidden">
            {#each [type === "startOfTheDay" ? hours : hours24, minutes, type === "startOfTheDay" ? periods : seconds] as list, column}
                <div
                    bind:this={containers[column]}
                    onscrollend={() => handleScrollEnd(column, list)}
                    class="h-full overflow-y-auto scroll-smooth snap-y snap-mandatory no-scrollbar text-center"
                >
                    <div class="h-18 shrink-0"></div>

                    {#each list as item}
                        <button
                            class="block h-12 w-full snap-center text-lg font-medium tabular-nums hover:text-(--blackout)"
                            onclick={() => scrollToValue(column, list, item)}
                        >
                            {item}
                        </button>
                    {/each}

                    <div class="h-18 shrink-0"></div>
                </div>
            {/each}
        </div>
    </div>

    <button class="absolute bg-(--blackout) text-(--luxury-white) translate-y-60 px-6 py-2 rounded-full" onclick={handleConfirm}>
        Confirm
    </button>
</div>