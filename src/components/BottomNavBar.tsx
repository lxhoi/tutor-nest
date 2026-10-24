import React from 'react';
import { Home, Search, Calendar, MessageSquare, User } from 'lucide-react';
import { ScreenId } from '../types';

interface BottomNavBarProps {
  activeTab: 'home' | 'search' | 'schedule' | 'messages' | 'me';
  onNavigate: (screen: ScreenId) => void;
  hasUpcomingBadge?: boolean;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  activeTab,
  onNavigate,
  hasUpcomingBadge = false,
}) => {
  return (
    <div className="w-full bg-[var(--systembg__modal)] border-t border-[var(--systembg__fgbase)] py-1.5 px-3 flex items-center justify-around shadow-[0_-4px_10px_rgba(0,0,0,0.02)] shrink-0 z-30">
      <button
        onClick={() => onNavigate('1_home')}
        className="flex flex-col items-center justify-center transition-all py-1 px-2 cursor-pointer"
        style={{ color: activeTab === 'home' ? 'var(--primitive__green)' : 'var(--text__muted)' }}
      >
        <Home className={`w-5 h-5 ${activeTab === 'home' ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
        <span className={`text-[10px] mt-0.5 ${activeTab === 'home' ? 'font-bold' : 'font-medium'}`}>Trang chủ</span>
      </button>

      <button
        onClick={() => onNavigate('2_search_filter')}
        className="flex flex-col items-center justify-center transition-all py-1 px-2 cursor-pointer"
        style={{ color: activeTab === 'search' ? 'var(--primitive__green)' : 'var(--text__muted)' }}
      >
        <Search className={`w-5 h-5 ${activeTab === 'search' ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
        <span className={`text-[10px] mt-0.5 ${activeTab === 'search' ? 'font-bold' : 'font-medium'}`}>Tìm kiếm</span>
      </button>

      <button
        onClick={() => onNavigate('11_schedule_list')}
        className="flex flex-col items-center justify-center transition-all py-1 px-2 relative cursor-pointer"
        style={{ color: activeTab === 'schedule' ? 'var(--primitive__green)' : 'var(--text__muted)' }}
      >
        <div className="relative">
          <Calendar className={`w-5 h-5 ${activeTab === 'schedule' ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
          {hasUpcomingBadge && (
            <span
              className="absolute -top-1 -right-1 w-2 h-2 rounded-full animate-pulse ring-1 ring-white"
              style={{ backgroundColor: 'var(--primitive__green)' }}
            />
          )}
        </div>
        <span className={`text-[10px] mt-0.5 ${activeTab === 'schedule' ? 'font-bold' : 'font-medium'}`}>Lịch học</span>
      </button>

      <button
        onClick={() => {}}
        className="flex flex-col items-center justify-center transition-all py-1 px-2 cursor-pointer"
        style={{ color: activeTab === 'messages' ? 'var(--primitive__green)' : 'var(--text__muted)' }}
      >
        <div className="relative">
          <MessageSquare className={`w-5 h-5 ${activeTab === 'messages' ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
          <span
            className="absolute -top-1 -right-1 w-3.5 h-3.5 text-white rounded-full text-[8px] flex items-center justify-center font-bold"
            style={{ backgroundColor: 'var(--semantic__alertdark)' }}
          >
            1
          </span>
        </div>
        <span className={`text-[10px] mt-0.5 ${activeTab === 'messages' ? 'font-bold' : 'font-medium'}`}>Tin nhắn</span>
      </button>

      <button
        onClick={() => {}}
        className="flex flex-col items-center justify-center transition-all py-1 px-2 cursor-pointer"
        style={{ color: activeTab === 'me' ? 'var(--primitive__green)' : 'var(--text__muted)' }}
      >
        <User className={`w-5 h-5 ${activeTab === 'me' ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
        <span className={`text-[10px] mt-0.5 ${activeTab === 'me' ? 'font-bold' : 'font-medium'}`}>Tôi</span>
      </button>
    </div>
  );
};
