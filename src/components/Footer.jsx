import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { user } = useAuth();
  const isAdmin = user && user.email && user.email.trim().toLowerCase() === import.meta.env.VITE_ADMIN_EMAIL?.trim().toLowerCase();

  return (
    <footer className="mt-12 sm:mt-20 w-full mx-auto border-t border-white/10 z-10 relative flex flex-col font-mono">
      <div className="w-full flex flex-col lg:flex-row text-[9px] sm:text-xs font-semibold uppercase tracking-[0.12em] sm:tracking-widest text-gray-400">
        <div className="flex-1 px-3 sm:px-6 py-5 sm:py-6 lg:py-4 flex flex-col items-center justify-center lg:items-start border-b lg:border-b-0 border-white/10 text-center lg:text-left gap-1.5 sm:gap-2 leading-relaxed">
          <span>© {currentYear} PurseWar. All rights reserved.</span>
          <span className="text-[8px] sm:text-[10px] text-gray-500">
            Concept crafted by{' '}
            <a href="https://adshkumar.is-a.dev/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-[#f5bd55] transition-colors underline underline-offset-2">Adarsh Kumar</a>
          </span>
        </div>

        <nav aria-label="Footer" className="grid grid-cols-2 sm:grid-cols-4 lg:flex lg:flex-row lg:flex-nowrap border-l-0 lg:border-l border-white/10 justify-center w-full lg:w-auto p-2 sm:p-0 gap-2 sm:gap-0">
          <Link to="/about" className="min-h-11 px-2 sm:px-5 py-3 sm:py-4 hover:text-white hover:bg-white/5 transition-colors border border-white/10 sm:border-0 sm:border-r flex items-center justify-center text-center">
            About Us
          </Link>
          <Link to="/guide" className="min-h-11 px-2 sm:px-5 py-3 sm:py-4 hover:text-white hover:bg-white/5 transition-colors border border-white/10 sm:border-0 sm:border-r flex items-center justify-center text-center">
            Game Guide
          </Link>
          <Link to="/privacy" className="min-h-11 px-2 sm:px-5 py-3 sm:py-4 hover:text-white hover:bg-white/5 transition-colors border border-white/10 sm:border-0 sm:border-r flex items-center justify-center text-center">
            Privacy Policy
          </Link>
          <Link to="/terms" className={`min-h-11 px-2 sm:px-5 py-3 sm:py-4 hover:text-white hover:bg-white/5 transition-colors border border-white/10 sm:border-0 flex items-center justify-center text-center ${isAdmin ? 'sm:border-r' : ''}`}>
            Terms & Conditions
          </Link>
          {isAdmin && (
            <Link to="/admin" className="min-h-11 px-2 sm:px-6 py-3 sm:py-4 hover:text-white hover:bg-white/5 transition-colors border border-white/10 sm:border-0 flex items-center justify-center text-center">
              Admin Dashboard
            </Link>
          )}
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
