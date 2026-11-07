export const getFirebaseRtdbErrorMessage = (error, serverLabel = 'selected auction server') => {
  const code = String(error?.code || '').toLowerCase();
  const message = String(error?.message || '').toLowerCase();
  const isPermissionDenied = code.includes('permission-denied')
    || code.includes('permission_denied')
    || message.includes('permission_denied')
    || message.includes('permission denied');

  if (isPermissionDenied) {
    return `Firebase Realtime Database denied this request on ${serverLabel}. Check that database.rules.json is deployed to the database configured for this auction server, then try again.`;
  }

  return error?.message || 'The auction request failed. Please try again.';
};
