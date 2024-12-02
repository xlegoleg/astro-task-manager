<script lang="ts">
  import { ETaskPriority } from '../types/task';
  import { actions } from 'astro:actions';

  let title = '';
  let priority: ETaskPriority = ETaskPriority.LOW;
  let dueDate = '';
  let errorText = ''

  const submitTask = async () => {
    if (title && dueDate) {
      const { data, error } = await actions.createTask({ title, priority, dueDate: new Date(dueDate), isCompleted: false });
      if (!data) {
        errorText = error;
      } else {
        errorText = '';
        window.location.reload();
      }
    }
  };
</script>

<div class="mb-4">
    <form>
        <input required type="text" bind:value={title} placeholder="Task title" class="border rounded p-2 mr-2" />
        <select required bind:value={priority} class="border rounded p-2 mr-2">
            {#each Object.values(ETaskPriority) as p}
                <option value={p}>{p}</option>
            {/each}
        </select>
        <input required type="date" bind:value={dueDate} class="border rounded p-2 mr-2" />
        <button class="bg-blue-500 text-white px-4 py-2 rounded" on:click|preventDefault={submitTask}>
            Add Task
        </button>

        {#if !!errorText}
            <div class="p-4 my-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                {errorText}
            </div>
        {/if}
    </form>
</div>
