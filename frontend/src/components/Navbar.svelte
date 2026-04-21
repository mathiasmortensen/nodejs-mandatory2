<script>
  import { auth } from "../util/auth.svelte.js";
</script>

<nav class="top-navbar">
  <div class="top-navbar-div">
    <a class="navbar-a-inner" href="/">Mandatory2</a>
    <div class="navbar-div-links">
      {#if !auth.isAuthenticated}
        <a href="/login">Login</a>
      {/if}
      {#if auth.isAuthenticated}
        <a href="/profile">Profile</a>
        <a href="/raccoon">Raccoon Gallery</a>
      {/if}
    </div>
  </div>
</nav>
