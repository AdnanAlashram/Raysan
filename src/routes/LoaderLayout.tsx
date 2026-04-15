import { Outlet, useLocation } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';

const LoaderLayout = () => {
  const [isLoad, setLoad] = useState(true);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/') {
      const timer = setTimeout(() => setLoad(false), 3000);
      return () => clearTimeout(timer);
    } else {
      setLoad(false);
    }
  }, [location]);

  if (isLoad && location.pathname === '/') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-mainBg">
        <style>{`
          @keyframes cartMove {
            0%, 100% { transform: translateX(-10px) rotate(-5deg); }
            50% { transform: translateX(10px) rotate(5deg); }
          }
          @keyframes boxFall {
            0% { transform: translateY(-50px); opacity: 0; }
            50% { transform: translateY(0); opacity: 1; }
            100% { transform: translateY(0); opacity: 1; }
          }
          @keyframes lineGrow {
            to { stroke-dashoffset: 0; }
          }
          .cart-body {
            animation: cartMove 2s ease-in-out infinite;
          }
          .shopping-box {
            opacity: 0;
            animation: boxFall 1.5s ease-in-out infinite;
          }
          .track-line {
            stroke-dasharray: 100;
            stroke-dashoffset: 100;
            animation: lineGrow 2s linear infinite;
          }
        `}</style>

        <div className="relative">
          <svg
            className="w-32 h-32 text-textHighlight"
            viewBox="0 0 100 100"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 85 H80" className="track-line opacity-20" strokeWidth="1" />
            
            <g className="cart-body">
              <path d="M25 35 H85 L75 70 H30 L20 20 H10" className="stroke-textHighlight" />
              <circle cx="35" cy="80" r="5" className="fill-textHighlight" />
              <circle cx="70" cy="80" r="5" className="fill-textHighlight" />
              
              <rect x="40" y="40" width="20" height="20" rx="2" className="shopping-box fill-textHighlight/30 stroke-textHighlight" />
            </g>
          </svg>

          <div className="absolute inset-0 bg-textHighlight/20 blur-[60px] rounded-full -z-10" />
        </div>

        <div className="mt-8 flex flex-col items-center gap-2">
          <div className="flex gap-1">
             <div className="w-2 h-2 bg-textHighlight rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
             <div className="w-2 h-2 bg-textHighlight rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
             <div className="w-2 h-2 bg-textHighlight rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
          </div>
          <p className="text-gray-400 text-[10px] font-bold tracking-[0.4em] uppercase mt-2">
            Preparing your store
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Toaster position="top-center" />
      <Outlet />
    </>
  );
};

export default LoaderLayout;