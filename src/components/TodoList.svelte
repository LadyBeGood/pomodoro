<script lang="ts">
    type Todo = {
        index: number;
        task: string;
    };

    let todos: Todo[] = $state([
        { index: 1, task: "Complete the project" },
        { index: 2, task: "Get a job and escape unemployment" },
        { index: 3, task: "Polish portfolio and GitHub README" },
        { index: 4, task: "Network with 3 industry professionals" },
        { index: 5, task: "Master Svelte 5 snippets and runes" },
        { index: 6, task: "Take a break and touch some grass" },
        { index: 7, task: "Refactor messy CSS into Tailwind or CSS Modules" },
        { index: 8, task: "Update LinkedIn profile and 'Open to Work' status" },
        { index: 9, task: "Apply to 5 high-quality job postings" },
        { index: 10, task: "Prepare for behavioral interview questions" },
        { index: 11, task: "Solve a LeetCode 'Medium' without crying" },
        { index: 12, task: "Write a blog post about a technical challenge" },
        { index: 13, task: "Review Svelte's $derived and $effect runes" },
        { index: 14, task: "Clean up local repository branches" },
        { index: 15, task: "Optimize project loading speed (Lighthouse score)" },
        { index: 16, task: "Research salary benchmarks for target roles" },
        { index: 17, task: "Build a small demo using a new API" },
        { index: 18, task: "Drink 2 liters of water" },
        { index: 19, task: "Set up a professional email signature" },
        { index: 20, task: "Celebrate a small win (like finishing this list)" },
    ]);

    function insertTodo(todo: Todo) {
        todos = [...todos, todo];
    }

    function removeTodo(index: number) {
        todos = todos.filter((todo: Todo) => todo.index === index);
    }
</script>



<div class="h-full w-full">


    




















    <div class="cursor-pointer fixed left-1/2 -translate-1/2 bottom-24 bg-luxury-white text-blackout rounded-full w-12 h-12 grid place-items-center">
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M440-440H240q-17 0-28.5-11.5T200-480q0-17 11.5-28.5T240-520h200v-200q0-17 11.5-28.5T480-760q17 0 28.5 11.5T520-720v200h200q17 0 28.5 11.5T760-480q0 17-11.5 28.5T720-440H520v200q0 17-11.5 28.5T480-200q-17 0-28.5-11.5T440-240v-200Z"/></svg>
    </div>
</div>
