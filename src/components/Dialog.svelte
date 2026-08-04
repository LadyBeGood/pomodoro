<script>
	let { isDialogOpen = $bindable(), children } = $props();

	function closeDialog() {
		isDialogOpen = false;
	}
</script>

{#if isDialogOpen}
	<div 
        aria-hidden="true" 
        class="z-99 bg-black/80 w-full h-full fixed " 
        onclick={closeDialog}
    ></div>
    
    <div class="z-100 bg-(--luxury-white) w-full py-10 grid place-items-center relative">
        {@render children()}

        <button 
            aria-label="CLose dialog" 
            onclick={closeDialog}
            class="absolute -bottom-12 left-1/2 -translate-x-1/2 text-(--luxury-white)"
        >
            <svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="28px" fill="currentColor"><path d="M480-424 284-228q-11 11-28 11t-28-11q-11-11-11-28t11-28l196-196-196-196q-11-11-11-28t11-28q11-11 28-11t28 11l196 196 196-196q11-11 28-11t28 11q11 11 11 28t-11 28L536-480l196 196q11 11 11 28t-11 28q-11 11-28 11t-28-11L480-424Z" /></svg>
        </button>
    </div>
{/if}
