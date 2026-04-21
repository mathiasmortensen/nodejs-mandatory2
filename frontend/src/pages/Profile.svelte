<script>
  import { auth, logout } from "../util/auth.svelte.js";
</script>

<svelte:head><title>Profile Page</title></svelte:head>

<div class="profile-page">
  <div class="profile-card">
    <h1>Profile</h1>
    {#if auth.user}
      <p>Username: {auth.user.username}</p>
      <p>Email: {auth.user.email}</p>
      <button type="button" class="btn" onclick={logout}>Log ud</button>
    {:else}
      <p>Henter bruger...</p>
    {/if}
  </div>
</div>
