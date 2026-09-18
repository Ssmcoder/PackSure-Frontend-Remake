import React from 'react';
import { ASSET_IMAGES } from '../data/mockData';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-primary text-on-primary border-t border-primary-container mt-16 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-primary-container/80">
          {/* Col 1: Portal Mandate & BIS Certification */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="p-1.5 bg-white rounded-md">
                <img
                  src={ASSET_IMAGES.logo}
                  alt="PackSure Logo"
                  className="h-9 w-auto object-contain"
                  crossOrigin="anonymous"
                />
              </div>
              <div>
                <span className="font-bold text-base tracking-wide block font-headline">PackSure</span>
                <span className="text-[11px] text-primary-fixed-dim">NAT-VERIFY Network</span>
              </div>
            </div>
            <p className="text-xs text-white/75 leading-relaxed">
              Apex regulatory platform for real-time verification of industrial packaging integrity, BIS consignment compliance, and anti-counterfeiting oversight across Indian commerce.
            </p>
            <div className="pt-1 flex items-center space-x-2 text-[11px] text-primary-fixed font-semibold">
              <span className="material-symbols-outlined text-[16px] text-emerald-400">verified</span>
              <span>ISO 9001:2015 & BIS Conforming</span>
            </div>
          </div>

          {/* Col 2: Statutory Authorities */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-primary-fixed mb-4 font-headline">
              Statutory Authorities
            </h4>
            <ul className="space-y-2.5 text-xs text-white/80">
              <li className="hover:text-white transition-colors cursor-pointer flex items-center space-x-1.5">
                <span className="material-symbols-outlined text-[13px] text-primary-fixed-dim">chevron_right</span>
                <span>Bureau of Indian Standards (BIS)</span>
              </li>
              <li className="hover:text-white transition-colors cursor-pointer flex items-center space-x-1.5">
                <span className="material-symbols-outlined text-[13px] text-primary-fixed-dim">chevron_right</span>
                <span>Department of Consumer Affairs (DoCA)</span>
              </li>
              <li className="hover:text-white transition-colors cursor-pointer flex items-center space-x-1.5">
                <span className="material-symbols-outlined text-[13px] text-primary-fixed-dim">chevron_right</span>
                <span>Legal Metrology Division, Govt. of India</span>
              </li>
              <li className="hover:text-white transition-colors cursor-pointer flex items-center space-x-1.5">
                <span className="material-symbols-outlined text-[13px] text-primary-fixed-dim">chevron_right</span>
                <span>Central Consumer Protection Authority (CCPA)</span>
              </li>
              <li className="hover:text-white transition-colors cursor-pointer flex items-center space-x-1.5">
                <span className="material-symbols-outlined text-[13px] text-primary-fixed-dim">chevron_right</span>
                <span>GSTN E-Way Bill Interoperability Node</span>
              </li>
            </ul>
          </div>

          {/* Col 3: Compliance & Legal Directives */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-primary-fixed mb-4 font-headline">
              Directives & Acts
            </h4>
            <ul className="space-y-2.5 text-xs text-white/80">
              <li className="hover:text-white transition-colors cursor-pointer flex items-center space-x-1.5">
                <span className="material-symbols-outlined text-[13px] text-primary-fixed-dim">gavel</span>
                <span>Bureau of Indian Standards Act, 2016</span>
              </li>
              <li className="hover:text-white transition-colors cursor-pointer flex items-center space-x-1.5">
                <span className="material-symbols-outlined text-[13px] text-primary-fixed-dim">gavel</span>
                <span>Legal Metrology (Packaged Commodities) Rules</span>
              </li>
              <li className="hover:text-white transition-colors cursor-pointer flex items-center space-x-1.5">
                <span className="material-symbols-outlined text-[13px] text-primary-fixed-dim">gavel</span>
                <span>Quality Control Order (QCO) 2023 - Tamper Seals</span>
              </li>
              <li className="hover:text-white transition-colors cursor-pointer flex items-center space-x-1.5">
                <span className="material-symbols-outlined text-[13px] text-primary-fixed-dim">gavel</span>
                <span>Section 19(2) Consignment Seizure Directives</span>
              </li>
              <li className="hover:text-white transition-colors cursor-pointer flex items-center space-x-1.5">
                <span className="material-symbols-outlined text-[13px] text-primary-fixed-dim">shield</span>
                <span>Whistleblower Protection Standard Sec. 11</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Emergency Checkpost Desk & Helplines */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-primary-fixed mb-4 font-headline">
              24x7 Checkpost Helpline
            </h4>
            <div className="space-y-3 text-xs text-white/80">
              <div className="p-3 bg-primary-container/80 rounded-lg border border-primary-fixed-dim/20">
                <div className="text-[11px] text-primary-fixed font-bold mb-1">National Consumer Helpline</div>
                <div className="text-lg font-bold text-white font-mono tracking-wider">1915 / 1800-11-4000</div>
                <div className="text-[10px] text-white/70">Operational 24x7 all 365 days across all Indian states</div>
              </div>
              <div className="text-[11px] text-white/70 flex items-center space-x-2">
                <span className="material-symbols-outlined text-[15px] text-emerald-400">lock</span>
                <span>SHA-256 Ledger Node Sync: <span className="text-emerald-300 font-mono">OPERATIONAL</span></span>
              </div>
              <div className="text-[11px] text-white/70 flex items-center space-x-2">
                <span className="material-symbols-outlined text-[15px] text-primary-fixed">mail</span>
                <span>enforcement-desk@packsure.gov.in</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Statutory Ownership Statement */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-white/60 gap-3">
          <div>
            Designed, Developed and Hosted by <span className="text-white/90 font-semibold">National Informatics Centre (NIC)</span>. Content Owned & Maintained by <span className="text-white/90 font-semibold">Department of Consumer Affairs</span>, Government of India.
          </div>
          <div className="flex items-center space-x-4">
            <span className="hover:text-white cursor-pointer">Terms of Service</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer">Hyperlink Policy</span>
            <span>•</span>
            <span className="text-primary-fixed font-mono font-medium">Build 2.8.4-IN</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
