// DXR Discover - completely standalone auth (nuked all shared connections).
// This file no longer imports or depends on /auth-core.js or any shared IBS auth system.
// The discover frontend is now isolated as requested.

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

const SUPABASE_URL = 'https://jtifhcvbgxqwlywugvjv.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp0aWZoY3ZiZ3hxd2x5d3Vndmp2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI1MDc5NTgsImV4cCI6MjA4ODA4Mzk1OH0.UfRVLuvM8_HPvKXUEDXb0cxR50znv16L5Tf99AnSc7g';

const STORAGE_KEY = 'sb-dxr-discover-auth';
const LOGIN_PATH = '/login.html';

export const discoverSupabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storageKey: STORAGE_KEY,
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: false,
  },
});

export { SUPABASE_URL, SUPABASE_ANON_KEY };

export async function discoverAuthGuard(opts = {}) {
  // PUBLIC MARKETING SITE RULE: Never auto-redirect on the main public pages
  // (/, /grid.html, /terminal.html, etc). The module is intentionally imported
  // eagerly by index.html for Stripe pricing buttons and lazily for the login modal.
  // Only enforce auth inside /dealxradar/* paths.
  const path = window.location.pathname;
  const isPublicMarketingPage = path === '/' || 
                                path.startsWith('/#') || 
                                path === '/grid.html' ||
                                path === '/terminal.html' ||
                                !path.startsWith('/dealxradar/');

  if (isPublicMarketingPage) {
    const { data: { session } } = await discoverSupabase.auth.getSession();
    return session ? session.user : null;
  }

  const nextParam = opts.next ? '?next=' + encodeURIComponent(opts.next) : '';
  const { data: { session } } = await discoverSupabase.auth.getSession();
  if (!session) {
    window.location.replace(LOGIN_PATH + nextParam);
    return null;
  }
  return session.user;
}

export async function discoverAuthFetch(functionName, body) {
  const { data: { session } } = await discoverSupabase.auth.getSession();
  if (!session) {
    const path = window.location.pathname;
    const isPublicMarketingPage = path === '/' || 
                                  path.startsWith('/#') || 
                                  path === '/grid.html' ||
                                  path === '/terminal.html' ||
                                  !path.startsWith('/dealxradar/');

    if (isPublicMarketingPage) {
      // On public marketing pages, don't auto-redirect — just throw so caller can handle.
      throw new Error('not_authenticated');
    }

    const current = window.location.pathname + window.location.search;
    window.location.replace(`${LOGIN_PATH}?return=${encodeURIComponent(current)}`);
    throw new Error('not_authenticated');
  }
  return fetch(`${SUPABASE_URL}/functions/v1/${functionName}`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'authorization': `Bearer ${session.access_token}`,
      apikey: SUPABASE_ANON_KEY,
    },
    body: JSON.stringify(body),
  });
}

export async function discoverSignOut() {
  await discoverSupabase.auth.signOut();
  window.location.replace(LOGIN_PATH);
}

export function discoverCurrentRole(user) {
  return (user && user.app_metadata && user.app_metadata.role) || '';
}

// Reactive auth listener — fully guarded for the public marketing site.
// Because index.html eagerly imports this module (initDiscoverStripe for pricing),
// and the login modal does a lazy import, this listener must never redirect
// users away from /, /grid.html, /terminal.html, etc.
// It only reacts inside the protected /dealxradar/ tool.
discoverSupabase.auth.onAuthStateChange((event, session) => {
  if (event === 'SIGNED_OUT' || !session) {
    const path = window.location.pathname;
    const isPublicMarketingPage = path === '/' || 
                                  path.startsWith('/#') || 
                                  path === '/grid.html' ||
                                  path === '/terminal.html' ||
                                  !path.startsWith('/dealxradar/') ||
                                  path.endsWith('/login.html') || 
                                  path.endsWith('/checkout.html');

    if (isPublicMarketingPage) {
      return; // Explicitly do nothing. No redirect on public marketing content.
    }
    window.location.replace(LOGIN_PATH);
  }
});
