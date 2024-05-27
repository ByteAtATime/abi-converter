<script>
  import { page } from "$app/stores";
</script>

<div class="flex flex-grow flex-col items-center justify-center">
  <h1 class="text-6xl font-bold">{$page.status}</h1>

  <p class="text-xl">{$page.error.message}</p>
</div>
