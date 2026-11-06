export const getGoogleSignInErrorMessage = (error) => {
  const hostname = typeof window === 'undefined' ? 'this domain' : window.location.hostname;

  switch (error?.code) {
    case 'auth/unauthorized-domain':
      return `Google sign-in is blocked for ${hostname}. Add this hostname in Firebase Console under Authentication > Settings > Authorized domains.`;
    case 'auth/operation-not-allowed':
      return 'Google sign-in is disabled for this Firebase project. Enable the Google provider under Firebase Authentication > Sign-in method.';
    case 'auth/invalid-api-key':
    case 'auth/api-key-not-valid':
      return 'Firebase rejected the API key. Check VITE_FIREBASE_API_KEY and the other VITE_FIREBASE_* values in Vercel, then redeploy.';
    case 'auth/popup-blocked':
      return 'The Google sign-in popup was blocked. Allow popups for this site and try again.';
    case 'auth/popup-closed-by-user':
    case 'auth/cancelled-popup-request':
      return 'Google sign-in was cancelled before it finished. Please try again.';
    case 'auth/network-request-failed':
      return 'Google sign-in could not reach Firebase. Check your internet connection and try again.';
    default:
      return `Google sign-in failed (${error?.code || 'unknown error'}). Check the browser console for Firebase details.`;
  }
};
