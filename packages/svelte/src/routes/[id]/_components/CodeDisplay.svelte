<script lang="ts">
  import { codeToHtml } from "shiki";
  import { shikiThemes } from "$lib/shiki";
  import { CheckCircle, DocumentDuplicate, Icon } from "svelte-hero-icons";

  const { code, lang } = $props();

  const highlightPromise = $derived(
    Promise.resolve(code).then(code => codeToHtml(code, { lang, themes: shikiThemes })),
  );

  let copied = $state(false);

  const copy = () => {
    navigator.clipboard.writeText(code);
    copied = true;

    setTimeout(() => (copied = false), 1500);
  };
</script>

<div class="relative flex w-full justify-center">
  {#await highlightPromise}
    <div class="loading loading-lg" />
  {:then highlighted}
    {@html highlighted}
    <button class="btn btn-square btn-ghost absolute right-4 top-4" onclick={copy}>
      {#if !copied}
        <Icon src={DocumentDuplicate} class="h-6 w-6" />
      {:else}
        <Icon src={CheckCircle} class="h-6 w-6" />
      {/if}
    </button>
  {/await}
</div>

<style lang="postcss">
  :global(.shiki) {
    @apply w-full overflow-auto rounded-2xl p-4;
  }
</style>
