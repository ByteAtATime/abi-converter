<script lang="ts">
  import ContractTab from "../ContractTab.svelte";

  const { contract } = $props();
  const contractNames = Object.keys(contract.abis);

  let selectedContract = $state(0);
  const selectContract = (i: number) => () => (selectedContract = i);
</script>

<div class="w-full max-w-screen-lg">
  <div class="container mx-auto w-full">
    {#if contractNames.length > 1}
      <div class="mb-4 flex flex-col items-center">
        <h2 class="text-sm font-bold uppercase tracking-wider">Contracts</h2>
      
        <div class="flex gap-x-2">
          {#each contractNames as contractName, i}
            <ContractTab {contractName} onclick={selectContract(i)} selected={selectedContract === i} />
          {/each}
        </div>
      </div>
    {/if}

    <slot abi={contract.abis[contractNames[selectedContract]].abi} contractName={contractNames[selectedContract]} />
  </div>
</div>
