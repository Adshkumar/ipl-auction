const CONSENT_KEY = 'cookie_consent_status';
const CONSENT_GRANTED_EVENT = 'pursewar:optional-services-approved';
const PREFERENCE_CHANGED_EVENT = 'pursewar:privacy-preference-changed';
export const adsenseClientId =
  import.meta.env.VITE_ADSENSE_CLIENT_ID || 'ca-pub-2952599241278941';

export function getPrivacyConsent() {
  if (typeof window === 'undefined') return null;

  try {
    return window.localStorage.getItem(CONSENT_KEY);
  } catch {
    return null;
  }
}

export function setPrivacyConsent(consent) {
  try {
    window.localStorage.setItem(CONSENT_KEY, consent);
  } catch {
    console.warn('[privacy] Could not save the cookie preference in browser storage.');
  }

  if (consent === 'accepted') {
    enableOptionalServices();
  }
  if (typeof document !== 'undefined') {
    document.dispatchEvent(new Event(PREFERENCE_CHANGED_EVENT));
  }
}

export function enableOptionalServices() {
  if (typeof document === 'undefined') return;

  const optionalScripts = [
    {
      id: 'pursewar-cloudflare-analytics',
      src: 'https://static.cloudflareinsights.com/beacon.min.js',
      attributes: {
        type: 'module',
        'data-cf-beacon': JSON.stringify({
          token: '4b65f211b1be460b86bb03f73a9fa9ed',
          spa: true,
        }),
      },
    },
    {
      id: 'google-adsense-script',
      src: `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClientId}`,
      attributes: {
        async: '',
        crossorigin: 'anonymous',
      },
    },
  ];

  optionalScripts.forEach(({ id, src, attributes }) => {
    if (document.getElementById(id)) return;

    const script = document.createElement('script');
    script.id = id;
    script.src = src;
    Object.entries(attributes).forEach(([name, value]) => {
      script.setAttribute(name, value);
    });
    document.head.appendChild(script);
  });

  document.dispatchEvent(new Event(CONSENT_GRANTED_EVENT));
}

export const optionalServicesConsentEvent = CONSENT_GRANTED_EVENT;
export const privacyPreferenceChangedEvent = PREFERENCE_CHANGED_EVENT;
