<script lang="ts">
  import solidityLogo from "$lib/assets/solidity.png";
  import ethersjsLogo from "$lib/assets/ethersjs.png";
  import jsonLogo from "$lib/assets/json.svg";
  import FormatTab from "./_components/FormatTab.svelte";
  import SourceTab from "./_components/content/SourceTab.svelte";
  import EthersTab from "./_components/content/EthersTab.svelte";
  import JsonTab from "./_components/content/JsonTab.svelte";
  import SolidityTab from "./_components/content/SolidityTab.svelte";

  const { data } = $props();

  const { contract } = data;

  enum Tab {
    Source = "source",
    Solidity = "solidity",
    EthersJS = "ethersjs",
    JSON = "json",
    JSONMinified = "json-minified",
  }

  let selectedTab = $state(Tab.Source);
  const selectTab = (tab: Tab) => () => (selectedTab = tab);
</script>

<div class="flex flex-col items-center px-4 py-8">
  <h1 class="text-2xl font-bold">{contract.name}</h1>

  <div class="mb-4 flex w-full max-w-full flex-col items-center overflow-auto">
    <div class="flex gap-x-8">
      <FormatTab
        name="Source"
        logo={solidityLogo}
        selected={selectedTab === Tab.Source}
        onclick={selectTab(Tab.Source)}
      />

      <FormatTab
        name="Solidity"
        logo={solidityLogo}
        selected={selectedTab === Tab.Solidity}
        onclick={selectTab(Tab.Solidity)}
      />

      <FormatTab
        name="Ethers.js"
        logo={ethersjsLogo}
        selected={selectedTab === Tab.EthersJS}
        onclick={selectTab(Tab.EthersJS)}
      />

      <FormatTab name="JSON" logo={jsonLogo} selected={selectedTab === Tab.JSON} onclick={selectTab(Tab.JSON)} />

      <FormatTab
        name="JSON (minified)"
        logo={jsonLogo}
        selected={selectedTab === Tab.JSONMinified}
        onclick={selectTab(Tab.JSONMinified)}
      />
    </div>

    <div class="divider -mt-2 mb-0" />
  </div>

  <div class="flex w-full flex-col items-center">
    {#if selectedTab === Tab.Source}
      <SourceTab {contract} />
    {:else if selectedTab === Tab.Solidity}
      <SolidityTab {contract} />
    {:else if selectedTab === Tab.EthersJS}
      <EthersTab {contract} />
    {:else if selectedTab === Tab.JSON}
      <JsonTab {contract} />
    {:else if selectedTab === Tab.JSONMinified}
      <JsonTab {contract} minified />
    {/if}
  </div>
</div>
