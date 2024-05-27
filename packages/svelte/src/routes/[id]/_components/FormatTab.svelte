<script lang="ts">
  const { name, logo, selected, onclick } = $props();
</script>

<button
  class="flex items-center gap-x-1 whitespace-nowrap border-blue-700 pb-2 text-gray-600 hover:text-base-content dark:border-blue-200 dark:text-gray-400"
  class:!pb-1.5={selected}
  class:border-b-2={selected}
  class:text-blue-700={selected}
  class:dark:text-blue-200={selected}
  {onclick}
>
  <img src={logo} alt="{name} logo" class="h-5 w-5 dark:invert" />
  {name}
</button>
