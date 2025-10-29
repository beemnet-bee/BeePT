import React from 'react';
import type { ElementData } from '../types';
import { ElementTile } from './ElementTile';

interface PeriodicTableProps {
  elements: ElementData[];
  onElementClick: (element: ElementData) => void;
  activeCategory: string | null;
  searchQuery: string;
  onElementHover: (element: ElementData | null) => void;
}

export const PeriodicTable: React.FC<PeriodicTableProps> = ({ elements, onElementClick, activeCategory, searchQuery, onElementHover }) => {

  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-full pb-4">
        <div 
          className="grid gap-1 min-w-[992px]" // min-width ensures the grid doesn't collapse too early
          style={{ gridTemplateColumns: 'repeat(18, minmax(0, 1fr))' }}
        >
          {elements.map((element) => {
            const isFilteredByCategory = activeCategory && activeCategory !== element.category;
            const searchLower = searchQuery.toLowerCase();
            const isFilteredBySearch = searchQuery && 
              !element.name.toLowerCase().includes(searchLower) &&
              !element.symbol.toLowerCase().includes(searchLower) &&
              !String(element.number).includes(searchLower);

            const isDimmed = isFilteredByCategory || isFilteredBySearch;
            
            return (
              <div
                key={element.number}
                style={{ gridColumn: element.col, gridRow: element.row }}
              >
                <ElementTile 
                  element={element} 
                  onClick={onElementClick} 
                  isDimmed={isDimmed}
                  onHover={onElementHover}
                />
              </div>
            );
          })}
          
          {/* In-grid labels for Lanthanide and Actinide series */}
          <div 
            className="flex items-center justify-center text-center text-sm font-bold text-cyan-600/80 pr-4"
            style={{ gridRow: 9, gridColumn: '1 / span 3' }}
          >
            Lanthanide Series →
          </div>
          <div 
            className="flex items-center justify-center text-center text-sm font-bold text-cyan-600/80 pr-4"
            style={{ gridRow: 10, gridColumn: '1 / span 3' }}
          >
            Actinide Series →
          </div>
        </div>
      </div>
    </div>
  );
};