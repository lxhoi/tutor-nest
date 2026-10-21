import React from 'react';
import { X, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

interface OriginalReferenceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OriginalReferenceModal: React.FC<OriginalReferenceModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex flex-col p-4 md:p-6 animate-fadeIn">
      {/* Top Header */}
      <div className="flex items-center justify-between text-white pb-4 border-b border-white/10 shrink-0">
        <div>
          <h3 className="text-base font-bold">Hình ảnh thiết kế gốc (Figma User Flow)</h3>
          <p className="text-xs text-neutral-400">Flow 1: Book a session (Parent) - TutorNest</p>
        </div>

        <button
          onClick={onClose}
          className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Image container */}
      <div className="flex-1 overflow-auto flex items-center justify-center p-2">
        <img
          src="/assets/aistudio/book_a_session_flow_0a63149a.png"
          alt="Original Book a Session Flow"
          className="max-w-full max-h-full object-contain rounded-xl shadow-2xl border border-white/10"
        />
      </div>
    </div>
  );
};
