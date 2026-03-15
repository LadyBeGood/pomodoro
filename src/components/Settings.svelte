<script>
    import { navigate } from "../router";

</script>






<!-- overlay -->
 <div class="fixed top-0 left-0 right-0 bottom-0 bg-blackout/95"></div>

<!-- close button -->
<button title="Close Settings" onclick={() => navigate(-1)} class="absolute left-5 top-5 cursor-pointer z-50">
    <svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="28px" fill="#fafafa"><path d="M480-424 284-228q-11 11-28 11t-28-11q-11-11-11-28t11-28l196-196-196-196q-11-11-11-28t11-28q11-11 28-11t28 11l196 196 196-196q11-11 28-11t28 11q11 11 11 28t-11 28L536-480l196 196q11 11 11 28t-11 28q-11 11-28 11t-28-11L480-424Z"/></svg>
</button> 


<div class="absolute top-0 left-0 w-full h-full">
    <div class="bg-luxury-white absolute w-full h-full" 
        style="clip-path: polygon(100% 0, 90% 100%, 0 100%, 0 10%);">
    </div> 
</div>

