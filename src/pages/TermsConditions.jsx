import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Home, ChevronRight, ShieldCheck } from 'lucide-react';
import Footer from '../components/Footer';
import useDocumentTitle from '../hooks/useDocumentTitle';

const TermsConditions = () => {
  useDocumentTitle(
    'Terms of Service | PurseWar',
    'Terms covering PurseWar accounts, auction rooms, chat, virtual game values, and third-party services.'
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [activeSection, setActiveSection] = useState('about');

  const sections = [
    { id: 'about', label: '1. About the service' },
    { id: 'acceptance', label: '2. Using PurseWar' },
    { id: 'accounts', label: '3. Accounts and rooms' },
    { id: 'virtual', label: '4. Virtual values only' },
    { id: 'conduct', label: '5. Conduct and content' },
    { id: 'affiliation', label: '6. Independent fan project' },
    { id: 'ip', label: '7. Intellectual property' },
    { id: 'third-party', label: '8. Third-party services and ads' },
    { id: 'availability', label: '9. Availability and data' },
    { id: 'changes-service', label: '10. Service changes' },
    { id: 'liability', label: '11. Disclaimers and liability' },
    { id: 'changes-terms', label: '12. Terms updates' },
    { id: 'contact', label: '13. Contact' },
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
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 10) {
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
          <span className="text-gray-500">Legal</span>
          <ChevronRight size={14} className="text-gray-600" />
          <span className="text-white">Terms</span>
        </div>
      </header>

      <div className="resource-page-layout max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-12 flex flex-col lg:flex-row gap-5 lg:gap-24 items-start w-full flex-1">
        {/* Left TOC - sticky on desktop, hidden on mobile */}
        <aside className="hidden lg:block w-64 shrink-0 sticky top-28">
          <h3 className="text-white font-semibold text-sm mb-4">On this page</h3>
          <nav className="flex flex-col gap-2.5 border-l border-white/10">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                className={`text-sm text-left pl-4 -ml-[1px] border-l ${activeSection === s.id ? 'border-[#ff5500] text-white' : 'border-transparent text-gray-400 hover:text-gray-200 hover:border-white/30'} transition-colors`}
              >
                {s.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="resource-page-content flex-1 max-w-3xl w-full pb-8 sm:pb-20">
          <details className="lg:hidden mb-6 border border-white/10 rounded-md p-4 bg-white/[0.01]">
            <summary className="cursor-pointer text-sm font-medium text-white">On this page</summary>
            <nav className="flex flex-col gap-2 mt-3 border-l border-white/10">
              {sections.map((s) => (
                <button
                  key={s.id}
                  onClick={() => scrollTo(s.id)}
                  className={`text-sm text-left pl-3 -ml-[1px] border-l ${activeSection === s.id ? 'border-[#ff5500] text-white' : 'border-transparent text-gray-400'} transition-colors`}
                >
                  {s.label}
                </button>
              ))}
            </nav>
          </details>

          <div className="mb-6 sm:mb-12 border-b border-white/10 pb-5 sm:pb-8">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/[0.06] px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.16em] text-amber-200">
              <ShieldCheck size={13} /> Game rules and user responsibilities
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white mb-3">Terms of Service</h1>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-4">Last updated: November 7, 2026</p>
            <p className="text-base text-[#E5E5E5] leading-relaxed">
              These terms explain the basic rules for using PurseWar. If you do not agree, do not use the service. PurseWar is a fan-made game, not a real auction, betting service, or official IPL product.
            </p>
          </div>

          <div className="space-y-6 sm:space-y-12">
            <section id="about" className="scroll-mt-24">
              <h2 className="text-xl font-semibold text-white mb-4">1. About the service</h2>
              <div className="space-y-4 text-[#E5E5E5] text-base leading-relaxed">
                <p>
                  PurseWar is a browser-based cricket auction simulation. It provides cloud and local room options, virtual bidding and purse management, computer-controlled teams, auction summaries, squad ratings, and post-auction lineup comparison. Features and room rules may change.
                </p>
              </div>
            </section>

            <section id="acceptance" className="scroll-mt-24">
              <h2 className="text-xl font-semibold text-white mb-4">2. Using PurseWar</h2>
              <div className="space-y-4 text-[#E5E5E5] text-base leading-relaxed">
                <p>
                  You may sign in with Google or use guest access where available. You are responsible for activity under your session, keeping room links private when appropriate, and using the app lawfully. Do not impersonate another person or claim affiliation with a team or the platform.
                </p>
              </div>
            </section>

            <section id="accounts" className="scroll-mt-24">
              <h2 className="text-xl font-semibold text-white mb-4">3. Accounts and rooms</h2>
              <div className="space-y-4 text-[#E5E5E5] text-base leading-relaxed">
                <p>Room hosts control available settings and may be able to pause or end an auction, manage participants, choose public or private visibility, and enable bot teams. Room codes and invitation links allow other people to enter; do not share them publicly unless you intend to.</p>
                <p>Room participants can see information needed to play, including display names, selected teams, bids, squads, and chat messages. Public rooms may be listed to other users. Do not put confidential or sensitive information in room data.</p>
                <p>Local rooms rely on browser storage and supported local synchronization. Local rooms may not have cloud backup or cross-device recovery. Cloud synchronization and reconnection depend on internet access, service availability, and database configuration.</p>
              </div>
            </section>

            <section id="virtual" className="scroll-mt-24">
              <h2 className="text-xl font-semibold text-white mb-4">4. Virtual values only</h2>
              <div className="space-y-4 text-[#E5E5E5] text-base leading-relaxed">
                <p>
                  All budgets, bids, prices, ratings, and scores shown in PurseWar are <strong>virtual game values</strong> for entertainment and simulation only.
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-400">
                  <li>PurseWar does not take auction deposits, accept wagers, or issue game winnings or payouts.</li>
                  <li>Virtual budgets have no real-world value and cannot be exchanged, transferred, or redeemed.</li>
                  <li>Do not use the game’s values as financial, betting, or player-performance advice.</li>
                </ul>
              </div>
            </section>

            <section id="conduct" className="scroll-mt-24">
              <h2 className="text-xl font-semibold text-white mb-4">5. Conduct and content</h2>
              <div className="space-y-4 text-[#E5E5E5] text-base leading-relaxed">
                <p>To ensure a stable and fair environment for all users, you agree not to:</p>
                <ul className="list-disc pl-5 space-y-2 text-gray-400">
                  <li>Disrupt rooms, abuse the service, bypass access controls, or interfere with other users’ sessions.</li>
                  <li>Use chat, display names, or feedback to threaten, harass, impersonate, or share unlawful, hateful, or private content.</li>
                  <li>Attempt to manipulate room data or exploit a bug to gain an unfair advantage.</li>
                  <li>Upload or share content you do not have permission to use.</li>
                </ul>
                <p>Room hosts may remove participants or end rooms. The service maintainer may restrict access or remove content to protect users, investigate abuse, comply with law, or maintain the service.</p>
                <p>You remain responsible for content you submit. By sending chat or feedback, you allow the service to store and display it as needed to provide and administer the feature.</p>
              </div>
            </section>

            <section id="affiliation" className="scroll-mt-24">
              <h2 className="text-xl font-semibold text-white mb-4">6. Independent fan project</h2>
              <div className="space-y-4 text-[#E5E5E5] text-base leading-relaxed">
                <p>
                  PurseWar is an independent fan-made simulation for entertainment.
                </p>
                <p>
                  We are <strong>not affiliated with, endorsed by, sponsored by, or associated with</strong> the Board of Control for Cricket in India (BCCI), the Indian Premier League (IPL), or any official franchise team.
                </p>
              </div>
            </section>

            <section id="ip" className="scroll-mt-24">
              <h2 className="text-xl font-semibold text-white mb-4">7. Intellectual property</h2>
              <div className="space-y-4 text-[#E5E5E5] text-base leading-relaxed">
                <p>
                  Team names, marks, logos, player names, and images belong to their respective rights holders. Their display does not mean that those owners endorse PurseWar. If you believe content infringes your rights, contact us with enough detail to identify it.
                </p>
                <p>
                  The underlying codebase, UI design, and specific auction algorithms of PurseWar are the intellectual property of the developers, unless otherwise open-sourced.
                </p>
              </div>
            </section>

            <section id="third-party" className="scroll-mt-24">
              <h2 className="text-xl font-semibold text-white mb-4">8. Third-party services and ads</h2>
              <div className="space-y-4 text-[#E5E5E5] text-base leading-relaxed">
                <p>
                  The app relies on Google Firebase for authentication and data services and Supabase for parts of room discovery and history. Optional analytics and advertising providers load only after you accept them. External links, including support and sharing services, are governed by their providers’ terms and privacy policies. See the <Link to="/privacy" className="text-[#f5bd55] underline underline-offset-2">Privacy Policy</Link> for details.
                </p>
              </div>
            </section>

            <section id="availability" className="scroll-mt-24">
              <h2 className="text-xl font-semibold text-white mb-4">9. Availability and data</h2>
              <div className="space-y-4 text-[#E5E5E5] text-base leading-relaxed">
                <p>
                  PurseWar is provided “as is” and “as available.” We do not guarantee uninterrupted access, error-free bidding, successful reconnection, or permanent storage. Cloud services, local browser storage, network conditions, and user devices can fail. Save or share results you want to keep; do not rely on the service as your only copy.
                </p>
              </div>
            </section>

            <section id="changes-service" className="scroll-mt-24">
              <h2 className="text-xl font-semibold text-white mb-4">10. Service changes</h2>
              <div className="space-y-4 text-[#E5E5E5] text-base leading-relaxed">
                <p>
                  We reserve the right to modify, suspend, or discontinue any part of the service, including player databases, auction rules, or game modes, at any time without prior notice.
                </p>
              </div>
            </section>

            <section id="liability" className="scroll-mt-24">
              <h2 className="text-xl font-semibold text-white mb-4">11. Disclaimers and liability</h2>
              <div className="space-y-4 text-[#E5E5E5] text-base leading-relaxed">
                <p>
                  To the extent permitted by applicable law, the service is provided without warranties of uninterrupted operation, accuracy, or fitness for a particular purpose. PurseWar is an entertainment simulation, not an official source of player statistics or competition rules. Nothing in these terms excludes liability that cannot legally be excluded.
                </p>
              </div>
            </section>

            <section id="changes-terms" className="scroll-mt-24">
              <h2 className="text-xl font-semibold text-white mb-4">12. Terms updates</h2>
              <div className="space-y-4 text-[#E5E5E5] text-base leading-relaxed">
                <p>
                  We may revise these terms as PurseWar changes. The updated text and date will be posted here. If you do not agree with an update, stop using the service.
                </p>
              </div>
            </section>

            <section id="contact" className="scroll-mt-24">
              <h2 className="text-xl font-semibold text-white mb-4">13. Contact</h2>
              <div className="space-y-4 text-[#E5E5E5] text-base leading-relaxed">
                <p>
                  For questions about these terms or rights-related content, email:
                </p>
                <p>
                  <a href="mailto:adarshdevops62041@gmail.com" className="text-[#f5bd55] hover:text-white transition-colors">adarshdevops62041@gmail.com</a>
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

export default TermsConditions;
