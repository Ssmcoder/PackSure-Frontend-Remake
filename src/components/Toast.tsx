import React from 'react';
import { ToastMessage } from '../types';

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col space-y-2 max-w-sm pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex items-center justify-between p-3.5 rounded-lg shadow-lg border text-xs font-medium backdrop-blur-md transition-all animate-in slide-in-from-bottom-3 ${
            toast.type === 'warning'
              ? 'bg-amber-950 text-amber-100 border-amber-800'
              : toast.type === 'info'
              ? 'bg-primary-container text-white border-primary-fixed-dim/40'
              : 'bg-emerald-950 text-emerald-100 border-emerald-800'
          }`}
        >
          <div className="flex items-center space-x-2.5">
            <span className="material-symbols-outlined text-[18px]">
              {toast.icon || (toast.type === 'warning' ? 'warning' : toast.type === 'info' ? 'info' : 'check_circle')}
            </span>
            <span>{toast.message}</span>
          </div>
          <button
            type="button"
            onClick={() => onDismiss(toast.id)}
            className="ml-3 text-white/70 hover:text-white p-1 rounded"
          >
            <span className="material-symbols-outlined text-[14px]">close</span>
          </button>
        </div>
      ))}
    </div>
  );
};
