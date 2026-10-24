<script lang="ts">
    import Calendar from "../../components/Calendar.svelte";
</script>

<div class="h-full max-w-100 mx-auto snap-start snap-always pt-24 pb-36 px-8 flex flex-col justify-center gap-6">
    <div class="min-h-[40%] shrink-0 flex items-center">
        <div class="w-full">
            <Calendar />
        </div>
    </div>

    <div class="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
        <p class="text-right text-(--luxury-white)/60">Time focused</p>
        <p>82h 10m</p>
        <p class="text-right text-(--luxury-white)/60">Sessions</p>
        <p>241</p>
        <p class="text-right text-(--luxury-white)/60">Active days</p>
        <p>22 of 31</p>
        <p class="text-right text-(--luxury-white)/60">Best day</p>
        <p>Oct 9</p>
    </div>
</div>