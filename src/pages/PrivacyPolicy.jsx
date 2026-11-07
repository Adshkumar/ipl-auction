import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Home, ChevronRight, ShieldCheck, Cookie, Mail } from 'lucide-react';
import Footer from '../components/Footer';
import useDocumentTitle from '../hooks/useDocumentTitle';

const PrivacyPolicy = () => {
  useDocumentTitle(
    'Privacy Policy | PurseWar',
    'How PurseWar handles account details, auction rooms, chat, feedback, browser storage, analytics, and advertising.'
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [activeSection, setActiveSection] = useState('information');

  const sections = [
    { id: 'information', label: '1. Information we handle' },
    { id: 'purposes', label: '2. How we use information' },
    { id: 'accounts', label: '3. Sign-in and guest accounts' },
    { id: 'rooms', label: '4. Rooms, bids, and chat' },
    { id: 'feedback', label: '5. Feedback and support' },
    { id: 'storage', label: '6. Browser storage and retention' },
    { id: 'optional-services', label: '7. Analytics, ads, and consent' },
    { id: 'providers', label: '8. Service providers and links' },
    { id: 'sharing', label: '9. Sharing and public rooms' },
    { id: 'your-choices', label: '10. Your choices and requests' },
    { id: 'children', label: '11. Children’s privacy' },
    { id: 'security', label: '12. Security and service limits' },
    { id: 'changes', label: '13. Policy updates' },
    { id: 'contact', label: '14. Contact' },
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
          <span className="text-white">Privacy</span>
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

          <div className="mb-6 sm:mb-10 border-b border-white/10 pb-5 sm:pb-8">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/[0.06] px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.16em] text-emerald-300">
              <ShieldCheck size={13} /> Clear, practical privacy details
            </div>
            <h1 className="mb-3 text-3xl font-black tracking-tight text-white sm:text-4xl">Privacy Policy</h1>
            <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-gray-500">Last updated: November 7, 2026</p>
            <p className="text-sm leading-relaxed text-gray-300 sm:text-base">
              This policy explains what PurseWar processes when you browse, sign in, create or join an auction, chat, send feedback, or choose optional analytics and advertising. PurseWar is a game and simulation; its purses and bids are virtual and it does not process auction payments.
            </p>
            <div className="mt-4 grid gap-2 sm:grid-cols-3">
              {[
                ['Core play', 'Sign-in, rooms, and auction sync use service providers.'],
                ['Optional services', 'Analytics and ads start only after you accept.'],
                ['Your controls', 'Decline optional services or contact us with a data request.'],
              ].map(([title, detail]) => (
                <div key={title} className="rounded-xl border border-white/[0.08] bg-white/[0.025] p-3">
                  <span className="mb-1 block text-[9px] font-black uppercase tracking-widest text-[#f5bd55]">{title}</span>
                  <span className="text-xs leading-relaxed text-gray-400">{detail}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-7 sm:space-y-10">
            <section id="information" className="scroll-mt-24">
              <h2 className="mb-3 text-lg font-bold text-white sm:text-xl">1. Information we handle</h2>
              <div className="space-y-3 text-sm leading-relaxed text-gray-300 sm:text-base">
                <p>The information depends on the features you use:</p>
                <ul className="list-disc space-y-2 pl-5 text-gray-400">
                  <li><strong className="text-gray-200">Google sign-in:</strong> Firebase Authentication provides an account identifier and profile fields such as name, email address, and profile image.</li>
                  <li><strong className="text-gray-200">Guest play:</strong> Firebase creates an anonymous account identifier. The display name you enter is associated with your room activity; a guest does not need to provide an email to join.</li>
                  <li><strong className="text-gray-200">Auction activity:</strong> Room codes, host and participant identifiers, selected teams, room settings, bids, squads, player order, auction results, saved lineups, presence, and messages may be processed to run the room and show results.</li>
                  <li><strong className="text-gray-200">Feedback:</strong> If you submit the feedback form, it records your message, category, rating, submission time, and the available display name, account type, account identifier, profile image, and email. You may enter an email when not signed in; otherwise an email may be marked “Not provided.”</li>
                  <li><strong className="text-gray-200">Technical and advertising signals:</strong> If you accept optional services, analytics and advertising providers may process browser, device, usage, network, and advertising identifiers under their own policies.</li>
                </ul>
                <p>We do not ask for precise location, contacts, or payment-card details to play. Do not put sensitive personal information in room names, chat, or feedback.</p>
              </div>
            </section>

            <section id="purposes" className="scroll-mt-24">
              <h2 className="mb-3 text-lg font-bold text-white sm:text-xl">2. How we use information</h2>
              <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-gray-400 sm:text-base">
                <li>Authenticate users, identify a host or participant, and protect room access.</li>
                <li>Synchronize auction state, bids, timer, team budgets, chat, and post-auction lineups.</li>
                <li>Display public rooms, auction history, rankings, and user-submitted feedback to the relevant screens or administrators.</li>
                <li>Remember functional choices such as a preferred auction server and whether the intro has been seen.</li>
                <li>When optional services are accepted, measure site usage and support advertising.</li>
                <li>Respond to support, privacy, safety, and abuse reports and maintain the service.</li>
              </ul>
            </section>

            <section id="accounts" className="scroll-mt-24">
              <h2 className="mb-3 text-lg font-bold text-white sm:text-xl">3. Sign-in and guest accounts</h2>
              <div className="space-y-3 text-sm leading-relaxed text-gray-300 sm:text-base">
                <p>Google sign-in is handled by Google and Firebase Authentication. PurseWar does not receive or store your Google password. Google and Firebase may process sign-in and security data under their own privacy terms.</p>
                <p>Guest mode uses Firebase anonymous authentication; it is not the same as a fully identified account and may be difficult to recover if browser or authentication data is lost. Signing out ends the current session but does not itself erase room records or submitted feedback.</p>
              </div>
            </section>

            <section id="rooms" className="scroll-mt-24">
              <h2 className="mb-3 text-lg font-bold text-white sm:text-xl">4. Rooms, bids, and chat</h2>
              <div className="space-y-3 text-sm leading-relaxed text-gray-300 sm:text-base">
                <p>Cloud rooms use Firebase Realtime Database for live room state. Supabase is also used for room directory/history records and related team records. The app can be configured with more than one Firebase auction database. The selected server and room type affect where a room record is stored.</p>
                <p>Offline / Hotspot mode stores room state in browser storage and uses browser messaging or an available local bridge for synchronization. Depending on the mode and deployment, related team data may also be synchronized to Supabase. “Offline” describes the local room option; it is not a promise that every feature or external service works without network access.</p>
                <p>Public room details are intended to be discoverable by other users. Private room access is controlled by room code and the deployed database rules; do not treat a room code as a secret for sensitive information.</p>
              </div>
            </section>

            <section id="feedback" className="scroll-mt-24">
              <h2 className="mb-3 text-lg font-bold text-white sm:text-xl">5. Feedback and support</h2>
              <p className="text-sm leading-relaxed text-gray-300 sm:text-base">
                Feedback submitted from the site is stored in Firebase Firestore for review. It can include the text you write, category, star rating, and account details listed above. Access is intended for service administration. For privacy requests or questions, use the contact email below rather than including sensitive details in public chat.
              </p>
            </section>

            <section id="storage" className="scroll-mt-24">
              <h2 className="mb-3 text-lg font-bold text-white sm:text-xl">6. Browser storage and retention</h2>
              <div className="space-y-3 text-sm leading-relaxed text-gray-300 sm:text-base">
                <p>The app uses browser storage for necessary and functional features. Examples include the privacy choice, preferred server, intro state, local auction room data, and chat-read markers. Firebase Firestore may use a persistent local cache. Clearing browser data can remove local rooms and preferences or require you to sign in again.</p>
                <p>Cloud room and history retention depends on the service configuration and room lifecycle. Completed cloud rooms may be retained so participants can review results and save lineups. We do not promise a fixed automatic deletion period. Local room data remains in the browser until it is cleared or removed by the app.</p>
              </div>
            </section>

            <section id="optional-services" className="scroll-mt-24">
              <h2 className="mb-3 text-lg font-bold text-white sm:text-xl">7. Analytics, ads, and consent</h2>
              <div className="space-y-3 text-sm leading-relaxed text-gray-300 sm:text-base">
                <p>Firebase Analytics, Cloudflare Web Analytics, and Google AdSense are optional services. Their scripts are not loaded unless you choose “Accept optional” in the privacy banner. Choosing “Decline” does not block sign-in, room play, or essential browser storage.</p>
                <p>Your choice is saved in browser local storage as <code className="break-all rounded bg-white/5 px-1.5 py-0.5 text-xs">cookie_consent_status</code>. To review or change it, use the control below. Changing the choice stops optional scripts from being loaded on future visits; cookies or identifiers already created by third parties may need to be removed through your browser settings.</p>
                <button
                  type="button"
                  onClick={() => window.dispatchEvent(new Event('pursewar:open-privacy-preferences'))}
                  className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-bold text-white transition hover:border-[#f5bd55]/40 hover:bg-white/[0.07]"
                >
                  <Cookie size={14} className="text-[#f5bd55]" /> Manage privacy choices
                </button>
              </div>
            </section>

            <section id="providers" className="scroll-mt-24">
              <h2 className="mb-3 text-lg font-bold text-white sm:text-xl">8. Service providers and links</h2>
              <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-gray-400 sm:text-base">
                <li><strong className="text-gray-200">Google Firebase:</strong> authentication, realtime room data, Firestore feedback, and (after optional consent) Firebase Analytics.</li>
                <li><strong className="text-gray-200">Supabase:</strong> room directory, history, and team records used by cloud features.</li>
                <li><strong className="text-gray-200">Cloudflare:</strong> web analytics after optional consent; the app may also be delivered through its hosting or network services.</li>
                <li><strong className="text-gray-200">Google AdSense:</strong> advertising after optional consent.</li>
                <li><strong className="text-gray-200">Google Fonts and external links:</strong> font loading and links you choose to open (for example, WhatsApp, GitHub, or the creator’s support page) connect your browser directly to those providers.</li>
              </ul>
              <p className="mt-3 text-sm leading-relaxed text-gray-400 sm:text-base">Those providers process information under their own terms and privacy policies. PurseWar does not control their independent processing.</p>
            </section>

            <section id="sharing" className="scroll-mt-24">
              <h2 className="mb-3 text-lg font-bold text-white sm:text-xl">9. Sharing and public rooms</h2>
              <div className="space-y-3 text-sm leading-relaxed text-gray-300 sm:text-base">
                <p>Room participants can see room information needed to play, including display names, selected teams, bids, squads, and chat messages. Public rooms may appear in the public room directory. Do not share a room link or code beyond the people you want to invite.</p>
                <p>When you use a share action, your browser opens the selected third-party service with the room link or content you chose to share. PurseWar does not control what that service does with it.</p>
              </div>
            </section>

            <section id="your-choices" className="scroll-mt-24">
              <h2 className="mb-3 text-lg font-bold text-white sm:text-xl">10. Your choices and requests</h2>
              <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-gray-400 sm:text-base">
                <li>Decline optional analytics and ads using the privacy banner or manage-choices button.</li>
                <li>Sign out of your account or revoke Google access from your Google Account settings.</li>
                <li>Request access to or deletion of account-linked data by emailing us from an address you control. Include the account email or guest room details needed to locate the records, but do not send passwords.</li>
                <li>Browser controls can clear local storage, cache, cookies, and site data. This can sign you out and may permanently remove local-only rooms.</li>
              </ul>
              <p className="mt-3 text-sm leading-relaxed text-gray-400 sm:text-base">Deletion requests may require identity verification. Removing an authentication account does not automatically erase every separate room, public record, or feedback item; we will review the request against the data we can identify and applicable requirements.</p>
            </section>

            <section id="children" className="scroll-mt-24">
              <h2 className="mb-3 text-lg font-bold text-white sm:text-xl">11. Children’s privacy</h2>
              <p className="text-sm leading-relaxed text-gray-300 sm:text-base">PurseWar is not designed for children under 13, and we do not knowingly seek personal information from children under 13. If you believe a child has provided personal information, contact us so we can review and take appropriate action.</p>
            </section>

            <section id="security" className="scroll-mt-24">
              <h2 className="mb-3 text-lg font-bold text-white sm:text-xl">12. Security and service limits</h2>
              <p className="text-sm leading-relaxed text-gray-300 sm:text-base">We use third-party authentication and database access controls configured for the app, but no internet service or transmission can be guaranteed completely secure. Use a unique display name, avoid sensitive content, and report suspected unauthorized access. The security and retention of a room also depend on the rules deployed to its selected database.</p>
            </section>

            <section id="changes" className="scroll-mt-24">
              <h2 className="mb-3 text-lg font-bold text-white sm:text-xl">13. Policy updates</h2>
              <p className="text-sm leading-relaxed text-gray-300 sm:text-base">We may update this policy as the app or its providers change. The latest version and its effective date will be posted here. Please review this page periodically.</p>
            </section>

            <section id="contact" className="scroll-mt-24">
              <h2 className="mb-3 text-lg font-bold text-white sm:text-xl">14. Contact</h2>
              <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-4 sm:p-5">
                <p className="mb-3 text-sm leading-relaxed text-gray-300 sm:text-base">For privacy questions or requests, contact the PurseWar maintainer:</p>
                <a href="mailto:adarshdevops62041@gmail.com" className="inline-flex items-center gap-2 break-all text-sm font-bold text-[#f5bd55] transition hover:text-white">
                  <Mail size={15} /> adarshdevops62041@gmail.com
                </a>
              </div>
            </section>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
