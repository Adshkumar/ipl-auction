import React, { useEffect, useState } from 'react';
import { Download, Share, X } from 'lucide-react';

const isIosDevice = () => {
  const { userAgent, platform, maxTouchPoints } = navigator;
  return /iPad|iPhone|iPod/.test(userAgent) || (platform === 'MacIntel' && maxTouchPoints > 1);
};

const PWAInstallButton = () => {
  const [installPrompt, setInstallPrompt] = useState(null);
  const [isIos] = useState(() => typeof navigator !== 'undefined' && isIosDevice());
  const [isInstalled, setIsInstalled] = useState(() => (
    typeof window !== 'undefined'
      && (window.matchMedia('(display-mode: standalone)').matches || navigator.standalone === true)
  ));
  const [showIosInstructions, setShowIosInstructions] = useState(false);

  useEffect(() => {
    const handleInstallPrompt = (event) => {
      event.preventDefault();
      setInstallPrompt(event);
    };
    const handleInstalled = () => {
      setIsInstalled(true);
      setInstallPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleInstallPrompt);
    window.addEventListener('appinstalled', handleInstalled);
    return () => {
      window.removeEventListener('beforeinstallprompt', handleInstallPrompt);
      window.removeEventListener('appinstalled', handleInstalled);
    };
  }, []);

  const handleInstall = async () => {
    if (isIos || !installPrompt) {
      setShowIosInstructions(true);
      return;
    }

    const prompt = installPrompt;
    setInstallPrompt(null);
    try {
      await prompt.prompt();
      await prompt.userChoice;
    } catch (error) {
      console.error('[pwa] Could not open the install prompt', error);
      setShowIosInstructions(true);
    }
  };

  if (isInstalled) return null;

  return (
    <>
      <button
        type="button"
        onClick={handleInstall}
        className="mt-4 inline-flex min-h-10 items-center justify-center gap-2 rounded-full border border-[#f5bd55]/30 bg-[#f5bd55]/[0.08] px-4 py-2 text-[9px] font-black uppercase tracking-[0.16em] text-[#f5bd55] transition-colors hover:border-[#f5bd55]/60 hover:bg-[#f5bd55]/[0.14] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f5bd55]"
      >
        <Download size={14} />
        Install PurseWar
      </button>

      {showIosInstructions && (
        <div
          className="fixed inset-0 z-[1200] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setShowIosInstructions(false)}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="pwa-install-title"
            className="w-full max-w-sm rounded-3xl border border-white/10 bg-[#100d0a] p-6 text-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 id="pwa-install-title" className="text-sm font-black uppercase tracking-wider">
                Install PurseWar
              </h2>
              <button
                type="button"
                aria-label="Close install instructions"
                onClick={() => setShowIosInstructions(false)}
                className="rounded-full p-2 text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
              >
                <X size={16} />
              </button>
            </div>
            {isIos ? (
              <>
                <p className="text-xs leading-relaxed text-gray-300">
                  Add PurseWar to your Home Screen for a full-screen app experience:
                </p>
                <ol className="mt-4 space-y-3 text-xs leading-relaxed text-gray-200">
                  <li>1. Open this page in Safari.</li>
                  <li className="flex items-center gap-2">
                    2. Tap Share <Share size={15} className="text-[#f5bd55]" /> in the browser toolbar.
                  </li>
                  <li>3. Choose “Add to Home Screen”, then tap “Add”.</li>
                </ol>
              </>
            ) : (
              <>
                <p className="text-xs leading-relaxed text-gray-300">
                  If your browser didn’t open its install prompt, install PurseWar from the browser menu:
                </p>
                <ul className="mt-4 space-y-3 text-xs leading-relaxed text-gray-200">
                  <li>Android Chrome: tap ⋮, then “Install app” or “Add to Home screen”.</li>
                  <li>Desktop Chrome: use the install icon in the address bar, or choose “Install PurseWar” from ⋮.</li>
                  <li>Microsoft Edge: open Settings and more ⋯, then Apps → Install this site as an app.</li>
                </ul>
              </>
            )}
          </section>
        </div>
      )}
    </>
  );
};

export default PWAInstallButton;
