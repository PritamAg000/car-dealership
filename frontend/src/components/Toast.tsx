import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

export interface ToastProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
  duration?: number;
}

export const Toast: React.FC<ToastProps> = ({ message, type, onClose, duration = 4000 }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const isSuccess = type === 'success';

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-4 rounded-xl shadow-2xl backdrop-blur-md border transition-all duration-300 transform translate-y-0 ${
        isSuccess
          ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-200'
          : 'bg-rose-950/80 border-rose-500/50 text-rose-200'
      }`}
    >
      {isSuccess ? (
        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
      ) : (
        <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
      )}
      <span className="text-sm font-medium pr-2">{message}</span>
      <button
        onClick={onClose}
        className="p-1 hover:bg-white/10 rounded-lg transition-colors"
      >
        <X className="w-4 h-4 opacity-70 hover:opacity-100" />
      </button>
    </div>
  );
};
