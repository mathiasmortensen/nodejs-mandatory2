<script>
  import { auth, logout } from '../util/auth.svelte.js';
</script>

<nav class="wrapper-navbar">
  <div class="inner-navbar">
  {#if !auth.isAuthenticated }
    <a class="inner-navbar-home" href="/">Mandatory2</a>
  {/if}
    <div class="inner-navbar-links">
      {#if !auth.isAuthenticated}
        <a href="/login">Login</a>
      {/if}
      {#if auth.isAuthenticated}
        <a href="/profile">Profile</a>
        <a href="/raccoon">Raccoon Gallery</a>
        <a
          id="logout-special"
          href="/"
          onclick={event => {
            event.preventDefault();
            logout();
          }}>Log ud</a
        >
      {/if}
    </div>
  </div>
</nav>
