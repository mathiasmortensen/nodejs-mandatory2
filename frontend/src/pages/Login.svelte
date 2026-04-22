<script>
  import { signup, login, forgotPassword, auth } from '../util/auth.svelte.js';

  let identifier = $state('');
  let username = $state('');
  let email = $state('');
  let password = $state('');
  let view = $state('Login');
</script>

<svelte:head>
  <title>{view === 'Signup' ? 'Signup' : view === 'Forgot' ? 'Forgot' : 'Login'}</title>
</svelte:head>

{#if view === 'Login'}
  <div class="wrapper-page">
    <div class="inner-page">
      <form
        onsubmit={event => {
          event.preventDefault();
          login(identifier, password);
        }}
      >
        <h1>Login</h1>
        <input type="text" placeholder="Username eller Email" bind:value={identifier} />
        <input type="password" placeholder="Kodeord" bind:value={password} />
        <button type="submit" class="btn">Login</button>
        <button type="button" class="btn" onclick={() => (view = 'Forgot')}>Glemt kodeord</button>
      </form>
    </div>

    <button type="button" class="btn" onclick={() => (view = 'Signup')}>Signup</button>
  </div>
{:else if view === 'Signup'}
  <div class="wrapper-page">
    <div class="inner-page">
      <form
        onsubmit={event => {
          event.preventDefault();
          signup(email, username, password);
        }}
      >
        <h1>Signup</h1>
        <input type="email" placeholder="Email" bind:value={email} />
        <input type="text" placeholder="Username" bind:value={username} />
        <input type="password" placeholder="Kodeord" bind:value={password} />
        <button type="submit" class="btn">Sign up</button>
      </form>
    </div>

    <button type="button" class="btn" onclick={() => (view = 'Login')}>Skift til Login</button>
  </div>
{:else if view === 'Forgot'}
  <div class="wrapper-page">
    <div class="inner-page">
      <form
        onsubmit={event => {
          event.preventDefault();
          forgotPassword(identifier);
        }}
      >
        <h1>Glemt kodeord</h1>
        <input type="text" placeholder="Email eller Username" bind:value={identifier} />
        <button type="submit" class="btn">Send reset link til mail</button>
      </form>
    </div>

    <button type="button" class="btn" onclick={() => (view = 'Login')}>Tilbage til Login</button>
  </div>
{/if}
