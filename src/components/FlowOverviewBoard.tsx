import React from 'react';
import { ScreenId, BookingState, Tutor } from '../types';
import { FLOW_STEPS } from '../data/mockData';
import { ChevronRight, ExternalLink, Eye } from 'lucide-react';

interface FlowOverviewBoardProps {
  currentScreen: ScreenId;
  onSelectScreen: (screen: ScreenId) => void;
  booking: BookingState;
}

export const FlowOverviewBoard: React.FC<FlowOverviewBoardProps> = ({
  currentScreen,
  onSelectScreen,
  booking,
}) => {
  return (
    <div className="w-full h-full overflow-auto p-6 md:p-8 space-y-8 bg-[#090d12] text-white">
      {/* Header */}
      <div className="max-w-7xl mx-auto space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-800/80 text-xs font-semibold mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Full User Journey Map</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              Flow 1: Book a session (Parent)
            </h1>
            <p className="text-sm text-neutral-400 mt-1">
              Tìm gia sư → Xem hồ sơ → Chọn lịch học → Chọn thời gian → Chọn kiểu thanh toán → Xác nhận đặt lịch
            </p>
          </div>

          <div className="flex items-center space-x-2 text-xs text-neutral-400 bg-neutral-900/80 p-2 rounded-xl border border-neutral-800">
            <span>Bấm vào thẻ bất kỳ để tương tác trực tiếp trên màn hình iPhone 16 Pro Max</span>
          </div>
        </div>
      </div>

      {/* Grid of Screens */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {FLOW_STEPS.map((step) => {
          const isActive = currentScreen === step.id;

          return (
            <div
              key={step.id}
              onClick={() => onSelectScreen(step.id)}
              className={`group relative rounded-3xl p-4 transition-all duration-200 cursor-pointer border flex flex-col justify-between ${
                isActive
                  ? 'bg-neutral-900/90 border-emerald-500 ring-2 ring-emerald-500/30 shadow-xl shadow-emerald-950/50'
                  : 'bg-neutral-900/60 border-neutral-800 hover:border-neutral-700 hover:bg-neutral-900'
              }`}
            >
              {/* Step number badge & Title */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                        isActive
                          ? 'bg-emerald-500 text-neutral-950 shadow-md'
                          : 'bg-emerald-900/60 text-emerald-300 border border-emerald-700/60'
                      }`}
                    >
                      {step.number}
                    </span>
                    <h3 className="text-sm font-bold text-neutral-100 group-hover:text-emerald-400 transition-colors">
                      {step.label}
                    </h3>
                  </div>

                  <span className="text-[10px] text-neutral-500 group-hover:text-neutral-300 flex items-center space-x-0.5">
                    <Eye className="w-3 h-3" />
                  </span>
                </div>

                <p className="text-xs text-neutral-400 leading-relaxed min-h-[36px]">
                  {step.desc}
                </p>
              </div>

              {/* Action Button */}
              <div className="mt-4 pt-3 border-t border-neutral-800/80 flex items-center justify-between">
                <span className="text-[11px] font-semibold text-emerald-400 group-hover:underline flex items-center space-x-1">
                  <span>Mở trên iPhone</span>
                  <ChevronRight className="w-3 h-3" />
                </span>
                {isActive && (
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-mono font-semibold">
                    Đang xem
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
