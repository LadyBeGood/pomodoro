<script lang="ts">
    type Todo = {
        index: number;
        task: string;
        completed: boolean;
    };

    let todos: Todo[] = $state([
        { index: 1, task: "Get a job and escape unemployment", completed: false },
        { index: 2, task: "Master Svelte 5 snippets and runes", completed: false },
        { index: 3, task: "Complete the project", completed: false },
        { index: 4, task: "Polish portfolio and GitHub README", completed: true },
        { index: 5, task: "Network with 3 industry professionals", completed: false },
        // { index: 6, task: "Complete the project", completed: false },
        // { index: 7, task: "Get a job and escape unemployment", completed: false },
        // { index: 8, task: "Polish portfolio and GitHub README", completed: true },
        // { index: 9, task: "Network with 3 industry professionals", completed: false },
        // { index: 10, task: "Master Svelte 5 snippets and runes", completed: false },
        // { index: 11, task: "Complete the project", completed: false },
        // { index: 12, task: "Get a job and escape unemployment", completed: false },
        // { index: 13, task: "Polish portfolio and GitHub README", completed: true },
        // { index: 14, task: "Network with 3 industry professionals", completed: false },
        // { index: 15, task: "Master Svelte 5 snippets and runes", completed: false },
    ]);

    let newTodoTask = $state("");

    function handleAddTodo(e: SubmitEvent) {
        e.preventDefault();
        if (!newTodoTask.trim()) return;

        const nextIndex = todos.length > 0 ? Math.max(...todos.map(t => t.index)) + 1 : 1;
        todos = [...todos, { index: nextIndex, task: newTodoTask.trim(), completed: false }];
        newTodoTask = "";
    }

    function toggleTodo(index: number) {
        const todo = todos.find(t => t.index === index);
        if (todo) todo.completed = !todo.completed;
    }

    function removeTodo(index: number) {
        todos = todos.filter((todo: Todo) => todo.index !== index);
    }
</script>

<div class="bg-blackout text-luxury-white overflow-y-auto px-8 pt-24 pb-36 select-none scrollbar-none h-full grid place-items-center">
    <div class="max-w-83.25 mx-auto flex flex-col relative">
        {#each todos as todo (todo.index)}
            <div class="w-full overflow-x-auto flex no-scrollbar snap-x snap-mandatory items-center">
                <button
                    onclick={() => toggleTodo(todo.index)}
                    class="flex w-full shrink-0 gap-6 text-left items-start py-4 relative z-10 active:opacity-70 transition-opacity snap-start snap-always "
                >
                    <p class="text-lg font-medium leading-snug flex-1 transition-all
                        {todo.completed ? 'line-through text-luxury-white/20' : 'text-luxury-white'}"
                    >
                        {todo.task}
                    </p>
                </button>

                <button 
                    onclick={() => removeTodo(todo.index)}
                    class="snap-end px-8 h-full flex items-center justify-center text-xs font-bold tracking-widest text-red-400 uppercase cursor-pointer border-none shrink-0 active:text-red-500"
                >
                    Clear
                </button>
            </div>
        {/each}

        <form onsubmit={handleAddTodo} class="flex gap-6 items-start py-4 relative z-10">
            <input 
                type="text" 
                bind:value={newTodoTask}
                placeholder="Write target..."
                class="w-full bg-transparent border-none text-luxury-white placeholder:text-luxury-white/10 outline-none text-lg font-medium tracking-wide p-0"
            />
            <span class="w-8 text-lg font-medium shrink-0 text-luxury-white/20 text-center bg-blackout">
                +
            </span>
        </form>

    </div>
</div>




<!-- 
<script lang="ts">
    type Todo = {
        index: number;
        task: string;
        completed: boolean;
    };

    let todos: Todo[] = $state([
        { index: 1, task: "Complete the project", completed: false },
        { index: 2, task: "Get a job and escape unemployment", completed: false },
        { index: 3, task: "Polish portfolio and GitHub README", completed: true },
        { index: 4, task: "Network with 3 industry professionals", completed: false },
        { index: 5, task: "Master Svelte 5 snippets and runes", completed: false }
    ]);

    let newTodoTask = $state("");

    function handleAddTodo(e: SubmitEvent) {
        e.preventDefault();
        if (!newTodoTask.trim()) return;

        const nextIndex = todos.length > 0 ? Math.max(...todos.map(t => t.index)) + 1 : 1;
        todos = [...todos, { index: nextIndex, task: newTodoTask.trim(), completed: false }];
        newTodoTask = "";
    }

    function toggleTodo(index: number) {
        const todo = todos.find(t => t.index === index);
        if (todo) todo.completed = !todo.completed;
    }

    function removeTodo(index: number) {
        todos = todos.filter((todo: Todo) => todo.index !== index);
    }
</script>

<div class="fixed inset-0 bg-blackout text-luxury-white overflow-y-auto pt-32 pb-40 select-none scrollbar-none">
    <div class="max-w-md mx-auto flex flex-col relative">
        
        <div class="absolute left-4 top-3 bottom-3 w-[1px] bg-luxury-white/10 z-0"></div>

        {#each todos as todo (todo.index)}
            <div class="w-full overflow-x-auto flex scrollbar-none snap-x snap-mandatory hidden-scrollbar">
                
                <div 
                    onclick={() => toggleTodo(todo.index)}
                    class="w-full shrink-0 flex gap-6 items-start py-4 pr-6 relative z-10 active:opacity-70 transition-opacity snap-start snap-always bg-blackout"
                >
                    <span class="w-8 text-xs font-medium tabular-nums tracking-wider pt-1.5 shrink-0 bg-blackout text-center
                        {todo.completed ? 'text-luxury-white/20' : 'text-luxury-white/60'}"
                    >
                        {String(todo.index).padStart(2, '0')}
                    </span>

                    <p class="text-lg font-medium leading-snug flex-1 transition-all
                        {todo.completed ? 'line-through text-luxury-white/20' : 'text-luxury-white'}"
                    >
                        {todo.task}
                    </p>

                    <span class="text-[10px] text-luxury-white/10 pt-2 font-mono shrink-0 select-none">
                        &larr;
                    </span>
                </div>

                <button 
                    onclick={() => removeTodo(todo.index)}
                    class="snap-end bg-blackout px-8 h-full flex items-center justify-center text-xs font-bold tracking-widest text-red-400 uppercase cursor-pointer border-none shrink-0 active:text-red-500"
                >
                    Clear
                </button>
            </div>
        {/each}

        <form onsubmit={handleAddTodo} class="flex gap-6 items-start py-4 relative z-10 mt-2 pl-0 pr-6">
            <span class="w-8 text-xs font-medium tabular-nums tracking-wider pt-1.5 shrink-0 text-luxury-white/20 text-center bg-blackout">
                +
            </span>
            <input 
                type="text" 
                bind:value={newTodoTask}
                placeholder="Write target..."
                class="w-full bg-transparent border-none text-luxury-white placeholder:text-luxury-white/10 outline-none text-lg font-medium tracking-wide p-0"
            />
        </form>

    </div>
</div>

<style>
    /* Completely sterilize system scrollbars across mobile viewports */
    .scrollbar-none::-webkit-scrollbar,
    .hidden-scrollbar::-webkit-scrollbar {
        display: none;
    }
    .scrollbar-none,
    .hidden-scrollbar {
        -ms-overflow-style: none;
        scrollbar-width: none;
    }
</style>

-->