<script lang="ts">
  import CodeDisplay from "../CodeDisplay.svelte";

  const { contract } = $props();
</script>

<div class="w-full max-w-screen-lg">
  <div class="container mx-auto w-full">
    <CodeDisplay code={contract.source} lang="solidity" />
  </div>
</div>
