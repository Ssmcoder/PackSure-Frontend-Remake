import React from 'react';
import { NavigationPath } from '../types';
import { ASSET_IMAGES } from '../data/mockData';

interface HeaderProps {
  currentPath: NavigationPath;
  onNavigate: (path: NavigationPath) => void;
  onOpenNewBatchModal: () => void;
  fontSizeLevel: number;
  onSetFontSizeLevel: (level: number) => void;
  isHighContrast: boolean;
  onToggleHighContrast: () => void;
  language: 'EN' | 'HI';
  onToggleLanguage: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPath,
  onNavigate,
  onOpenNewBatchModal,
  fontSizeLevel,
  onSetFontSizeLevel,
  isHighContrast,
  onToggleHighContrast,
  language,
  onToggleLanguage,
}) => {
  const isHi = language === 'HI';

  return (
    <header className="sticky top-0 z-40 bg-surface-container-lowest shadow-sm border-b border-outline-variant/30">
      {/* Indian National Tricolor Accent Strip */}
      <div className="h-1 w-full flex">
        <div className="h-full w-1/3 bg-[#FF9933]" />
        <div className="h-full w-1/3 bg-white" />
        <div className="h-full w-1/3 bg-[#138808]" />
      </div>

      {/* Top Accessibility & Institutional Utility Bar */}
      <div className="bg-primary text-on-primary text-[12px] py-1 px-4 sm:px-6 border-b border-primary-container">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-3">
            <span className="font-medium text-white/90">
              {isHi ? 'भारत सरकार | उपभोक्ता मामले मंत्रालय' : 'Government of India | Ministry of Consumer Affairs'}
            </span>
            <span className="text-white/40 hidden sm:inline">|</span>
            <span className="text-white/80 text-[11px] hidden md:inline">
              {isHi ? 'राष्ट्रीय पैकेजिंग एवं खेप सत्यापन प्रणाली' : 'National Packaging & Consignment Verification Desk (NAT-VERIFY)'}
            </span>
          </div>

          <div className="flex items-center space-x-4">
            {/* National Consumer Helpline */}
            <div className="hidden lg:flex items-center space-x-1.5 bg-primary-container/80 text-primary-fixed px-2.5 py-0.5 rounded text-[11px] font-medium border border-primary-fixed-dim/20">
              <span className="material-symbols-outlined text-[14px]">support_agent</span>
              <span>{isHi ? 'राष्ट्रीय उपभोक्ता हेल्पलाइन: 1915' : 'National Helpline: 1915'}</span>
            </div>

            {/* Accessibility Controls */}
            <div className="flex items-center space-x-1 bg-primary-container/60 px-2 py-0.5 rounded border border-white/10">
              <span className="text-white/70 text-[11px] mr-1 hidden sm:inline">{isHi ? 'आकार:' : 'Text:'}</span>
              <button
                type="button"
                onClick={() => onSetFontSizeLevel(Math.max(-1, fontSizeLevel - 1))}
                className={`px-1.5 py-0.5 rounded text-[11px] font-bold ${fontSizeLevel === -1 ? 'bg-primary-fixed text-primary' : 'text-white/80 hover:text-white'}`}
                title="Decrease Font Size"
              >
                A-
              </button>
              <button
                type="button"
                onClick={() => onSetFontSizeLevel(0)}
                className={`px-1.5 py-0.5 rounded text-[11px] font-bold ${fontSizeLevel === 0 ? 'bg-primary-fixed text-primary' : 'text-white/80 hover:text-white'}`}
                title="Normal Font Size"
              >
                A
              </button>
              <button
                type="button"
                onClick={() => onSetFontSizeLevel(Math.min(2, fontSizeLevel + 1))}
                className={`px-1.5 py-0.5 rounded text-[11px] font-bold ${fontSizeLevel > 0 ? 'bg-primary-fixed text-primary' : 'text-white/80 hover:text-white'}`}
                title="Increase Font Size"
              >
                A+
              </button>
            </div>

            {/* High Contrast Toggle */}
            <button
              type="button"
              onClick={onToggleHighContrast}
              className={`flex items-center space-x-1 px-2 py-0.5 rounded text-[11px] font-medium border transition-colors ${
                isHighContrast 
                  ? 'bg-yellow-400 text-black border-yellow-300 font-bold' 
                  : 'bg-primary-container/60 text-white/90 border-white/10 hover:bg-primary-container'
              }`}
              title="Toggle High Contrast Mode"
            >
              <span className="material-symbols-outlined text-[13px]">contrast</span>
              <span className="hidden sm:inline">{isHighContrast ? 'Standard' : 'Contrast'}</span>
            </button>

            {/* Language Switch */}
            <button
              type="button"
              onClick={onToggleLanguage}
              className="flex items-center space-x-1 bg-secondary text-white hover:bg-secondary/90 px-2 py-0.5 rounded text-[11px] font-bold tracking-wider transition-colors shadow-xs"
              title="Switch Language (English / हिंदी)"
            >
              <span>{isHi ? 'English' : 'हिंदी'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Brand & Navigation Desk Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between py-3 gap-4">
          {/* Logo & Platform Identity */}
          <div 
            onClick={() => onNavigate('dashboard')}
            className="flex items-center space-x-3.5 cursor-pointer group select-none"
          >
            <div className="relative flex items-center justify-center p-1 rounded-lg bg-surface-container-low border border-outline-variant/30 group-hover:border-primary/40 transition-colors">
              <img
                src={ASSET_IMAGES.logo}
                alt="PackSure Logo"
                className="h-10 w-auto object-contain"
                crossOrigin="anonymous"
              />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xl font-bold tracking-tight text-primary font-headline">
                  PackSure
                </span>
                <span className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-0.5 rounded-full border border-primary/20 tracking-wider">
                  NAT-VERIFY
                </span>
              </div>
              <p className="text-[11px] text-on-surface-variant font-medium">
                {isHi ? 'राष्ट्रीय खेप एवं पैकेजिंग प्रमाणन प्रणाली' : 'National Consignment & Packaging Certification Portal'}
              </p>
            </div>
          </div>

          {/* Officer Credentials & Action CTA */}
          <div className="flex items-center space-x-3">
            {/* Quick Action: Register New Batch */}
            <button
              type="button"
              onClick={onOpenNewBatchModal}
              id="btn-register-new-batch"
              className="hidden sm:flex items-center space-x-1.5 bg-primary text-on-primary hover:bg-primary-container px-3.5 py-2 rounded-lg text-xs font-semibold shadow-xs transition-all border border-primary/30 active:scale-98"
            >
              <span className="material-symbols-outlined text-[16px]">add_box</span>
              <span>{isHi ? '+ नया बैच दर्ज करें' : '+ Register Batch'}</span>
            </button>

            {/* Officer Status Badge */}
            <div className="flex items-center space-x-2.5 bg-surface-container-low border border-outline-variant/40 px-3 py-1.5 rounded-lg">
              <div className="relative">
                <div className="w-8 h-8 rounded-full bg-primary-container text-white flex items-center justify-center font-bold text-xs border border-primary-fixed-dim/30">
                  RS
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-white" title="Officer Online" />
              </div>
              <div className="hidden md:block text-left">
                <div className="text-xs font-bold text-on-surface leading-tight">Insp. R. Sharma</div>
                <div className="text-[10px] text-on-surface-variant font-medium flex items-center space-x-1">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary" />
                  <span>Checkpost #14 (NH-48)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Global Navigation Tabs */}
        <nav className="flex space-x-1 overflow-x-auto no-scrollbar border-t border-outline-variant/20 pt-1">
          <button
            type="button"
            onClick={() => onNavigate('dashboard')}
            id="nav-dashboard"
            className={`flex items-center space-x-2 px-3.5 py-2.5 text-xs font-semibold whitespace-nowrap transition-all border-b-2 -mb-[1px] ${
              currentPath === 'dashboard'
                ? 'border-secondary text-secondary bg-secondary/5 font-bold'
                : 'border-transparent text-on-surface-variant hover:text-on-surface hover:border-outline-variant'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">dashboard</span>
            <span>{isHi ? 'डैशबोर्ड' : 'Dashboard'}</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('quick-verify')}
            id="nav-quick-verify"
            className={`flex items-center space-x-2 px-3.5 py-2.5 text-xs font-semibold whitespace-nowrap transition-all border-b-2 -mb-[1px] ${
              currentPath === 'quick-verify'
                ? 'border-secondary text-secondary bg-secondary/5 font-bold'
                : 'border-transparent text-on-surface-variant hover:text-on-surface hover:border-outline-variant'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">verified_user</span>
            <span>{isHi ? 'त्वरित सत्यापन (सत्यापित प्रोफाइल)' : 'Quick Verify (Active Consignment)'}</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </button>

          <button
            type="button"
            onClick={() => onNavigate('consignment-registry')}
            id="nav-consignment-registry"
            className={`flex items-center space-x-2 px-3.5 py-2.5 text-xs font-semibold whitespace-nowrap transition-all border-b-2 -mb-[1px] ${
              currentPath === 'consignment-registry'
                ? 'border-secondary text-secondary bg-secondary/5 font-bold'
                : 'border-transparent text-on-surface-variant hover:text-on-surface hover:border-outline-variant'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">inventory_2</span>
            <span>{isHi ? 'खेप रजिस्ट्री एवं ऑडिट लेज़र' : 'Consignment Registry'}</span>
            <span className="text-[10px] bg-surface-container-high px-1.5 py-0.2 rounded font-mono text-on-surface">
              7 Live
            </span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('report-violation-or-grievance')}
            id="nav-report-violation"
            className={`flex items-center space-x-2 px-3.5 py-2.5 text-xs font-semibold whitespace-nowrap transition-all border-b-2 -mb-[1px] ${
              currentPath === 'report-violation-or-grievance'
                ? 'border-error text-error bg-error/5 font-bold'
                : 'border-transparent text-error/90 hover:text-error hover:border-error/30'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">report_problem</span>
            <span>{isHi ? 'उल्लंघन रिपोर्ट (प्रपत्र 4-B)' : 'Report Violation (Form 4-B)'}</span>
            <span className="text-[10px] bg-error-container text-on-error-container px-1.5 py-0.2 rounded font-bold">
              Enforcement
            </span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('packaging-standards-and-bis')}
            id="nav-packaging-standards"
            className={`flex items-center space-x-2 px-3.5 py-2.5 text-xs font-semibold whitespace-nowrap transition-all border-b-2 -mb-[1px] ${
              currentPath === 'packaging-standards-and-bis'
                ? 'border-secondary text-secondary bg-secondary/5 font-bold'
                : 'border-transparent text-on-surface-variant hover:text-on-surface hover:border-outline-variant'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">policy</span>
            <span>{isHi ? 'पैकेजिंग मानक (BIS)' : 'Packaging Standards & BIS'}</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('qr-and-barcode-validator')}
            id="nav-qr-validator"
            className={`flex items-center space-x-2 px-3.5 py-2.5 text-xs font-semibold whitespace-nowrap transition-all border-b-2 -mb-[1px] ${
              currentPath === 'qr-and-barcode-validator'
                ? 'border-secondary text-secondary bg-secondary/5 font-bold'
                : 'border-transparent text-on-surface-variant hover:text-on-surface hover:border-outline-variant'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">qr_code_scanner</span>
            <span>{isHi ? 'क्यूआर व बारकोड स्कैनर' : 'QR & Barcode Validator'}</span>
          </button>
        </nav>
      </div>
    </header>
  );
};
