<script>
  import AuthGuard from './AuthGuard.svelte';
  import Profile from '../pages/Profile.svelte';
</script>

<AuthGuard>
  <Profile />
</AuthGuard>
