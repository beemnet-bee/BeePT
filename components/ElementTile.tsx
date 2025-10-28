import React from 'react';
import type { ElementData } from '../types';
import { CATEGORY_COLORS, CATEGORY_GLOW_COLORS } from '../constants';

interface ElementTileProps {
  element: ElementData;
  onClick: (element: ElementData) => void;
  isDimmed: boolean;
  onHover: (element: ElementData | null) => void;
}

const hexagonStyle = {
  clipPath: 'polygon(50% 6%, 94% 25%, 94% 75%, 50% 94%, 6% 75%, 6% 25%)',
};

export const ElementTile: React.FC<ElementTileProps> = ({ element, onClick, isDimmed, onHover }) => {
  const colorClass = CATEGORY_COLORS[element.category] || 'bg-slate-200 text-slate-900 dark:bg-gradient-to-br dark:from-slate-600 dark:to-slate-700 dark:text-white';
  const glowClass = CATEGORY_GLOW_COLORS[element.category] || 'shadow-slate-500/50 dark:shadow-slate-400/50';

  const tileClasses = `
    relative w-[5.5rem] h-24 m-px flex flex-col items-center justify-center 
    font-bold transition-all duration-300 ease-in-out transform 
    focus:z-10 focus:outline-none group ${colorClass}
    ${isDimmed 
      ? 'opacity-30 scale-95 cursor-not-allowed' 
      : `opacity-100 hover:scale-110 hover:z-10 focus:scale-110 hover:shadow-lg ${glowClass}`
    }
  `;

  return (
    <button
      onClick={() => onClick(element)}
      className={tileClasses}
      style={hexagonStyle}
      disabled={isDimmed}
      onMouseEnter={() => onHover(element)}
      onMouseLeave={() => onHover(null)}
    >
      <div className="absolute inset-0 border border-slate-900/10 dark:border-slate-700/50" style={hexagonStyle}></div>
      
      <div className="absolute top-3 left-3 text-sm opacity-80">{element.number}</div>
      <div className="text-2xl z-10">{element.symbol}</div>
      <div className="text-xs font-normal truncate w-full px-2 text-center z-10">{element.name}</div>
    </button>
  );
};