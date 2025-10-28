import React, { useState, useCallback, useEffect } from 'react';
import { PeriodicTable } from './components/PeriodicTable';
import { ElementModal } from './components/ElementModal';
import type { ElementData } from './types';
import { ELEMENTS } from './constants';
import { CategoryFilters } from './components/CategoryFilters';
import { BottomNavBar } from './components/BottomNavBar';
import { SplashScreen } from './components/SplashScreen';

const App: React.FC = () => {
  const [selectedElement, setSelectedElement] = useState<ElementData | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredElement, setHoveredElement] = useState<ElementData | null>(null);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2500); // Display splash screen for 2.5 seconds
    return () => clearTimeout(timer);
  }, []);


  const handleElementClick = useCallback((element: ElementData) => {
    setSelectedElement(element);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedElement(null);
  }, []);

  const handleCategoryChange = useCallback((category: string | null) => {
    setActiveCategory(category);
  }, []);

  const handleSearchChange = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const handleElementHover = useCallback((element: ElementData | null) => {
    setHoveredElement(element);
  }, []);

  if (showSplash) {
    return <SplashScreen />;
  }
  
  const particleColor = 'rgba(100, 116, 139, 0.2)';

  return (
    <div className="min-h-screen bg-slate-100 p-4 sm:p-6 lg:p-8 pb-40 relative overflow-hidden">
      {/* Animated Background */}
      <ul className="particles">
        {Array.from({ length: 10 }).map((_, i) => <li key={i}></li>)}
      </ul>

      <header className="text-center mb-8 animate-fade-in-down relative z-10">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-cyan-600 tracking-wider">
          Bee - Interactive Periodic Table
        </h1>
        <p className="text-slate-500 mt-2 text-lg">Hover over an element for details, or click to learn more!</p>
      </header>
      
      <div className="animate-fade-in-up relative z-10" style={{ animationDelay: '0.2s' }}>
        <CategoryFilters activeCategory={activeCategory} onCategoryChange={handleCategoryChange} />
      </div>

      <div className="w-full overflow-x-auto relative z-10">
        <main className="flex justify-center mt-8 mb-12 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <PeriodicTable 
            elements={ELEMENTS} 
            onElementClick={handleElementClick}
            activeCategory={activeCategory}
            searchQuery={searchQuery}
            onElementHover={handleElementHover}
          />
        </main>
      </div>

      {selectedElement && (
        <ElementModal 
          element={selectedElement} 
          onClose={handleCloseModal}
        />
      )}

      <BottomNavBar 
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        hoveredElement={hoveredElement}
      />
       <style>{`
        .particles {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          padding: 0;
          margin: 0;
          z-index: 0;
        }
        .particles li {
          position: absolute;
          display: block;
          list-style: none;
          width: 20px;
          height: 20px;
          background: ${particleColor};
          animation: animate-particles 25s linear infinite;
          bottom: -150px;
          border-radius: 50%;
        }
        .particles li:nth-child(1){ left: 25%; width: 80px; height: 80px; animation-delay: 0s; }
        .particles li:nth-child(2){ left: 10%; width: 20px; height: 20px; animation-delay: 2s; animation-duration: 12s; }
        .particles li:nth-child(3){ left: 70%; width: 20px; height: 20px; animation-delay: 4s; }
        .particles li:nth-child(4){ left: 40%; width: 60px; height: 60px; animation-delay: 0s; animation-duration: 18s; }
        .particles li:nth-child(5){ left: 65%; width: 20px; height: 20px; animation-delay: 0s; }
        .particles li:nth-child(6){ left: 75%; width: 110px; height: 110px; animation-delay: 3s; }
        .particles li:nth-child(7){ left: 35%; width: 150px; height: 150px; animation-delay: 7s; }
        .particles li:nth-child(8){ left: 50%; width: 25px; height: 25px; animation-delay: 15s; animation-duration: 45s; }
        .particles li:nth-child(9){ left: 20%; width: 15px; height: 15px; animation-delay: 2s; animation-duration: 35s; }
        .particles li:nth-child(10){ left: 85%; width: 150px; height: 150px; animation-delay: 0s; animation-duration: 11s; }
        @keyframes animate-particles {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(-100vh) rotate(720deg); opacity: 0; }
        }
        @keyframes fade-in-down {
          from { opacity: 0; transform: translateY(-15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-down { animation: fade-in-down 0.5s ease-out backwards; }
        .animate-fade-in-up { animation: fade-in-up 0.5s ease-out backwards; }
      `}</style>
    </div>
  );
};

export default App;