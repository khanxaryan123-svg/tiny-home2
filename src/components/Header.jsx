import React, { useState } from 'react';
import { Menu, X, User, Home } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinkClass = (path, highlight = false) =>
    `${highlight ? 'text-gray-900' : 'text-[#777777]'} font-medium px-4 py-2 transition-colors ${
      location.pathname === path
        ? 'rounded-full bg-cyan-50 ring-2 ring-cyan-300/40 shadow-md shadow-cyan-200/60'
        : ''
    } hover:text-gray-900`;

  return (
    <header className="bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <Home className="h-9 w-9 text-yellow-500" />
            <div className="leading-tight">
              <div className="text-sm font-semibold tracking-wide text-gray-800">VEGAS TINY HOMES</div>
              <div className="text-xs text-gray-600">Expo & Tradeshow</div>
            </div>
          </Link>

          <nav className="hidden xl:flex items-center gap-6">
            <Link to="/tradeshow" className={navLinkClass('/tradeshow', true)}>Tradeshow</Link>
            <Link to="/auction" className={navLinkClass('/auction')}>Auction</Link>
            <Link to="/tiny-homes" className={navLinkClass('/tiny-homes')}>Tiny Homes</Link>
            <Link to="/lands-lots" className={navLinkClass('/lands-lots')}>Lands/Lots</Link>
            <Link to="/marketplace" className={navLinkClass('/marketplace')}>World of Tiny Homes MARKETPLACE</Link>
            <button className="bg-[#F5A623] text-white px-5 py-2 rounded-full font-medium hover:bg-[#E09612] transition-colors shadow-[0_0_14px_rgba(255,105,180,0.25)] flex items-center gap-2">
              <User className="h-5 w-5" />
              My Account
            </button>
          </nav>

          <button 
            className="xl:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 py-2 flex flex-col gap-2">
            <Link to="/tradeshow" className="py-2 text-[#777777] font-medium">Tradeshow</Link>
            <Link to="/auction" className="py-2 text-[#777777] font-medium">Auction</Link>
            <Link to="/tiny-homes" className="py-2 text-[#777777] font-medium">Tiny Homes</Link>
            <Link to="/lands-lots" className="py-2 text-[#777777] font-medium">Lands/Lots</Link>
            <Link to="/marketplace" className="py-2 text-[#777777] font-medium">World of Tiny Homes MARKETPLACE</Link>
            <Link to="/account" className="mt-2 flex items-center gap-2 bg-[#F5A623] text-white px-4 py-2 rounded-full font-medium w-fit hover:bg-[#E09612] transition-colors shadow-[0_0_14px_rgba(255,105,180,0.25)]">
              <User className="h-5 w-5" /> My Account
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
