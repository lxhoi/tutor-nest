import React from 'react';
import { ScreenId, BookingState, AppVersion } from '../types';
import { FLOW_STEPS_V1, FLOW_STEPS_V2 } from '../data/mockData';
import { ChevronRight, Eye, CheckCircle2, AlertTriangle, ArrowRight, Sparkles, TrendingUp } from 'lucide-react';

interface FlowOverviewBoardProps {
  currentScreen: ScreenId;
  onSelectScreen: (screen: ScreenId) => void;
  booking: BookingState;
  currentVersion: AppVersion;
  onSwitchVersion: (version: AppVersion) => void;
}

export const FlowOverviewBoard: React.FC<FlowOverviewBoardProps> = ({
  currentScreen,
  onSelectScreen,
  booking,
  currentVersion,
  onSwitchVersion,
}) => {
  const steps = currentVersion === 'v1' ? FLOW_STEPS_V1 : FLOW_STEPS_V2;

  return (
    <div className="w-full h-full overflow-auto p-6 md:p-8 space-y-6 bg-[#090d12] text-white">
      
      {/* Top Header & Version Switcher */}
      <div className="max-w-7xl mx-auto space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-800/80 text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Kiểm Định & So Sánh Luồng Trải Nghiệm (UX Benchmark)</span>
              </span>
            </div>

            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              {currentVersion === 'v1' ? 'Version 1: Bản thiết kế gốc (Figma Flow)' : 'Version 2: Phiên bản Tinh gọn & Chuyển đổi cao'}
            </h1>
            <p className="text-sm text-neutral-400 mt-1">
              {currentVersion === 'v1'
                ? '12 màn hình tuyến tính rời rạc · Điểm kiểm định UX: 4.8 / 10 (Quá tải nhận thức, Click-depth sâu)'
                : 'Phễu 4 bước hợp nhất · Đạt chuẩn WCAG 2.1 AA · Điểm kiểm định UX: 9.2 / 10 (Tối giản & Tin cậy)'}
            </p>
          </div>

          {/* Version Switcher Tabs */}
          <div className="flex items-center bg-neutral-900 p-1 rounded-2xl border border-neutral-700/80 shadow-lg">
            <button
              onClick={() => onSwitchVersion('v1')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center space-x-2 ${
                currentVersion === 'v1'
                  ? 'bg-neutral-800 text-amber-400 border border-amber-500/50 shadow-md'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <span>V1: Bản gốc</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-neutral-900 border border-neutral-700">4.8 UX</span>
            </button>

            <button
              onClick={() => onSwitchVersion('v2')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center space-x-2 ${
                currentVersion === 'v2'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>V2: Tinh gọn</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-800 border border-emerald-500">9.2 UX</span>
            </button>
          </div>
        </div>

        {/* UX Benchmark Matrix Card */}
        <div className="bg-neutral-900/90 rounded-2xl p-4 border border-neutral-800 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          <div className="space-y-1">
            <div className="text-neutral-400">Số bước đặt lịch:</div>
            <div className="text-sm font-bold flex items-center space-x-2">
              <span className="text-amber-400 line-through">8-10 bước</span>
              <ArrowRight className="w-3 h-3 text-neutral-500" />
              <span className="text-emerald-400 font-extrabold">4 bước (Giảm 60%)</span>
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-neutral-400">Mật độ nội dung Home:</div>
            <div className="text-sm font-bold flex items-center space-x-2">
              <span className="text-amber-400 line-through">13 khối dọc</span>
              <ArrowRight className="w-3 h-3 text-neutral-500" />
              <span className="text-emerald-400 font-extrabold">4 khối cốt lõi</span>
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-neutral-400">Tương phản WCAG 2.1 AA:</div>
            <div className="text-sm font-bold flex items-center space-x-2">
              <span className="text-rose-400 line-through">2.43:1 (Trượt)</span>
              <ArrowRight className="w-3 h-3 text-neutral-500" />
              <span className="text-emerald-400 font-extrabold">4.65:1 (Đạt AA)</span>
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-neutral-400">Mô hình tư duy:</div>
            <div className="text-sm font-bold flex items-center space-x-2">
              <span className="text-amber-400 line-through">Chọn mò giờ</span>
              <ArrowRight className="w-3 h-3 text-neutral-500" />
              <span className="text-emerald-400 font-extrabold">Lọc giờ trống trước</span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid of Screens for current version */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {steps.map((step) => {
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
                          : currentVersion === 'v2'
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                          : 'bg-neutral-800 text-neutral-300 border border-neutral-700'
                      }`}
                    >
                      {step.number}
                    </span>
                    <h3 className="text-sm font-bold text-neutral-100 group-hover:text-emerald-400 transition-colors">
                      {step.label}
                    </h3>
                  </div>

                  <span className="text-[10px] text-neutral-500 group-hover:text-neutral-300 flex items-center space-x-0.5">
                    <Eye className="w-3.5 h-3.5" />
                  </span>
                </div>

                <p className="text-xs text-neutral-400 leading-relaxed min-h-[44px]">
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
