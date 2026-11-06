import test from 'node:test';
import assert from 'node:assert/strict';
import { getGoogleSignInErrorMessage } from '../src/lib/firebaseAuthErrors.js';

test('unauthorized domain error names the domain to add in Firebase Auth', () => {
  const originalWindow = globalThis.window;
  globalThis.window = { location: { hostname: 'pursewar.vercel.app' } };

  try {
    assert.match(
      getGoogleSignInErrorMessage({ code: 'auth/unauthorized-domain' }),
      /pursewar\.vercel\.app.*Authorized domains/,
    );
  } finally {
    if (originalWindow === undefined) {
      delete globalThis.window;
    } else {
      globalThis.window = originalWindow;
    }
  }
});

test('disabled Google provider gives Firebase setup instructions', () => {
  assert.match(
    getGoogleSignInErrorMessage({ code: 'auth/operation-not-allowed' }),
    /Enable the Google provider/,
  );
});

test('unknown Firebase errors retain their code for diagnosis', () => {
  assert.match(
    getGoogleSignInErrorMessage({ code: 'auth/internal-error' }),
    /auth\/internal-error/,
  );
});
