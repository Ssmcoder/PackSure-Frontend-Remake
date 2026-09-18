import React from 'react';

interface StatutoryBannerProps {
  onDismiss: () => void;
  onDownloadCircular: () => void;
}

export const StatutoryBanner: React.FC<StatutoryBannerProps> = ({ onDismiss, onDownloadCircular }) => {
  return (
    <div className="bg-surface-container-high border-b border-primary/20 px-4 py-2.5 text-xs text-primary transition-all">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex items-center space-x-2.5 min-w-0">
          <span className="material-symbols-outlined text-secondary text-[20px] shrink-0 animate-pulse">
            campaign
          </span>
          <p className="font-medium truncate text-[12px] sm:text-xs text-on-surface">
            <strong className="text-secondary font-bold mr-1.5">[GAZETTE NOTIFICATION S.O. 4410(E)]:</strong>
            Mandatory 2D DataMatrix Security QR on all Class-A & B Industrial Consignments under BIS IS 16636:2023 is strictly in force.
          </p>
        </div>
        <div className="flex items-center space-x-3 shrink-0 ml-auto">
          <button
            type="button"
            onClick={onDownloadCircular}
            className="text-[11px] font-bold text-secondary hover:text-secondary-container underline underline-offset-2 flex items-center space-x-1 cursor-pointer"
          >
            <span>Download Official Circular (PDF)</span>
            <span className="material-symbols-outlined text-[14px]">download</span>
          </button>
          <button
            type="button"
            onClick={onDismiss}
            aria-label="Dismiss banner"
            className="text-on-surface-variant hover:text-on-surface p-0.5 rounded cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>
      </div>
    </div>
  );
};
