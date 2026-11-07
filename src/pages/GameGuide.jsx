import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// `motion` is used only in JSX; core no-unused-vars can't detect that.
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home,
  ChevronRight,
  ChevronDown,
  Coins,
  Users,
  TrendingUp,
  Target,
  Wifi,
  Sparkles,
  BookOpen,
  HelpCircle,
  Shield,
  ArrowRight,
} from 'lucide-react';
import Footer from '../components/Footer';
import useDocumentTitle from '../hooks/useDocumentTitle';

const FAQS = [
  {
    q: 'What are the auction modes and starting purses?',
    a: 'The current presets are Mega (up to 25 players, ₹120 Cr), 11-Player Classic (11 players, ₹90 Cr), and 5-Player Sprint (5 players, ₹60 Cr). Room settings and the lobby are the source of truth if a host or deployment changes those values.',
  },
  {
    q: 'What are the squad composition and overseas player limits?',
    a: 'The current overseas limits are 8 for Mega, 4 for Classic, and 2 for Sprint. Maximum squad size follows the selected mode. This is a game configuration and should not be treated as a statement of current official IPL regulations.',
  },
  {
    q: 'How much does each bid raise the price?',
    a: 'The current increment is ₹0.20 Cr while the bid is below ₹5 Cr, and ₹0.25 Cr once it reaches ₹5 Cr or more. Check the displayed next-bid amount in the live room.',
  },
  {
    q: 'How do bot teams work?',
    a: 'The host can fill available franchises with built-in computer-controlled bidders. They bid automatically during the live auction and are subject to the room’s purse and squad constraints. Bot decisions are game logic, not predictions or advice.',
  },
  {
    q: 'What does Offline / Hotspot mode do?',
    a: 'It creates a local room using browser storage and local synchronization mechanisms. Cross-device play depends on the selected deployment and availability of its local bridge; cloud services, sign-in, or other features may still require an internet connection.',
  },
  {
    q: 'What happens if a player disconnects during a live auction?',
    a: 'Cloud rooms synchronize through the selected database and may reconnect when a connection returns. If disconnected, a player can miss bids or room changes; refresh or rejoin using the room link and check the visible auction state. Reconnection is not guaranteed in every network or browser condition.',
  },
  {
    q: 'Can I play solo against AI Bots?',
    a: 'Yes. Create a room, select a franchise, then use Fill Bots in the lobby if that control is available to the host. Computer-controlled managers can fill open teams.',
  },
  {
    q: 'Does PurseWar use real money?',
    a: 'No. Budgets and bids are virtual game values. PurseWar does not facilitate betting, deposits, payouts, or real-money player purchases.',
  },
  {
    q: 'What can I do after an auction ends?',
    a: 'Review teams, spending, ratings, and auction results. Managers can save a starting lineup sized for the selected mode (11 for Mega or Classic, 5 for Sprint); the host can reveal a comparison when the room is ready.',
  },
  {
    q: 'What data is saved?',
    a: 'Cloud rooms and account data use Firebase and Supabase. Local mode uses browser storage and local sync. Optional analytics and advertising only load if you accept them. See the Privacy Policy for details and data requests.',
  },
];

const STRATEGY_PLAYBOOKS = [
  {
    tag: 'Aggressive Spine',
    title: 'The Top-Heavy Marquee Strategy',
    teams: 'Example approach',
    desc: 'Invest in a small number of high-value players, then preserve enough purse to fill the rest of the lineup with complementary roles.',
    stat: 'Concentrated spend',
  },
  {
    tag: 'Balanced Spread',
    title: 'The Moneyball Depth Playbook',
    teams: 'Example approach',
    desc: 'Spread the purse across a wider group of players and target role coverage instead of relying on a few expensive signings.',
    stat: 'Spread the budget',
  },
  {
    tag: 'Spine & Spin Control',
    title: 'The Tactical Anchor Approach',
    teams: 'Example approach',
    desc: 'Keep some budget flexible so you can respond to the prices and roles still available later in the auction.',
    stat: 'Keep flexibility',
  },
];

const GameGuide = () => {
  useDocumentTitle(
    'Rulebook & Game Guide | PurseWar',
    'How to create or join PurseWar auction rooms, manage bids and squads, use bot teams, and review post-auction lineups.'
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [activeSection, setActiveSection] = useState('modes');
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const sections = [
    { id: 'modes', label: '1. Game modes' },
    { id: 'how-to-play', label: '2. How to play' },
    { id: 'hotspot', label: '3. Offline / Hotspot mode' },
    { id: 'purse-rules', label: '4. Purse rules & bid tiers' },
    { id: 'playbooks', label: '5. Franchise playbooks' },
    { id: 'bots', label: '6. AI bot engine' },
    { id: 'faq', label: '7. FAQ' },
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

  const gameModes = [
    {
      id: 'mega',
      title: 'Mega Auction',
      subtitle: 'Full-size simulation',
      budget: '₹120.0 Cr',
      squad: 'Up to 25 players',
      overseas: '8 maximum',
      description: 'The largest draft format. Build a squad of up to 25 players and manage the budget and limits shown in the lobby.',
    },
    {
      id: 'sprint11',
      title: '11-Player Classic',
      subtitle: '11-player draft',
      budget: '₹90.0 Cr',
      squad: '11 players',
      overseas: '4 maximum',
      description: 'Quick competitive mode where each franchise drafts their playing XI directly without bench fillers, focusing on core balance and role symmetry.',
    },
    {
      id: 'sprint5',
      title: '5-Player Mini Sprint',
      subtitle: 'Fast 5-player draft',
      budget: '₹60.0 Cr',
      squad: '5 players',
      overseas: '2 maximum',
      description: 'A short draft for building a five-player squad with a smaller purse.',
    },
  ];

  const auctionSteps = [
    {
      step: '1',
      title: 'Create or join a room',
      desc: 'Choose a cloud or local room option, create a room, or enter a room code or invitation link. Select a franchise when you join.',
    },
    {
      step: '2',
      title: 'Claim franchises & fill bots',
      desc: 'Each participant claims an available franchise. The host can use Fill Bots to assign computer-controlled managers to open teams.',
    },
    {
      step: '3',
      title: 'Live paddle bidding & timer',
      desc: 'Players appear one by one with role, base price, and available stats. Use the bid button before the countdown ends. The winning team and price are shown when the lot closes.',
    },
    {
      step: '4',
      title: 'Roster & budget discipline',
      desc: 'Track your remaining purse, roster count, and overseas-player limit. Limits depend on the mode and settings shown in the lobby.',
    },
    {
      step: '5',
      title: 'Summary, ratings & squad cards',
      desc: 'When the auction concludes, inspect squads, spending, and ratings. Save a starting lineup and use the host-controlled comparison when managers are ready.',
    },
  ];

  const botFeatures = [
    {
      title: 'Automated bidding',
      desc: 'Bot managers make game-controlled bid decisions during the auction and follow the room’s current constraints.',
    },
    {
      title: 'Purse and squad limits',
      desc: 'Bots participate within the same purse and squad constraints used by the auction room.',
    },
    {
      title: 'Not a real-world prediction',
      desc: 'Bot behavior is part of the game simulation. It does not represent actual team decisions, player value forecasts, or betting advice.',
    },
    {
      title: 'Mode-aware constraints',
      desc: 'The applicable roster and overseas-player limits vary by mode; check the lobby and live team summary.',
    },
  ];

  // Schema.org FAQPage structured data for Google Search rich snippets
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };

  return (
    <div className="arena-canvas min-h-screen bg-[#0E0F10] text-[#E5E5E5] font-sans selection:bg-white/20 selection:text-white flex flex-col">
      {/* Search Engine FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

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
          <span className="text-white">Rulebook & Guide</span>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/about"
            className="text-xs text-gray-400 hover:text-white transition-colors font-medium hidden sm:inline"
          >
            About Us
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
              <BookOpen size={13} />
              <span>PurseWar room guide</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
              Rulebook & Gameplay Guide
            </h1>
            <p className="text-sm text-gray-500 mb-6">Updated November 7, 2026 • In-app rules may change by room</p>
            <p className="text-base text-[#E5E5E5] leading-relaxed">
              Learn the available room modes, how to host or join, how bidding and team limits work, and what you can review after the auction.
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
            
            {/* 1. Game Modes */}
            <section id="modes" className="scroll-mt-24">
              <h2 className="text-xl font-semibold text-white mb-2">1. Game modes</h2>
              <p className="text-sm text-gray-400 mb-6 leading-relaxed">
                Choose the auction format suited for your session length, group size, and tactical preferences.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {gameModes.map((mode) => (
                  <div key={mode.id} className="border border-white/10 rounded-md p-5 bg-white/[0.01] flex flex-col justify-between">
                    <div>
                      <div className="mb-4">
                        <h3 className="font-semibold text-white text-base">{mode.title}</h3>
                        <p className="text-xs text-gray-500 mt-0.5">{mode.subtitle}</p>
                      </div>

                      <div className="space-y-2 mb-4 text-xs font-mono">
                        <div className="flex justify-between border-b border-white/5 pb-1">
                          <span className="text-gray-400">Purse</span>
                          <span className="text-[#ff5500] font-bold">{mode.budget}</span>
                        </div>
                        <div className="flex justify-between border-b border-white/5 pb-1">
                          <span className="text-gray-400">Squad</span>
                          <span className="text-white font-medium">{mode.squad}</span>
                        </div>
                        <div className="flex justify-between border-b border-white/5 pb-1">
                          <span className="text-gray-400">Overseas</span>
                          <span className="text-white font-medium">{mode.overseas}</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-xs text-gray-400 leading-relaxed">
                      {mode.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* 2. How to Play */}
            <section id="how-to-play" className="scroll-mt-24">
              <h2 className="text-xl font-semibold text-white mb-2">2. How to play</h2>
              <p className="text-sm text-gray-400 mb-6 leading-relaxed">
                Step-by-step walkthrough of hosting, joining, paddle raising, and finalizing rosters.
              </p>

              <div className="space-y-5">
                {auctionSteps.map((s) => (
                  <div key={s.step} className="flex gap-4 items-start border border-white/5 rounded-md p-4 bg-white/[0.01]">
                    <div className="w-7 h-7 shrink-0 rounded-full border border-white/15 flex items-center justify-center text-xs font-bold text-white bg-white/5 mt-0.5">
                      {s.step}
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-white mb-1">{s.title}</h3>
                      <p className="text-xs text-gray-400 leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 3. Offline / Hotspot Mode */}
            <section id="hotspot" className="scroll-mt-24">
              <h2 className="text-xl font-semibold text-white mb-2">3. Offline & Hotspot mode</h2>
              <p className="text-sm text-gray-400 mb-6 leading-relaxed">
                Create a local room for a supported browser and setup. Cross-device local play depends on the local bridge and network configuration.
              </p>

              <div className="border border-white/10 rounded-md p-5 bg-white/[0.01] mb-4">
                <div className="flex items-center gap-2 mb-3 text-[#ff5500]">
                  <Wifi size={18} />
                  <h3 className="text-sm font-semibold text-white">Local room setup</h3>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed mb-4">
                  Local rooms save state in browser storage and use local synchronization mechanisms. A shared hotspot or Wi-Fi alone does not guarantee that separate devices can discover and synchronize a room; the local bridge must be available in the selected setup. Cloud-backed features may still require internet.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-white/10 text-xs">
                  <div className="p-3 rounded bg-white/[0.02] border border-white/5">
                    <span className="font-bold text-white block mb-1">Step 1: Enable Hotspot</span>
                    <span className="text-gray-400">Turn on personal hotspot on one phone or connect everyone to one Wi-Fi.</span>
                  </div>
                  <div className="p-3 rounded bg-white/[0.02] border border-white/5">
                    <span className="font-bold text-white block mb-1">Step 2: Host Room</span>
                    <span className="text-gray-400">Choose the Offline / Hotspot option on the home page and create a local room.</span>
                  </div>
                  <div className="p-3 rounded bg-white/[0.02] border border-white/5">
                    <span className="font-bold text-white block mb-1">Step 3: Join & Draft</span>
                    <span className="text-gray-400">Use the room code on supported devices in the same local setup; test the connection before starting.</span>
                  </div>
                </div>
              </div>
            </section>

            {/* 4. Purse Rules & Bid Tiers */}
            <section id="purse-rules" className="scroll-mt-24">
              <h2 className="text-xl font-semibold text-white mb-2">4. Purse rules & bid tiers</h2>
              <p className="text-sm text-gray-400 mb-6 leading-relaxed">
                The current app presets use the values below, but room configuration is authoritative. PurseWar is a fan-made simulation and does not guarantee that its rules match current official IPL regulations.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="border border-white/10 rounded-md p-5 bg-white/[0.01]">
                  <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/20 text-[#ff5500] flex items-center justify-center mb-3">
                    <Coins size={16} />
                  </div>
                  <h3 className="text-sm font-semibold text-white mb-1.5">Mode-based purse</h3>
                  <p className="text-xs text-gray-400 leading-relaxed mb-3">
                    Current presets start at ₹120 Cr for Mega, ₹90 Cr for Classic, and ₹60 Cr for Sprint. Check the lobby for the room’s actual budget.
                  </p>
                  <div className="text-[11px] font-mono text-gray-500 pt-2 border-t border-white/5 flex justify-between">
                    <span>Classic: 11</span>
                    <span className="text-white font-bold">Sprint: 5</span>
                  </div>
                </div>

                <div className="border border-white/10 rounded-md p-5 bg-white/[0.01]">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center mb-3">
                    <Users size={16} />
                  </div>
                  <h3 className="text-sm font-semibold text-white mb-1.5">Overseas-player limits</h3>
                  <p className="text-xs text-gray-400 leading-relaxed mb-3">
                    The current presets allow up to 8 overseas players in Mega, 4 in Classic, and 2 in Sprint. Room settings may change these limits.
                  </p>
                  <div className="text-[11px] font-mono text-gray-500 pt-2 border-t border-white/5 flex justify-between">
                    <span>Mega: 8</span>
                    <span className="text-white font-bold">Sprint: 2</span>
                  </div>
                </div>

                <div className="border border-white/10 rounded-md p-5 bg-white/[0.01]">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3">
                    <TrendingUp size={16} />
                  </div>
                  <h3 className="text-sm font-semibold text-white mb-1.5">Atomic Paddle Bid Tiers</h3>
                  <p className="text-xs text-gray-400 leading-relaxed mb-3">
                    The next bid is calculated from the current price. Confirm the amount on the live bid button.
                  </p>
                  <div className="text-[11px] font-mono text-gray-500 pt-2 border-t border-white/5 flex justify-between">
                    <span>&lt; ₹5.00 Cr: +₹20L</span>
                    <span className="text-white font-bold">≥ ₹5.00 Cr: +₹25L</span>
                  </div>
                </div>
              </div>
            </section>

            {/* 5. Franchise Strategy Playbooks */}
            <section id="playbooks" className="scroll-mt-24">
              <h2 className="text-xl font-semibold text-white mb-2">5. Franchise bidding playbooks</h2>
              <p className="text-sm text-gray-400 mb-6 leading-relaxed">
                Optional approaches to help manage your virtual budget; they are suggestions, not guaranteed winning strategies.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {STRATEGY_PLAYBOOKS.map((strat, i) => (
                  <div
                    key={i}
                    className="border border-white/10 rounded-md p-5 bg-white/[0.01] flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-[10px] font-mono font-bold uppercase text-[#ff5500] tracking-wider block mb-1">
                        {strat.tag}
                      </span>
                      <h3 className="text-sm font-semibold text-white mb-0.5">
                        {strat.title}
                      </h3>
                      <p className="text-[11px] text-gray-500 font-mono mb-3">
                        {strat.teams}
                      </p>
                      <p className="text-xs text-gray-400 leading-relaxed">
                        {strat.desc}
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono">
                      <span className="text-gray-500">Purse Allocation</span>
                      <span className="text-emerald-400 font-bold">{strat.stat}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 6. AI Bot Engine */}
            <section id="bots" className="scroll-mt-24">
              <h2 className="text-xl font-semibold text-white mb-2">6. Autonomous AI bot engine</h2>
              <p className="text-sm text-gray-400 mb-6 leading-relaxed">
                When the host enables them, computer-controlled teams participate in the auction.
              </p>

              <div className="space-y-4">
                {botFeatures.map((f) => (
                  <div key={f.title} className="border-l-2 border-[#ff5500] pl-4 py-1">
                    <h3 className="text-sm font-medium text-white mb-1">{f.title}</h3>
                    <p className="text-xs text-gray-400 leading-relaxed">{f.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* 7. FAQ */}
            <section id="faq" className="scroll-mt-24">
              <h2 className="text-xl font-semibold text-white mb-2">7. Frequently asked questions</h2>
              <p className="text-sm text-gray-400 mb-6 leading-relaxed">
                Everything you need to know regarding auction rules, bots, technical synchronization, and costs.
              </p>

              <div className="border-t border-white/10">
                {FAQS.map((faq, idx) => (
                  <div key={idx} className="border-b border-white/10">
                    <button
                      type="button"
                      onClick={() => toggleFaq(idx)}
                      className="w-full py-4 flex items-center justify-between text-left hover:text-white transition-colors text-[#E5E5E5] group cursor-pointer"
                    >
                      <span className="text-sm font-medium pr-4">{faq.q}</span>
                      <ChevronDown
                        size={16}
                        className={`text-gray-500 transition-transform duration-200 shrink-0 ${
                          openFaq === idx ? 'rotate-180 text-white' : 'group-hover:text-gray-400'
                        }`}
                      />
                    </button>
                    <AnimatePresence>
                      {openFaq === idx && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="pb-4 text-xs sm:text-sm text-gray-400 leading-relaxed font-normal">
                            {faq.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </section>

          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default GameGuide;
