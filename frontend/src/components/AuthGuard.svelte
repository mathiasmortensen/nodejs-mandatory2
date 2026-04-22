<script>
  import { auth } from '../util/auth.svelte.js';
  import { navigate } from 'svelte5-router';

  let { children } = $props();

  $effect(() => {
    if (auth.readyToRedirect && !auth.isAuthenticated) {
      navigate('/login', { replace: true });
    }
  });
</script>

{#if !auth.readyToRedirect}
  <p>Henter adgang...</p>
{:else if auth.isAuthenticated}
  {@render children()}
{/if}
