<script lang="ts">
  import BaseTab from "./BaseTab.svelte";
  import CodeDisplay from "../CodeDisplay.svelte";

  const { contract, minified } = $props();
</script>

<BaseTab {contract} let:abi>
  <CodeDisplay code={JSON.stringify(abi, null, minified ? undefined : 2)} lang="json" />
</BaseTab>
