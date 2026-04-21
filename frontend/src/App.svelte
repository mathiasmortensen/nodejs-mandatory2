<script>
  import { Router, Route } from 'svelte5-router';
  import { onMount } from 'svelte';
  import Navbar from './components/Navbar.svelte';
  import Footer from './components/Footer.svelte';
  import Login from './pages/Login.svelte';
  import { authMe } from './util/auth.svelte.js';
  import 'toastr/build/toastr.min.css';
  import AuthProfile from './components/AuthProfile.svelte';
  import Raccoon from './pages/Raccoon.svelte';

  onMount(async () => {
   await authMe();
  });
</script>

<Navbar />

<main>
  <Router>
    <Route path='/' component={Login} />
    <Route path='/login' component={Login} />
    <Route path='/profile' component={AuthProfile} />
    <Route path='/forgot-password' component={Login}/>
    <Route path='/raccoon' component={Raccoon} />
  </Router>
</main>

<Footer />
