<script lang="ts">
  import BaseTab from "./BaseTab.svelte";
  import CodeDisplay from "../CodeDisplay.svelte";
  import { generateSolidity } from "abi-to-sol";
  import { format } from "prettier/standalone";
  import prettierSolidity from "prettier-plugin-solidity/standalone";

  const { contract } = $props();

  const formatAbi = (abi, contractName) => {
    const solidity = generateSolidity({
      abi,
      prettifyOutput: false,
      name: contractName,
      license: "MIT",
      outputAttribution: false,
      outputSource: false,
      solidityVersion: "^0.8.0",
    });

    return format(solidity, {
      plugins: [prettierSolidity],
      parser: "solidity-parse",
      printWidth: 120,
    });
  };
</script>

<BaseTab {contract} let:abi let:contractName>
  {@const formattedAbi = formatAbi(abi, contractName)}

  <CodeDisplay code={formattedAbi} lang="solidity" />
</BaseTab>
