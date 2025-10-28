import React, { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';

// ... (parsing functions remain the same)
const nobleGasConfig: Record<string, number[]> = {
  He: [2],
  Ne: [2, 8],
  Ar: [2, 8, 8],
  Kr: [2, 8, 18, 8],
  Xe: [2, 8, 18, 18, 8],
  Rn: [2, 8, 18, 32, 18, 8],
  Og: [2, 8, 18, 32, 32, 18, 8],
};

const superscriptDigits: Record<string, string> = {
    '⁰': '0', '¹': '1', '²': '2', '³': '3', '⁴': '4', '⁵': '5', '⁶': '6', '⁷': '7', '⁸': '8', '⁹': '9'
};

const normalizeSuperscripts = (text: string): string => {
    return text.split('').map(char => superscriptDigits[char] || char).join('');
}

const parseElectronConfigurationToShells = (configStr: string): number[] => {
  let shells: number[] = [];
  let config = normalizeSuperscripts(configStr);

  const coreMatch = config.match(/\[(\w+)\]/);
  if (coreMatch) {
    const core = coreMatch[1];
    if (nobleGasConfig[core]) {
      shells = [...nobleGasConfig[core]];
    }
    config = config.replace(coreMatch[0], '').trim();
  }
  
  const orbitals = config.match(/\d[spdfg]\d{1,2}/g) || [];
  orbitals.forEach((orbital: string) => {
    const shellNumber = parseInt(orbital[0], 10);
    const electrons = parseInt(orbital.substring(2), 10);

    while (shells.length < shellNumber) {
      shells.push(0);
    }
    shells[shellNumber - 1] = (shells[shellNumber - 1] || 0) + electrons;
  });

  if (shells.length === 0 && orbitals.length === 0) {
      const simpleOrbitals = config.match(/\d[s]\d{1,2}/g) || [];
      simpleOrbitals.forEach((orbital: string) => {
          const shellNumber = parseInt(orbital[0], 10);
          const electrons = parseInt(orbital.substring(2), 10);
          while (shells.length < shellNumber) {
              shells.push(0);
          }
          shells[shellNumber - 1] = (shells[shellNumber - 1] || 0) + electrons;
      })
  }
  
  return shells.filter(count => count > 0);
};


interface AtomAnimationProps {
  electron_configuration: string;
}

export const AtomAnimation: React.FC<AtomAnimationProps> = ({ electron_configuration }) => {
  const shells = parseElectronConfigurationToShells(electron_configuration);
  const themeContext = useContext(ThemeContext);
  const theme = (themeContext as { theme: 'light' | 'dark' })?.theme || 'dark';

  const nucleusColor = theme === 'dark' ? '#22d3ee' : '#0891b2';
  const orbitColor = theme === 'dark' ? 'rgba(71, 85, 105, 0.7)' : 'rgba(203, 213, 225, 0.9)';
  const electronColor = theme === 'dark' ? '#e2e8f0' : '#475569';
  
  return (
    <div className="relative w-full h-64 flex items-center justify-center">
      {/* Nucleus */}
      <div 
        className="w-4 h-4 rounded-full shadow-lg z-10" 
        style={{ 
          backgroundColor: nucleusColor,
          boxShadow: `0 0 10px ${nucleusColor}` 
        }}
      ></div>
      
      {/* Orbits and Electrons */}
      {shells.map((electronCount, shellIndex) => {
        if (electronCount === 0) return null;
        const orbitSize = (shellIndex + 1) * 50 + 40; // in pixels
        const orbitDuration = (shellIndex + 1) * 4 + 2; // in seconds
        
        return (
          <div 
            key={shellIndex}
            className="absolute border rounded-full animate-spin-slow"
            style={{
              width: `${orbitSize}px`,
              height: `${orbitSize}px`,
              borderColor: orbitColor,
              animationDuration: `${orbitDuration}s`,
              animationDirection: shellIndex % 2 === 0 ? 'normal' : 'reverse',
            }}
          >
            {Array.from({ length: electronCount }).map((_, electronIndex) => {
              const angle = (360 / electronCount) * electronIndex;
              return (
                <div 
                  key={electronIndex}
                  className="absolute top-1/2 left-1/2 w-2.5 h-2.5 -m-[5px]"
                  style={{ transform: `rotate(${angle}deg) translate(${orbitSize / 2}px)` }}
                >
                  <div 
                    className="w-full h-full rounded-full shadow-md animate-spin-slow-reverse"
                    style={{
                      backgroundColor: electronColor,
                      animationDuration: `${orbitDuration}s`, 
                      animationDirection: shellIndex % 2 === 0 ? 'normal' : 'reverse',
                    }}
                  ></div>
                </div>
              );
            })}
          </div>
        );
      })}
       <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-slow-reverse {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow linear infinite;
        }
        .animate-spin-slow-reverse {
            animation: spin-slow-reverse linear infinite;
        }
      `}</style>
    </div>
  );
};