import toastr from 'toastr';
import { navigate } from 'svelte5-router';
import { fetchGet, fetchPost } from './fetchHelper.js';

export const auth = $state({
  user: null,
  isAuthenticated: false,
  readyToRedirect: false,
});

export async function authMe() {
  const response = await fetchGet('/auth/me');

  if (!response || !response.ok) {
    auth.user = null;
    auth.isAuthenticated = false;
    auth.readyToRedirect = true;
    return;
  }

  auth.isAuthenticated = true;
  auth.user = await response.json();
  auth.readyToRedirect = true;
}

export async function login(identifier, password) {
  const response = await fetchPost('/auth/login', { identifier, password });

  if (!response || !response.ok) {
    const error = response ? await response.text() : 'Ukendt fejl';
    toastr.error(error);
    return;
  }

  await authMe();
  toastr.success('Du er logget ind!');
  navigate('/profile', { replace: true });
}

export async function signup(email, username, password) {
  const response = await fetchPost('/auth/signup', {
    email,
    username,
    password,
  });

  if (!response || !response.ok) {
    const error = response ? await response.text() : 'Ukendt fejl';
    toastr.error(error);
    return;
  }

  await login(email, password);
  toastr.clear();
  toastr.success('Du er oprettet som bruger og nu logget ind..');
}

export async function logout() {
  const response = await fetchPost('/auth/logout', {});

  if (!response || !response.ok) {
    const error = response ? await response.text() : 'Ukendt fejl';
    toastr.error(error);
    return;
  }

  auth.user = null;
  auth.isAuthenticated = false;
  auth.readyToRedirect = true;
  navigate('/login', { replace: true });
  toastr.success('Du er nu logget ud...');
}

export async function forgotPassword(identifier) {
  const response = await fetchPost('/auth/forgot-password', { identifier });

  if (!response || !response.ok) {
    const error = response ? await response.text() : 'Ukendt fejl';
    toastr.error(error);
    return;
  }

  navigate('/login', { replace: true });
  toastr.success('Mail sendt til: ' + identifier);
}
