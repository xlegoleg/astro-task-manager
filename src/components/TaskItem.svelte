<script lang="ts">
  import { type ITask } from '../types/task';
  import { actions } from "astro:actions";

  export let task: ITask;

  let errorText = '';

  export const updateTask = async (id: number, updates: Partial<ITask>) => {
    const { data, error } = await actions.updateTask({ id, ...updates });
    if (!data) {
      errorText = error;
    } else {
      window.location.reload();
    }
  };

  export const deleteTask = async (id: number) => {
    const { data, error } = await actions.deleteTask({ id });
    if (!data) {
      errorText = error;
    } else {
      window.location.reload();
    }
  };
</script>

<li class="p-4 mb-2 bg-white shadow rounded flex items-center justify-between">
    <div>
        <h2 class="text-lg font-bold">{task.title}</h2>
        <p>Priority: {task.priority}</p>
        <p>Due: {task.dueDate}</p>
        <p>Status:
            {#if task.isCompleted}
                <span class="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">Completed</span>
            {/if}
            {#if !task.isCompleted}
                <span class="bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">Pending</span>
            {/if}
        </p>
    </div>
    <div class="flex gap-2">
        <button class="bg-green-500 text-white px-2 py-1 rounded"
                on:click={() => updateTask(task.id, { isCompleted: !task.isCompleted })}>
            {task.isCompleted ? 'Undo' : 'Complete'}
        </button>
        <button class="bg-red-500 text-white px-2 py-1 rounded" on:click={() => deleteTask(task.id)}>Delete</button>
    </div>

    {#if !!errorText}
        <div class="p-4 my-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            {errorText}
        </div>
    {/if}
</li>