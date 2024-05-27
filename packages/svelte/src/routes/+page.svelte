<script lang="ts">
  import { Address } from "$lib/components/scaffold-eth";
  import { createAccount } from "@byteatatime/wagmi-svelte";
  import { BugAnt, Icon, MagnifyingGlass } from "svelte-hero-icons";
  import { goto } from "$app/navigation";
  import { notification } from "$lib/utils/scaffold-eth/notification";

  let source = $state("");
  let isLoading = $state(false);

  const handleSubmit = async event => {
    event.preventDefault();

    isLoading = true;

    const res = await fetch("/api/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: "Contract", source }),
    });

    const json = await res.json();
    isLoading = false;

    if (json.status === "error") {
      notification.error(json.message);
    } else if (!json.id) {
      notification.error("Something went wrong, please try again.");
    }

    await goto(`/${id}`);
  };
</script>

<div class="container mx-auto flex flex-grow flex-col items-center pt-10">
  <form onsubmit={handleSubmit} class="flex w-full flex-col gap-y-4">
    <textarea
      class="textarea textarea-bordered font-mono"
      rows="24"
      placeholder="Paste your contract here..."
      bind:value={source}
    />

    <button class="btn btn-primary btn-block" disabled={isLoading}>
      {#if isLoading}<div class="loading" />{/if}
      Upload!
    </button>
  </form>
</div>
