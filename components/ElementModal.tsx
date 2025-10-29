import React from 'react';
import type { ElementData } from '../types';
import { CATEGORY_BORDER_COLORS } from '../constants';
import { AtomAnimation } from './AtomAnimation';

interface ElementModalProps {
  element: ElementData;
  onClose: () => void;
}

export const ElementModal: React.FC<ElementModalProps> = ({ element, onClose }) => {
  const borderClass = CATEGORY_BORDER_COLORS[element.category] || 'border-slate-400';

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
      aria-labelledby="element-name"
    >
      <div 
        className="bg-slate-100/80 rounded-lg shadow-2xl w-full max-w-3xl text-slate-800 border border-slate-300 transform animate-slide-up flex flex-col"
        style={{ maxHeight: '90vh' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`p-4 flex justify-between items-center bg-slate-200/50 border-t-4 ${borderClass} flex-shrink-0`}>
          <div className="flex items-baseline space-x-3">
            <h2 id="element-name" className="text-4xl font-bold">{element.symbol}</h2>
            <h3 className="text-2xl font-light">{element.name}</h3>
          </div>
          <div className="text-2xl font-bold">{element.number}</div>
        </div>
        
        {/* Body */}
        <div className="flex-grow p-6 space-y-4 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="flex flex-col space-y-4">
             {/* Atomic Structure Animation */}
            <div className="bg-slate-200/50 p-4 rounded-md border border-slate-300 flex-grow flex flex-col">
              <h4 className="font-bold text-cyan-600 mb-4 text-center">Atomic Structure</h4>
              <AtomAnimation electron_configuration={element.electron_configuration} />
            </div>
            {/* Subatomic Particles section */}
            <div className="bg-slate-200/50 p-4 rounded-md border border-slate-300">
              <h4 className="font-bold text-cyan-600 mb-2">Subatomic Particles</h4>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div>
                  <p className="text-2xl font-bold">{element.protons}</p>
                  <p className="text-xs text-slate-500">Protons</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">{element.neutrons}</p>
                  <p className="text-xs text-slate-500">Neutrons</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">{element.electrons}</p>
                  <p className="text-xs text-slate-500">Electrons</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column */}
          <div className="flex flex-col space-y-4">
            {element.image_url && (
              <div className="mb-4">
                <img 
                  src={element.image_url} 
                  alt={element.name}
                  className="w-full h-48 object-cover rounded-md shadow-lg"
                />
              </div>
            )}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-slate-500">Category</p>
                <p className="capitalize font-semibold">{element.category}</p>
              </div>
              <div>
                <p className="text-slate-500">Atomic Mass</p>
                <p className="font-semibold">{element.atomic_mass} u</p>
              </div>
              {element.discovered_by && (
                <div>
                  <p className="text-slate-500">Discovered By</p>
                  <p className="font-semibold">{element.discovered_by}</p>
                </div>
              )}
              {element.year_discovered && (
                <div>
                  <p className="text-slate-500">Year Discovered</p>
                  <p className="font-semibold">{element.year_discovered}</p>
                </div>
              )}
            </div>
            <p className="text-slate-600 text-sm leading-relaxed">{element.summary}</p>
             {/* Electron Configuration section */}
            <div className="bg-slate-200/50 p-4 rounded-md border border-slate-300">
              <h4 className="font-bold text-cyan-600 mb-2">Electron Configuration</h4>
              <p className="text-slate-700 text-sm font-mono break-words">{element.electron_configuration}</p>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="p-4 bg-slate-200/50 text-right flex-shrink-0">
           <button 
              onClick={onClose}
              className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 rounded-md font-semibold transition-colors text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-100 focus:ring-cyan-400"
              aria-label="Close modal"
            >
              Close
            </button>
        </div>
      </div>
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-up {
          from { transform: translateY(20px) scale(0.98); opacity: 0; }
          to { transform: translateY(0) scale(1); opacity: 1; }
        }
        .animate-fade-in { animation: fade-in 0.2s ease-out forwards; }
        .animate-slide-up { animation: slide-up 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}</style>
    </div>
  );
};