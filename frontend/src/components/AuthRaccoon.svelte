<script>
  import Raccoon from "../pages/Raccoon.svelte";
  import AuthGuard from "./AuthGuard.svelte";
</script>

<AuthGuard>
  <Raccoon />
</AuthGuard>
