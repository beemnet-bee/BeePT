import React from 'react';
import type { ElementData } from '../types';

interface BottomNavBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  hoveredElement: ElementData | null;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({ searchQuery, onSearchChange, hoveredElement }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-slate-100/80 dark:bg-slate-900/80 backdrop-blur-sm border-t border-slate-200 dark:border-slate-700 h-20 px-4 sm:px-6 lg:px-8 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
      <div className="flex items-center justify-between h-full max-w-screen-xl mx-auto">
        {/* Search Bar */}
        <div className="relative flex-1 max-w-xs">
          <input 
            type="text"
            placeholder="Search element (e.g., 'Gold', 'Au', '79')"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-200/70 dark:bg-slate-800/70 border border-slate-300 dark:border-slate-600 rounded-full text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-cyan-400 transition-all"
          />
           <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          {searchQuery && (
            <button 
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 hover:text-slate-800 dark:hover:text-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Hovered Element Details */}
        <div className="hidden sm:flex items-center space-x-6 text-right">
          {hoveredElement ? (
            <div key={hoveredElement.number} className="flex items-center space-x-6 animate-fade-in-fast">
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400">Element</p>
                <p className="font-bold text-lg text-slate-800 dark:text-white">{hoveredElement.name}</p>
              </div>
               <div>
                <p className="text-xs text-slate-500 dark:text-slate-400">Symbol</p>
                <p className="font-bold text-lg text-slate-800 dark:text-white">{hoveredElement.symbol}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400">Atomic Mass</p>
                <p className="font-bold text-lg text-slate-800 dark:text-white">{hoveredElement.atomic_mass} u</p>
              </div>
            </div>
          ) : (
            <div className="text-slate-500 dark:text-slate-400 animate-fade-in-fast">
              Hover over an element to see details
            </div>
          )}
        </div>
      </div>
      <style>{`
        @keyframes fade-in-fast {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in-fast { animation: fade-in-fast 0.2s ease-out forwards; }
      `}</style>
    </div>
  );
};