import React, { useState } from 'react';
import { Wifi, Battery } from 'lucide-react';

interface IPhone16ProMaxFrameProps {
  children: React.ReactNode;
  currentTime?: string;
  dynamicIslandContent?: React.ReactNode;
  frameColor?: 'natural' | 'desert' | 'black' | 'white';
  showReflection?: boolean;
}

export const IPhone16ProMaxFrame: React.FC<IPhone16ProMaxFrameProps> = ({
  children,
  currentTime = '9:41',
  dynamicIslandContent,
  frameColor = 'desert',
  showReflection = true,
}) => {
  const [islandExpanded, setIslandExpanded] = useState(false);

  const getFrameColorClass = () => {
    switch (frameColor) {
      case 'natural':
        return 'titanium-frame-natural border-[#5a5855]';
      case 'desert':
        return 'titanium-frame-desert border-[#7a6758]';
      case 'black':
        return 'titanium-frame-black border-[#383a3e]';
      case 'white':
        return 'titanium-frame-white border-[#c5c8d0]';
      default:
        return 'titanium-frame-desert border-[#7a6758]';
    }
  };

  return (
    <div className="relative mx-auto select-none transition-all duration-300">
      {/* Side Hardware Buttons */}
      {/* Action Button (Left upper) */}
      <div className="absolute -left-[4px] top-[148px] w-[4px] h-[32px] bg-[#3a3530] rounded-l-md shadow-sm opacity-90" />
      {/* Volume Up (Left middle) */}
      <div className="absolute -left-[4px] top-[198px] w-[4px] h-[58px] bg-[#3a3530] rounded-l-md shadow-sm opacity-90" />
      {/* Volume Down (Left lower) */}
      <div className="absolute -left-[4px] top-[268px] w-[4px] h-[58px] bg-[#3a3530] rounded-l-md shadow-sm opacity-90" />

      {/* Power Button (Right upper) */}
      <div className="absolute -right-[4px] top-[210px] w-[4px] h-[82px] bg-[#3a3530] rounded-r-md shadow-sm opacity-90" />
      {/* Camera Control button (Right lower - iPhone 16 specific!) */}
      <div className="absolute -right-[4px] top-[340px] w-[4px] h-[64px] bg-[#2d2824] rounded-r-sm border-r border-[#8d7c6d]/50 opacity-90" />

      {/* Main Titanium Chassis */}
      <div
        className={`relative w-[412px] h-[874px] p-[10px] rounded-[56px] border-[3px] shadow-[0_25px_70px_rgba(0,0,0,0.8),0_10px_30px_rgba(0,0,0,0.5)] ${getFrameColorClass()}`}
      >
        {/* Subtle glass reflection overlay */}
        {showReflection && (
          <div className="pointer-events-none absolute inset-0 rounded-[54px] bg-gradient-to-tr from-transparent via-white/[0.04] to-white/[0.12] z-30" />
        )}

        {/* OLED Screen Bezel & Display Area */}
        <div className="relative w-full h-full bg-white rounded-[46px] overflow-hidden flex flex-col iphone-screen-bezel shadow-inner">
          {/* iOS 18 Status Bar */}
          <div className="relative z-40 w-full h-[46px] px-8 flex items-center justify-between text-neutral-900 bg-transparent shrink-0">
            {/* Left: Time */}
            <span className="text-[15px] font-bold tracking-tight text-neutral-900 font-sans ml-1">
              {currentTime}
            </span>

            {/* Dynamic Island */}
            <div
              onClick={() => setIslandExpanded(!islandExpanded)}
              className={`absolute left-1/2 -translate-x-1/2 top-[10px] bg-black text-white rounded-full transition-all duration-300 flex items-center justify-between cursor-pointer shadow-md select-none ${
                islandExpanded
                  ? 'w-[280px] h-[68px] px-4 py-2 rounded-[28px]'
                  : 'w-[124px] h-[34px] px-3 py-1'
              }`}
            >
              {islandExpanded ? (
                <div className="w-full flex items-center justify-between text-xs text-neutral-300 animate-fadeIn">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center font-bold text-white text-xs">
                      TN
                    </div>
                    <div>
                      <div className="font-semibold text-white">TutorNest Live</div>
                      <div className="text-[10px] text-emerald-400">Toán lớp 9 • 18:00 - 20:00</div>
                    </div>
                  </div>
                  <div className="text-[10px] bg-neutral-800 px-2 py-1 rounded-full text-emerald-300 font-mono">
                    Tuần 1
                  </div>
                </div>
              ) : dynamicIslandContent ? (
                dynamicIslandContent
              ) : (
                <>
                  {/* Subtle camera lens & sensor dots */}
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-[#111] ring-1 ring-neutral-800 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#1e2330]" />
                    </div>
                  </div>
                  <div className="w-2.5 h-2.5 rounded-full bg-[#0a0f18] ring-1 ring-[#1f2838]" />
                </>
              )}
            </div>

            {/* Right: Cellular, WiFi, Battery */}
            <div className="flex items-center space-x-2 mr-1">
              {/* Cellular signal (4 bars) */}
              <div className="flex items-end space-x-[2px] h-3">
                <div className="w-[3px] h-[4px] bg-neutral-900 rounded-xs" />
                <div className="w-[3px] h-[6px] bg-neutral-900 rounded-xs" />
                <div className="w-[3px] h-[9px] bg-neutral-900 rounded-xs" />
                <div className="w-[3px] h-[12px] bg-neutral-900 rounded-xs" />
              </div>
              {/* WiFi */}
              <Wifi className="w-[14px] h-[14px] text-neutral-900 stroke-[2.2]" />
              {/* Battery */}
              <div className="flex items-center">
                <div className="w-[22px] h-[11px] rounded-[3px] border border-neutral-800 p-[1px] flex items-center">
                  <div className="w-[85%] h-full bg-neutral-900 rounded-[2px]" />
                </div>
                <div className="w-[1.5px] h-[4px] bg-neutral-800 rounded-r-xs ml-[0.5px]" />
              </div>
            </div>
          </div>

          {/* Interactive Screen viewport */}
          <div className="relative flex-1 min-h-0 w-full overflow-hidden flex flex-col bg-[#F8FAF9]">
            {children}
          </div>

          {/* iOS Bottom Home Indicator Bar */}
          <div className="relative w-full h-[22px] flex items-center justify-center shrink-0 bg-white pointer-events-none z-40">
            <div className="w-[136px] h-[4.5px] bg-neutral-800/80 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};
