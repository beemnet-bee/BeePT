import React from 'react';

const hexagonStyle = {
  clipPath: 'polygon(50% 6%, 94% 25%, 94% 75%, 50% 94%, 6% 75%, 6% 25%)',
};

export const SplashScreen: React.FC = () => {
  const particleColor = 'rgba(100, 116, 139, 0.2)';

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-100 text-slate-800 select-none overflow-hidden">
      {/* Animated Background */}
      <ul className="particles">
        {Array.from({ length: 10 }).map((_, i) => <li key={i}></li>)}
      </ul>

      <div className="relative flex flex-col items-center justify-center animate-fade-in-zoom z-10">
        <div 
          className="w-32 h-36 bg-gradient-to-br from-slate-200 to-slate-300 relative"
          style={hexagonStyle}
        >
          <div className="absolute inset-0 border-2 border-cyan-500/50 animate-pulse-glow" style={hexagonStyle}></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-6xl font-black text-cyan-600">B</span>
          </div>

          {/* Orbiting particles */}
          <div className="absolute w-full h-full animate-orbit" style={{ animationDelay: '0s' }}>
            <div className="absolute top-1/2 left-1/2 w-48 h-48 -mt-24 -ml-24 rounded-full">
              <div className="absolute w-3 h-3 bg-cyan-500 rounded-full shadow-lg" style={{ top: '0', left: '50%', transform: 'translate(-50%, -50%)', boxShadow: '0 0 10px #06b6d4' }}></div>
            </div>
          </div>
           <div className="absolute w-full h-full animate-orbit-reverse" style={{ animationDelay: '-1.5s' }}>
            <div className="absolute top-1/2 left-1/2 w-40 h-40 -mt-20 -ml-20 rounded-full">
               <div className="absolute w-2 h-2 bg-cyan-500 rounded-full shadow-lg" style={{ top: '50%', right: '0', transform: 'translate(50%, -50%)', boxShadow: '0 0 8px #06b6d4' }}></div>
            </div>
          </div>
        </div>
        
        <h1 className="text-2xl sm:text-3xl font-bold text-cyan-600 tracking-wider mt-6 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
          Bee - Interactive Periodic Table
        </h1>
        <p className="mt-2 text-slate-500 animate-pulse-slow animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
          Loading Elements...
        </p>
      </div>

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
        @keyframes fade-in-zoom {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 15px 3px rgba(8, 145, 178, 0.4); }
          50% { box-shadow: 0 0 30px 8px rgba(8, 145, 178, 0.6); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; }
        }
        @keyframes orbit {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes orbit-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }

        .animate-fade-in-zoom { animation: fade-in-zoom 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-fade-in-up { animation: fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) backwards; }
        .animate-pulse-glow { animation: pulse-glow 2.5s infinite ease-in-out; }
        .animate-pulse-slow { animation: pulse-slow 2s infinite ease-in-out; }
        .animate-orbit { animation: orbit 4s linear infinite; }
        .animate-orbit-reverse { animation: orbit-reverse 3s linear infinite; }
      `}</style>
    </div>
  );
};