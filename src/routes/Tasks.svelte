<script lang="ts">
    /*==============================*/
    /* Imports                      */
    /*==============================*/
    import { onMount } from "svelte";

    /*==============================*/
    /* Types                        */
    /*==============================*/
    type Task = {
        index: number;
        task: string;
        completed: boolean;
    };

    /*==============================*/
    /* States                       */
    /*==============================*/
    let tasks: Task[] = $state([
        { index: 1, task: "Get a job and escape unemployment",     completed: false },
        { index: 2, task: "Master Svelte 5 snippets and runes",    completed: false },
        { index: 3, task: "Complete the project",                  completed: false },
        { index: 4, task: "Polish portfolio and GitHub README",    completed: true  },
        { index: 5, task: "Network with 3 industry professionals", completed: false },
    ]);

    let newTask = $state("");
    let isInputFocused = $state(false);


    /*==============================*/
    /* Handlers                     */
    /*==============================*/
    function addTask(event: Event) {
        event.preventDefault();
        if (!newTask.trim()) return;

        const nextIndex = tasks.length > 0 ? Math.max(...tasks.map(task => task.index)) + 1 : 1;
        tasks = [...tasks, { index: nextIndex, task: newTask.trim(), completed: false }];
        newTask = "";

        isInputFocused = false;
    }

    function toggleTask(index: number) {
        const task = tasks.find(t => t.index === index);
        if (task) task.completed = !task.completed;
    }

    function removeTask(index: number) {
        tasks = tasks.filter((task: Task) => task.index !== index);
    }


    /*==============================*/
    /* Life cycles                  */
    /*==============================*/
    onMount(() => {
        const saved = localStorage.getItem("tasks");
        if (saved) {
            try {
                tasks = JSON.parse(saved);
            } catch (e) {
                tasks = [];
                console.error("Failed to parse tasks from localStorage", e);
            }
        }
    });

    /*==============================*/
    /* Effects                      */
    /*==============================*/
    $effect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    })
</script>

<div class="bg-blackout w-full text-luxury-white overflow-y-auto px-8 pt-24 pb-36 select-none light-scrollbar h-full grid place-items-center">
    <div class="max-w-83.25 mx-auto flex flex-col relative">
        {#each tasks as task (task.index)}
            <div class="w-full overflow-x-auto flex no-scrollbar snap-x snap-mandatory items-center">
                <button
                    onclick={() => toggleTask(task.index)}
                    class="flex w-full shrink-0 gap-6 text-left items-start py-4 relative active:opacity-70 transition-opacity snap-start snap-always "
                >
                    <p class="text-lg font-medium leading-snug flex-1 transition-all
                        {task.completed ? "styled-line-through text-dravit-grey" : "text-luxury-white"}"
                    >
                        {task.task}
                    </p>
                </button>

                <button 
                    onclick={() => removeTask(task.index)}
                    class="snap-end px-8 h-full flex items-center justify-center text-xs font-bold tracking-widest text-red-400 uppercase cursor-pointer border-none shrink-0 active:text-red-500"
                >
                    Clear
                </button>
            </div>
        {/each}
  
        <div class="flex gap-6 items-start py-4 relative">
            <input
                // On Chrome Android, this field will get a autofill "bar", I couldn't find any good solution
                // to remove it.
                //
                // One solution was to use type="search" but that put a "search" icon in the user's keyboard 
                // instead of "enter/next" icon.
                // 
                // Relevant discussion: https://stackoverflow.com/questions/15738259/disabling-chrome-autofill
                bind:value={newTask}
                onfocus={() => isInputFocused = true}
                onblur={(event) => {if (event.currentTarget.value.trim() === "") isInputFocused = false}}
                onkeydown={(event) => {if (event.key === "Enter") addTask(event), event.currentTarget.blur()}}
                placeholder="Write your task..."
                class="w-full bg-transparent border-none text-luxury-white placeholder:text-dravit-grey outline-none text-lg font-medium tracking-wide p-0"
            />

            <button
                title="Add todo"
                class:active={isInputFocused}
                class="w-8 h-8 text-lg font-medium shrink-0 text-dravit-grey text-center bg-blackout rounded-full grid place-items-center"
                onclick={(event) => addTask(event)}
            >
                <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="16px" fill="currentColor"><path d="M427-428H221q-22 0-37.5-15.5T168-481q0-22 15.5-37.5T221-534h206v-206q0-22 15.5-37.5T480-793q22 0 37.5 15.5T533-740v206h206q22 0 37.5 15.5T792-481q0 22-15.5 37.5T739-428H533v206q0 22-15.5 37.5T480-169q-22 0-37.5-15.5T427-222v-206Z"/></svg>
            </button>
        </div>

    </div>
</div>



<style>
    .styled-line-through {
        /* Took me like 2 hours to experiment with this, never made it to production 😿😿😿 */
        /* background: repeating-linear-gradient(-45deg, green 0 5%, red 0 6%, blue 0) ;
        background: repeating-linear-gradient(-45deg, transparent 0 8px, var(--color-dravit-grey) 0 11px, transparent 0) ;
        background: repeating-linear-gradient(-30deg, red 0 8px, var(--color-dravit-grey) 0 16px, red 0) ; */
        /* background: repeating-linear-gradient(-45deg, #3f87a6, #ebf8e1 15%, #f69d3c 20%); */
        /* background: linear-gradient(-45deg, transparent 45%, var(--color-dravit-grey) 0 55%, transparent 0)  0 / 18px 18px; 
        background-repeat: repeat; */
        text-decoration: line-through;
    }

    .active {
        background: var(--color-luxury-white) !important;
        color: var(--color-blackout) !important;
    }
</style>

