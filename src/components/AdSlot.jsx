import React, { useEffect, useState } from 'react';
import {
  adsenseClientId,
  getPrivacyConsent,
  privacyPreferenceChangedEvent,
} from '../lib/privacyPreferences';

const AdSlot = ({ slot, className = '', label = 'Advertisement' }) => {
  const clientId = adsenseClientId;
  const [hasOptionalConsent, setHasOptionalConsent] = useState(
    () => getPrivacyConsent() === 'accepted'
  );
  const canRenderAd = hasOptionalConsent && clientId && slot;

  useEffect(() => {
    const updateConsent = () => {
      setHasOptionalConsent(getPrivacyConsent() === 'accepted');
    };

    document.addEventListener(privacyPreferenceChangedEvent, updateConsent);
    return () => document.removeEventListener(privacyPreferenceChangedEvent, updateConsent);
  }, []);

  useEffect(() => {
    if (!canRenderAd) return;

    if (!document.querySelector('script[src*="adsbygoogle.js"]')) {
      const script = document.createElement('script');
      script.id = 'google-adsense-script';
      script.async = true;
      script.crossOrigin = 'anonymous';
      script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${clientId}`;
      document.head.appendChild(script);
    }

    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // Ad blockers or delayed script loading can throw here; the page should continue normally.
    }
  }, [canRenderAd, clientId, slot]);

  if (!canRenderAd) {
    return null;
  }

  return (
    <section className={`relative z-10 w-full max-w-6xl mx-auto ${className}`} aria-label={label}>
      <div className="mb-2 flex items-center justify-center gap-3">
        <div className="h-px w-10 bg-white/10" />
        <span className="text-[8px] font-black uppercase tracking-[0.35em] text-gray-500">{label}</span>
        <div className="h-px w-10 bg-white/10" />
      </div>
      <ins
        className="adsbygoogle block min-h-[90px] rounded-2xl border border-white/10 bg-white/[0.02]"
        style={{ display: 'block' }}
        data-ad-client={clientId}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </section>
  );
};

export default AdSlot;
