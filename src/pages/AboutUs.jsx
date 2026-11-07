import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Home,
  ChevronRight,
  ShieldCheck,
  Brain,
  Radio,
  Users,
  Award,
  ExternalLink,
  Code2,
  ArrowRight,
} from 'lucide-react';
import Footer from '../components/Footer';
import useDocumentTitle from '../hooks/useDocumentTitle';

const AboutUs = () => {
  useDocumentTitle(
    'About PurseWar | Cricket Auction Simulator',
    'Learn how PurseWar auction rooms, game modes, local play, privacy choices, and post-auction squad reviews work.'
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [activeSection, setActiveSection] = useState('mission');

  const sections = [
    { id: 'mission', label: '1. What PurseWar is' },
    { id: 'features', label: '2. What you can do' },
    { id: 'technology', label: '3. How rooms work' },
    { id: 'modes', label: '4. Auction modes' },
    { id: 'privacy', label: '5. Privacy and data' },
    { id: 'creator', label: '6. Creator' },
    { id: 'disclaimer', label: '7. Independent project' },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -70% 0px' }
    );

    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 10) {
        setActiveSection(sections[sections.length - 1].id);
      }
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  return (
    <div className="arena-canvas min-h-screen bg-[#0E0F10] text-[#E5E5E5] font-sans selection:bg-white/20 selection:text-white flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0E0F10]/90 backdrop-blur-md border-b border-white/10 px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-medium tracking-wide">
          <Link to="/" className="text-gray-400 hover:text-white transition-colors flex items-center gap-1.5">
            <Home size={14} />
            <span>Home</span>
          </Link>
          <ChevronRight size={14} className="text-gray-600" />
          <span className="text-gray-500">Resources</span>
          <ChevronRight size={14} className="text-gray-600" />
          <span className="text-white">About PurseWar</span>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/guide"
            className="text-xs text-gray-400 hover:text-white transition-colors font-medium hidden sm:inline"
          >
            Rulebook & Guide
          </Link>
          <Link
            to="/"
            className="text-xs font-semibold px-3 py-1.5 rounded-md bg-[#ff5500] hover:bg-[#ff6a1a] text-white transition-colors flex items-center gap-1.5"
          >
            <span>Play Now</span>
            <ArrowRight size={12} />
          </Link>
        </div>
      </header>

      <div className="resource-page-layout max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-12 flex flex-col lg:flex-row gap-5 lg:gap-24 items-start w-full flex-1">
        {/* Left TOC */}
        <aside className="hidden lg:block w-64 shrink-0 sticky top-28">
          <h3 className="text-white font-semibold text-sm mb-4">On this page</h3>
          <nav className="flex flex-col gap-2.5 border-l border-white/10">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                className={`text-sm text-left pl-4 -ml-[1px] border-l ${
                  activeSection === s.id
                    ? 'border-[#ff5500] text-white'
                    : 'border-transparent text-gray-400 hover:text-gray-200 hover:border-white/30'
                } transition-colors`}
              >
                {s.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="resource-page-content flex-1 max-w-3xl w-full pb-8 sm:pb-20">
          <div className="mb-6 sm:mb-12 border-b border-white/10 pb-5 sm:pb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ff5500]/10 border border-[#ff5500]/30 text-[#ff5500] text-xs font-semibold uppercase tracking-wider mb-3">
              <Award size={13} />
              <span>Product, features, and how it works</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
              About PurseWar
            </h1>
            <p className="text-sm text-gray-500 mb-4">Updated November 7, 2026</p>
            <p className="text-base text-[#E5E5E5] leading-relaxed">
              PurseWar is a browser-based cricket auction simulator. Create or join a room, choose a franchise, bid on players with friends or bots, manage a virtual purse, and compare the squads you build. It is an independent fan project—not an official IPL product.
            </p>
          </div>

          <details className="lg:hidden mb-8 border border-white/10 rounded-md p-4 bg-white/[0.01]">
            <summary className="cursor-pointer text-sm font-medium text-white">On this page</summary>
            <nav className="flex flex-col gap-2 mt-3 border-l border-white/10">
              {sections.map((s) => (
                <button
                  key={s.id}
                  onClick={() => scrollTo(s.id)}
                  className={`text-sm text-left pl-3 -ml-[1px] border-l ${
                    activeSection === s.id ? 'border-[#ff5500] text-white' : 'border-transparent text-gray-400'
                  } transition-colors`}
                >
                  {s.label}
                </button>
              ))}
            </nav>
          </details>

          <div className="space-y-8 sm:space-y-16">
            
            {/* 1. What PurseWar is */}
            <section id="mission" className="scroll-mt-24">
              <h2 className="text-xl font-semibold text-white mb-2">1. What PurseWar is</h2>
              <p className="text-sm text-gray-400 mb-6 leading-relaxed">
                A social game about auction decisions: what to bid, when to stop, and how to balance a franchise squad.
              </p>

              <div className="border border-white/10 rounded-md p-5 sm:p-6 bg-white/[0.01] space-y-4">
                <p className="text-sm text-gray-300 leading-relaxed font-normal">
                  Host a private room for friends, join a public room when one is available, or use the solo-friendly bot option. The live room presents the player, current bid, countdown, team purse, and squad status so participants can make decisions together.
                </p>
                <p className="text-sm text-gray-300 leading-relaxed font-normal">
                  All purse amounts, bids, ratings, and results are part of the simulation. PurseWar does not run real-money auctions, betting, or fantasy payouts.
                </p>
              </div>
            </section>

            {/* 2. Product features */}
            <section id="features" className="scroll-mt-24">
              <h2 className="text-xl font-semibold text-white mb-2">2. What you can do</h2>
              <p className="text-sm text-gray-400 mb-6 leading-relaxed">
                The tools are designed to support a complete room session, from the first invite to post-auction squad review.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="arena-feature-card p-5">
                  <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/20 text-[#ff5500] flex items-center justify-center mb-3">
                    <Brain size={16} />
                  </div>
                  <h3 className="text-sm font-semibold text-white mb-1.5">Live multiplayer auctions</h3>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Create a room, invite managers with its room link or code, claim a team, and follow bids and the auction timer as the room updates.
                  </p>
                </div>

                <div className="arena-feature-card p-5">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center mb-3">
                    <Radio size={16} />
                  </div>
                  <h3 className="text-sm font-semibold text-white mb-1.5">Bot managers</h3>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Hosts can fill open franchises with computer-controlled bidders for solo or smaller-group sessions. Their bids follow the game’s configured purse and squad constraints.
                  </p>
                </div>

                <div className="arena-feature-card p-5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3">
                    <ShieldCheck size={16} />
                  </div>
                  <h3 className="text-sm font-semibold text-white mb-1.5">Squad tracking</h3>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Review player roles, team spending, remaining purse, roster counts, and overseas-player counts during and after a draft.
                  </p>
                </div>

                <div className="arena-feature-card p-5">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mb-3">
                    <Users size={16} />
                  </div>
                  <h3 className="text-sm font-semibold text-white mb-1.5">Post-auction review</h3>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    See completed squads and ratings, save a mode-sized lineup, compare submitted lineups when the host reveals them, and share squad cards.
                  </p>
                </div>
              </div>
            </section>

            {/* 3. Technology and room types */}
            <section id="technology" className="scroll-mt-24">
              <h2 className="text-xl font-semibold text-white mb-2">3. How rooms work</h2>
              <p className="text-sm text-gray-400 mb-6 leading-relaxed">
                Cloud and local room options use different storage and synchronization paths.
              </p>

              <div className="border border-white/10 rounded-md p-5 sm:p-6 bg-white/[0.01] space-y-4">
                <p className="text-sm text-gray-300 leading-relaxed">
                  Cloud rooms use Firebase Realtime Database for live state and Supabase for parts of room discovery, history, and team records. The app can offer more than one configured auction server; the room’s selected server is shown in the interface.
                </p>
                <p className="text-sm text-gray-300 leading-relaxed">
                  Offline / Hotspot rooms use local browser storage and local synchronization mechanisms. The exact ability to synchronize across devices depends on the selected mode and whether the local bridge is available. Local mode should not be assumed to provide cloud backup or cross-device recovery.
                </p>
              </div>
            </section>

            {/* 4. Auction modes */}
            <section id="modes" className="scroll-mt-24">
              <h2 className="text-xl font-semibold text-white mb-2">4. Auction modes and rules</h2>
              <p className="text-sm text-gray-400 mb-6 leading-relaxed">
                Mega, Classic, and Sprint formats use different squad sizes and constraints. The host chooses the mode and room settings; check the lobby before the auction begins.
              </p>

              <div className="border border-white/10 rounded-md p-5 bg-white/[0.01]">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div className="p-3 rounded bg-white/[0.02] border border-white/5">
                    <span className="font-mono text-[10px] text-gray-500 uppercase block mb-1">Mega</span>
                    <span className="text-sm font-bold text-white block">Up to 25 players</span>
                    <span className="text-gray-400 text-[11px] mt-1 block">Room settings show budget and overseas limit</span>
                  </div>

                  <div className="p-3 rounded bg-white/[0.02] border border-white/5">
                    <span className="font-mono text-[10px] text-gray-500 uppercase block mb-1">Classic</span>
                    <span className="text-sm font-bold text-white block">11 players</span>
                    <span className="text-gray-400 text-[11px] mt-1 block">Starting-lineup sized room</span>
                  </div>

                  <div className="p-3 rounded bg-white/[0.02] border border-white/5">
                    <span className="font-mono text-[10px] text-gray-500 uppercase block mb-1">Sprint</span>
                    <span className="text-sm font-bold text-white block">5 players</span>
                    <span className="text-gray-400 text-[11px] mt-1 block">Compact draft with mode-specific limits</span>
                  </div>
                </div>
                <p className="mt-4 text-xs leading-relaxed text-gray-500">
                  Rules are configurable and can vary by room. PurseWar is a fan-made simulation and does not claim that every setting reproduces current official competition regulations.
                </p>
              </div>
            </section>

            <section id="privacy" className="scroll-mt-24">
              <h2 className="text-xl font-semibold text-white mb-2">5. Privacy and data</h2>
              <p className="text-sm text-gray-400 mb-4 leading-relaxed">
                Account type, room visibility, chat, feedback, browser storage, and optional analytics all affect what information is handled.
              </p>
              <div className="border border-white/10 rounded-md p-5 sm:p-6 bg-white/[0.01] space-y-3">
                <p className="text-sm text-gray-300 leading-relaxed">Google and guest authentication are provided through Firebase. Cloud auction state uses Firebase; Supabase supports parts of room discovery and history. Feedback sent through the form is stored for review.</p>
                <p className="text-sm text-gray-300 leading-relaxed">Optional analytics and advertising only load after you accept them. Local browser storage is used for preferences and local-room data. Visit the <Link to="/privacy" className="text-[#f5bd55] underline underline-offset-2 hover:text-white">Privacy Policy</Link> for data details and requests.</p>
              </div>
            </section>

            <section id="creator" className="scroll-mt-24">
              <h2 className="text-xl font-semibold text-white mb-2">6. Creator</h2>
              <p className="text-sm text-gray-400 mb-6 leading-relaxed">
                PurseWar is an independently maintained project by Adarsh Kumar.
              </p>

              <div className="border border-white/10 rounded-md p-5 sm:p-6 bg-white/[0.01] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#ff5500] uppercase tracking-wider mb-2">
                    <Code2 size={14} />
                    <span>Creator & Maintainer</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Adarsh Kumar
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-normal max-w-xl">
                    PurseWar is built and maintained as a cricket auction game. Features and player data may change as the app evolves; feedback and bug reports help guide improvements.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto shrink-0">
                  <a
                    href="https://adshkumar.is-a.dev/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 rounded-md bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-white transition-all flex items-center justify-center gap-2"
                  >
                    <span>Portfolio</span>
                    <ExternalLink size={12} />
                  </a>
                  <a
                    href="https://github.com/Adshkumar/ipl-auction"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 rounded-md bg-[#ff5500] hover:bg-[#ff6a1a] text-xs font-semibold text-white transition-all flex items-center justify-center gap-2 shadow-[0_4px_12px_rgba(255,85,0,0.25)]"
                  >
                    <span>GitHub</span>
                    <ExternalLink size={12} />
                  </a>
                </div>
              </div>
            </section>

            <section id="disclaimer" className="scroll-mt-24">
              <h2 className="text-xl font-semibold text-white mb-2">7. Independent fan project</h2>
              <div className="border border-white/10 rounded-md p-5 bg-white/[0.01] text-xs text-gray-400 leading-relaxed space-y-2">
                <p>
                  PurseWar is an independent fan-created simulation for entertainment. It is not affiliated with, endorsed by, or sponsored by the Board of Control for Cricket in India (BCCI), the Indian Premier League (IPL), or any participating franchise.
                </p>
                <p>
                  Team names, marks, logos, player names, and images belong to their respective rights holders. Their appearance here does not imply endorsement.
                </p>
              </div>
            </section>

          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default AboutUs;
