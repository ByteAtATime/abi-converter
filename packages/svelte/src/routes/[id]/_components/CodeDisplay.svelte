<script lang="ts">
  import { codeToHtml } from "shiki";
  import { shikiThemes } from "$lib/shiki";

  const { code, lang } = $props();

  const highlightPromise = $derived(
    Promise.resolve(code).then(code => codeToHtml(code, { lang, themes: shikiThemes })),
  );
</script>

<div class="flex w-full justify-center">
  {#await highlightPromise}
    <div class="loading loading-lg" />
  {:then highlighted}
    {@html highlighted}
  {/await}
</div>

<style lang="postcss">
  :global(.shiki) {
    @apply w-full overflow-auto rounded-2xl p-4;
  }
</style>
