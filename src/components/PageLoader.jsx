import React, { useState, useEffect } from 'react';
// `motion` is used only inside JSX; core no-unused-vars can't detect that.
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { Gavel, ChevronRight } from 'lucide-react';

const GAME_TIPS = [
  "TIP: Hosting a room is free. Tap Create Room, pick your franchise, and share the 6-character code with your crew.",
  "TIP: Playing solo? Use Fill Bots in the lobby to fill open franchises with computer-controlled bidders.",
  "TIP: Public rooms are listed in the Join tab - jump into an open auction without needing a room code.",
  "TIP: Watch your purse. Keep enough budget for the squad slots you still need.",
  "DID YOU KNOW: PurseWar enforces the overseas quota automatically - max 8 in Mega, 4 in Classic, 2 in Sprint.",
  "TIP: Toggle your room Public or Private before starting so only the right players can join.",
  "TIP: Completed auctions may be available in History, depending on the room type and saved data.",
  "TIP: No Google sign-in needed - continue as a guest manager and start bidding."
];

const PageLoader = ({ isGame = false }) => {
  const [progress, setProgress] = useState(0);
  const [tipIndex, setTipIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  // Ensure loader UI stays visible for at least 2 seconds
  const [showLoader, setShowLoader] = useState(true);
  const skippedIntro = useSkippedLocalState();

  // Check if we are on the landing page
  const isGameMode = isGame || (typeof window !== 'undefined' && window.location.pathname === '/');

  useEffect(() => {
    if (!isGameMode) return;

    // Load progress based on actual page load event
    let progressInterval = null;
    let simulatedInterval = null;
    let fallbackTimeout = null;
    let finished = false;
    const finishLoading = () => {
      if (finished) return;
      finished = true;
      setProgress(100);
      setIsLoaded(true);
      setShowLoader(false);
      if (progressInterval) clearInterval(progressInterval);
      if (simulatedInterval) clearInterval(simulatedInterval);
      if (fallbackTimeout) clearTimeout(fallbackTimeout);
      window.removeEventListener('load', finishLoading);
    };

    // Third-party scripts can delay the window load event indefinitely.
    fallbackTimeout = setTimeout(finishLoading, 10000);

    const startRealProgress = () => {
      // Increment progress slowly until the page load event fires (stop near 95% to keep animation smooth)
      progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 95) {
            return prev; // pause increment, wait for load event
          }
          return prev + 0.5; // smooth gradual increase
        });
      }, 30);
    };

    // Start with a deterministic 2‑second simulated loading
    const simulatedStep = 100 / (2000 / 30);
    simulatedInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) {
          return prev;
        }
        return Math.min(prev + simulatedStep, 95);
      });
    }, 30);

    // After 2 seconds switch to real progress handling
    const switchTimeout = setTimeout(() => {
      if (simulatedInterval) clearInterval(simulatedInterval);
      startRealProgress();
      // Ensure at least 2s display before considering load
      if (document.readyState === 'complete') {
        finishLoading();
      } else {
        window.addEventListener('load', finishLoading);
      }
    }, 2000);

    // No immediate load listener; will be attached after simulated phase
    
  // Rotate tips every 10 seconds
    const tipTimer = setInterval(() => {
      setTipIndex((prev) => (prev + 1) % GAME_TIPS.length);
    }, 10000);

    // Keyboard listener to skip/continue
    const handleKeyDown = (e) => {
      if (e.key === 'x' || e.key === 'X' || e.key === 'Enter') {
        setIsLoaded(true);
        setProgress(100);
        document.dispatchEvent(new CustomEvent('skipIntro'));
      }
    };

    window.addEventListener('keydown', handleKeyDown);

      return () => {
        if (progressInterval) clearInterval(progressInterval);
        if (simulatedInterval) clearInterval(simulatedInterval);
        if (fallbackTimeout) clearTimeout(fallbackTimeout);
        if (switchTimeout) clearTimeout(switchTimeout);
        clearInterval(tipTimer);
        window.removeEventListener('keydown', handleKeyDown);
        window.removeEventListener('load', finishLoading);
      };
  }, [isGameMode]);

  // Handle local skip action
  const handleContinue = () => {
    setIsLoaded(true);
    setProgress(100);
    document.dispatchEvent(new CustomEvent('skipIntro'));
  };

  if (isGameMode && !skippedIntro) {
    return (
      <motion.div
        className="arena-canvas loader-screen fixed inset-0 z-[9999] bg-[#050505] flex flex-col justify-between px-4 pt-[max(1.25rem,env(safe-area-inset-top))] pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:px-8 sm:py-8 overflow-y-auto overflow-x-hidden select-none font-sans text-white"
      >

        {/* Dynamic HTML/CSS Gaming Backdrop (Matches Landing Page Theme) */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Ambient Glowing Orbs */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 40, 0],
              y: [0, -20, 0]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] bg-[#ff5500]/15 blur-[130px] rounded-full"
          />
          <motion.div
            animate={{
              scale: [1, 1.15, 1],
              x: [0, -30, 0],
              y: [0, 30, 0]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute -bottom-[10%] -right-[10%] w-[60%] h-[60%] bg-blue-600/10 blur-[130px] rounded-full"
          />

          <div className="arena-grid-layer" />

          {/* Radial Overlay to darken edges (Vignette) */}
          <div className="absolute inset-0 bg-radial-[circle_at_center,transparent_20%,#050505_95%]" />
        </div>

        <header className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#f5bd55]/30 bg-[#f5bd55]/10 text-[#f5bd55]">
              <Gavel size={17} />
            </span>
            <span
              className="text-lg font-semibold tracking-tight text-white"
              style={{ fontFamily: '"Geist Pixel", Silkscreen, VT323, "Geist Mono", monospace' }}
            >
              PurseWar
            </span>
          </div>
          <span className="rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5 text-[8px] font-black uppercase tracking-[0.18em] text-white/55 sm:text-[9px]">
            Cricket auction simulator
          </span>
        </header>

        <main className="relative z-10 mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center py-8 text-center sm:py-12">
          <div className="loader-stadium-mark relative mb-6 flex h-28 w-28 items-center justify-center sm:mb-8 sm:h-36 sm:w-36">
            <div className="absolute inset-0 rounded-full border border-[#f5bd55]/15" />
            <div className="absolute inset-[12%] rounded-full border border-[#f5bd55]/25" />
            <div className="absolute inset-[25%] rounded-full border border-dashed border-white/15" />
            <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-[#f5bd55]/30 bg-[#f5bd55]/10 text-[#f5bd55] shadow-[0_0_40px_rgba(245,189,85,0.14)] sm:h-16 sm:w-16">
              <Gavel size={25} />
            </span>
            <motion.span
              className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#f5bd55]"
              animate={{ rotate: 360 }}
              transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
            />
          </div>
          <p className="mb-3 text-[9px] font-black uppercase tracking-[0.28em] text-[#f5bd55] sm:text-[10px]">
            Welcome to the auction floor
          </p>
          <h1 className="max-w-3xl text-balance text-3xl font-black uppercase leading-[0.98] tracking-[-0.06em] text-white sm:text-5xl md:text-6xl">
            Build your <span className="text-[#f5bd55]">franchise.</span>
          </h1>
          <p className="mt-4 max-w-xl text-xs font-medium leading-relaxed text-white/55 sm:mt-5 sm:text-sm">
            Pick your team, manage your purse, and take your place in the live auction.
          </p>
        </main>

        <section className="relative z-10 mx-auto w-full max-w-6xl">
          <div className="grid gap-3 rounded-2xl border border-white/10 bg-[#100d0b]/90 p-3 shadow-[0_20px_70px_rgba(0,0,0,0.4)] backdrop-blur-md sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:gap-6 sm:rounded-3xl sm:p-5 md:p-6">
            <div className="flex min-h-14 min-w-0 flex-col justify-center border-l-2 border-[#f5bd55]/70 pl-3 sm:min-h-16 sm:pl-4">
              <span className="mb-1 text-[8px] font-black uppercase tracking-[0.2em] text-[#f5bd55] sm:text-[9px]">
                Auction tip
              </span>
              <AnimatePresence mode="wait">
                <motion.p
                  key={tipIndex}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.2 }}
                  className="text-[11px] font-semibold leading-relaxed text-white/75 sm:text-sm"
                >
                  {GAME_TIPS[tipIndex]}
                </motion.p>
              </AnimatePresence>
            </div>

            <div className="flex min-h-11 items-center justify-between gap-3 sm:justify-end">
              <AnimatePresence mode="wait">
                {(!isLoaded && showLoader) ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.96 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="flex items-center gap-2.5 text-[9px] font-bold uppercase tracking-[0.16em] text-white/55 sm:text-[10px]"
                    role="status"
                    aria-live="polite"
                  >
                    <motion.span
                      className="h-4 w-4 rounded-full border-2 border-white/15 border-t-[#f5bd55]"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    />
                    Getting the arena ready
                  </motion.div>
                ) : (
                  <motion.button
                    key="enter"
                    onClick={handleContinue}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="group relative flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-[#f5bd55]/40 bg-[#e8b44f] px-5 py-3 text-[10px] font-black uppercase tracking-[0.16em] text-[#21170a] shadow-[0_8px_24px_rgba(232,180,79,0.14)] transition hover:bg-[#f3c76e] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#f5bd55]/70 focus:ring-offset-2 focus:ring-offset-[#090807] sm:w-auto sm:px-6"
                  >
                    <span className="relative z-10">Enter Auction Hub</span>
                    <ChevronRight size={15} className="relative z-10 transition-transform group-hover:translate-x-0.5" />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div
            className="mt-3 h-1 overflow-hidden rounded-full bg-white/[0.07]"
            role="progressbar"
            aria-label="Loading PurseWar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(progress)}
          >
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-[#cf8d34] via-[#f5bd55] to-[#ffe1a0] shadow-[0_0_12px_rgba(245,189,85,0.45)]"
              animate={{ width: `${isLoaded ? 100 : Math.max(progress, 5)}%` }}
              transition={{ duration: 0.2, ease: 'linear' }}
            />
          </div>
        </section>
      </motion.div>
    );
  }

  // Original Minimal Loader for other pages/sections
  return (
    <div className="arena-canvas fixed inset-0 z-[9999] bg-[#050505] flex flex-col items-center justify-center p-4">
      {/* Background Match */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-orange-600/10 blur-[120px] rounded-full" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[50%] h-[50%] bg-blue-600/5 blur-[120px] rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03]" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center">
        <div className="relative flex items-center justify-center w-12 h-12 mb-6">
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-white/10 border-t-orange-500"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </div>
    </div>
  );
};

// Helper hook to check if intro was skipped locally
const useSkippedLocalState = () => {
  const [skipped, setSkipped] = useState(false);
  useEffect(() => {
    const handleSkip = () => setSkipped(true);
    document.addEventListener('skipIntro', handleSkip);
    return () => document.removeEventListener('skipIntro', handleSkip);
  }, []);
  return skipped;
};

export default PageLoader;
