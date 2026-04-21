<script>
    import { navigate, isActive } from "../router";


</script>



<div class="fixed left-0 right-0 top-0 flex justify-between mx-5 my-5 items-center text-luxury-white">
    <button title="" onclick={() => navigate("/music")} class="cursor-pointer p-2.5 border-2 rounded-full border-luxury-white/10 bg-blackout">
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M127-167q-47-47-47-113t47-113q47-47 113-47 23 0 42.5 5.5T320-418v-308q0-15 9.5-26.5T353-766l400-66q18-3 32.5 8.5T800-793v433q0 66-47 113t-113 47q-66 0-113-47t-47-113q0-66 47-113t113-47q23 0 42.5 5.5T720-498v-165l-320 63v320q0 66-47 113t-113 47q-66 0-113-47Z"/></svg>
    </button>

    <div class="text-l tracking-widest">
        {#if isActive("/statistics")}
            STATISTICS
        {:else if isActive("/")}
            TIMER
        {:else if isActive("/tasks")}
            TASKS
        {/if}
    </div>

    <button title="" onclick={() => navigate("/settings")} class="cursor-pointer p-2.5 border-2 rounded-full border-luxury-white/10 bg-blackout">
       <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M433-80q-27 0-46.5-18T363-142l-9-66q-13-5-24.5-12T307-235l-62 26q-25 11-50 2t-39-32l-47-82q-14-23-8-49t27-43l53-40q-1-7-1-13.5v-27q0-6.5 1-13.5l-53-40q-21-17-27-43t8-49l47-82q14-23 39-32t50 2l62 26q11-8 23-15t24-12l9-66q4-26 23.5-44t46.5-18h94q27 0 46.5 18t23.5 44l9 66q13 5 24.5 12t22.5 15l62-26q25-11 50-2t39 32l47 82q14 23 8 49t-27 43l-53 40q1 7 1 13.5v27q0 6.5-2 13.5l53 40q21 17 27 43t-8 49l-48 82q-14 23-39 32t-50-2l-60-26q-11 8-23 15t-24 12l-9 66q-4 26-23.5 44T527-80h-94Zm49-260q58 0 99-41t41-99q0-58-41-99t-99-41q-59 0-99.5 41T342-480q0 58 40.5 99t99.5 41Z"/></svg>
    </button>
</div>