import test from 'node:test';
import assert from 'node:assert/strict';
import { getFirebaseRtdbErrorMessage } from '../src/lib/firebaseRtdbErrors.js';

test('permission denied errors explain which RTDB rules to deploy', () => {
  assert.match(
    getFirebaseRtdbErrorMessage(
      { code: 'PERMISSION_DENIED', message: 'permission_denied' },
      'Server 2',
    ),
    /Server 2.*database\.rules\.json.*try again/,
  );
});

test('other database errors retain their message', () => {
  assert.equal(
    getFirebaseRtdbErrorMessage({ code: 'NETWORK_ERROR', message: 'connection lost' }),
    'connection lost',
  );
});
