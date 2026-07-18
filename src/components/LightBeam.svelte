
<script lang="ts">
    import { linear } from "svelte/easing";

    type Props = {
        origin: "left" | "right",
    } 

    let { origin }: Props = $props();

    function lampExpand(node: HTMLElement, { duration = 250, delay = 0 }) {
        return {
            duration,
            delay,
            css: (t: number) => {
                const eased = linear(t); 
                const size = eased * 150; 
                return origin === "left" 
                    ? `mask-image: radial-gradient(circle at 0% 0%, white ${size}%, transparent 0);` 
                    : `mask-image: radial-gradient(circle at 100% 0%, white ${size}%, transparent 0);`;
            }
        };
    }
</script>

<div 
    class="absolute top-0 left-0 w-full h-full z-10 overflow-hidden" 
    in:lampExpand={{ duration: 350 }} 
    out:lampExpand={{ duration: 350, delay: 175 }}
>
    <div 
        class="bg-luxury-white absolute w-full h-full" 
        style={ origin === "left" ? "clip-path: polygon(0 0, 100% 10%, 100% 100%, 10% 100%);" : "clip-path: polygon(100% 0, 90% 100%, 0 100%, 0 10%);"}
    >
    </div> 
</div>