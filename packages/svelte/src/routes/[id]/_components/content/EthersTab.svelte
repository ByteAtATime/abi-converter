<script lang="ts">
  import BaseTab from "./BaseTab.svelte";
  import CodeDisplay from "../CodeDisplay.svelte";
  import { formatAbi } from "abitype";

  const { contract } = $props();
</script>

<BaseTab {contract} let:abi>
  {@const formattedAbi = formatAbi(abi)}

  <CodeDisplay code={JSON.stringify(formattedAbi, null, 2)} lang="json" />
</BaseTab>
