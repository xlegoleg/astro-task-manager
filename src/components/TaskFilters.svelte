<script lang="ts">
  import { ETaskPriority } from '../types/task';

  export let filter = { priority: '', isCompleted: '' };

  const applyFilters = (clear = false) => {
    const params = new URLSearchParams(window.location.search);
    if (clear) {
      const keys = Array.from(params.keys());
      keys.forEach((key) => {
        params.delete(key);
      });
    } else {
      if (filter.priority) {
        params.set('priority', filter.priority);
      }
      if (filter.isCompleted) {
        params.set('isCompleted', filter.isCompleted);
      }
    }

    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState(null, '', newUrl);
    window.location.reload();
  }
</script>

<div class="mb-4 px-3">
    <label class="mr-2">Filter by priority:</label>
    <select bind:value={filter.priority} class="border rounded p-2">
        <option value="">All</option>
        {#each Object.values(ETaskPriority) as priority}
            <option value={priority}>{priority}</option>
        {/each}
    </select>

    <label class="ml-4">
        <input type="checkbox" bind:checked={filter.isCompleted} class="mr-1" />
        Completed only
    </label>

    <div class="flex justify-between">
        <button class="bg-blue-500 text-white px-4 py-2 rounded" on:click={() => applyFilters()}>
            Apply
        </button>
        <button class="bg-gray-500 text-white px-4 py-2 rounded outline" on:click={() => applyFilters(true)}>
            Clear
        </button>
    </div>
</div>
