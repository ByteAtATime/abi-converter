<script lang="ts">
  const { contractName, selected, onclick } = $props();
</script>

<button class="btn btn-neutral btn-sm" class:!btn-primary={selected} {onclick}>{contractName}</button>
