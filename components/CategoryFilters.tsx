import React from 'react';
import { CATEGORY_ACCENT_COLORS } from '../constants';

interface CategoryFiltersProps {
  activeCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}

export const CategoryFilters: React.FC<CategoryFiltersProps> = ({ activeCategory, onCategoryChange }) => {
  const categories = Object.keys(CATEGORY_ACCENT_COLORS);
  
  const allButtonClasses = `px-3 py-1.5 text-sm font-semibold border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent ${
    activeCategory === null
      ? 'bg-cyan-500/90 dark:bg-cyan-500/20 text-white dark:text-cyan-300 ring-cyan-400 border-cyan-500/80 dark:border-cyan-400'
      : 'border-slate-300 dark:border-slate-600 text-slate-500 dark:text-slate-400 bg-slate-200/50 dark:bg-slate-800/20 hover:bg-slate-300/50 dark:hover:bg-slate-700/30 hover:border-slate-400 dark:hover:border-slate-500 transform hover:-translate-y-0.5'
  }`;
  
  return (
    <div className="bg-slate-100/50 dark:bg-slate-800/50 backdrop-blur-sm p-3 rounded-xl border border-slate-200 dark:border-slate-700">
      <div className="flex flex-wrap justify-center gap-2">
        <button onClick={() => onCategoryChange(null)} className={allButtonClasses}>
          Show All
        </button>
        {categories.map((category) => {
          const isActive = activeCategory === category;
          const accent = CATEGORY_ACCENT_COLORS[category];
          
          const buttonClasses = `px-3 py-1.5 text-sm font-semibold border rounded-lg capitalize transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent ${
            isActive
              ? `${accent.bg} ${accent.text} ${accent.ring} ${accent.border} shadow-lg`
              : `border-slate-300 dark:border-slate-600 text-slate-500 dark:text-slate-400 bg-slate-200/50 dark:bg-slate-800/20 hover:bg-slate-300/50 dark:hover:bg-slate-700/30 hover:border-slate-400 dark:hover:border-slate-500 transform hover:-translate-y-0.5`
          }`;
          
          return (
            <button key={category} onClick={() => onCategoryChange(category)} className={buttonClasses}>
              {category}
            </button>
          );
        })}
      </div>
    </div>
  );
};