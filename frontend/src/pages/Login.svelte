<script>
  import { signup, login, forgotPassword } from '../util/auth.svelte.js';

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
  <div class='top-div'>
    <div class='login-div'>
      <form
        id='login-form'
        onsubmit={(event) => {
          event.preventDefault();
          login(identifier, password);
        }}
      >
        <h1>Login</h1>
        <input type='text' placeholder='username/email' bind:value={identifier} />
        <input type='password' placeholder='kodeord' bind:value={password} />
        <button type='submit' class='btn'>Login</button>
        <button type='button' class='btn' onclick={() => (view = 'Forgot')}>Glemt kodeord</button>
      </form>
    </div>

    <button type='button' class='btn' onclick={() => (view = 'Signup')}>Signup</button>
  </div>

{:else if view === 'Signup'}
  <div class='top-div'>
    <div class='signup-div'>
      <form
        id='signup-form'
        onsubmit={(event) => {
          event.preventDefault();
          signup(email, username, password);
        }}
      >
        <h1>Signup</h1>
        <input type='email' placeholder='email' bind:value={email} />
        <input type='text' placeholder='username' bind:value={username} />
        <input type='password' placeholder='kodeord' bind:value={password} />
        <button type='submit' class='btn'>Sign up</button>
      </form>
    </div>

    <button type='button' class='btn' onclick={() => (view = 'Login')}>Skift til Login</button>
  </div>

{:else if view === 'Forgot'}
  <div class='top-div'>
    <div class='signup-div'>
      <form
        id='forgotpassword-form'
        onsubmit={(event) => {
          event.preventDefault();
          forgotPassword(identifier);
        }}
      >
        <h1>Glemt kodeord</h1>
        <input type='text' placeholder='Email eller Username' bind:value={identifier} />
        <button type='submit' class='btn'>Send reset link til mail</button>
      </form>
    </div>

    <button type='button' class='btn' onclick={() => (view = 'Login')}>Tilbage til Login</button>
  </div>
{/if}
