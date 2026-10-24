<script lang="ts">
    import Calendar from "../../components/Calendar.svelte";
</script>

<div class="h-full max-w-100 mx-auto snap-start snap-always pt-24 pb-36 px-8 flex flex-col justify-center gap-6">
    <div class="w-full">
        <Calendar />
    </div>

    <div>
        <div class="grid grid-cols-2 gap-x-6 gap-y-4 text-sm">
            <div class="text-right">
                <p class="text-right text-(--luxury-white)/60">Total focus time</p>
                <p>140h 32m</p>
            </div>
            <div class="text-left">
                <p class="text-(--luxury-white)/60">Daily average</p>
                <p>4h 01m</p>
            </div>
        </div>

        <div class="grid grid-cols-2 gap-x-6 gap-y-4 mt-4 text-sm">
            <div class="text-right">
                <p class="text-right text-(--luxury-white)/60">Active days</p>
                <p>22 of 31</p>
            </div>
            <div class="text-sm text-left">
                <p class="text-(--luxury-white)/70">Best day</p>
                <p>9th Oct</p>
            </div>
        </div>
    </div>
</div>