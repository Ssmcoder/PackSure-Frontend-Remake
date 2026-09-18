import React, { useState } from 'react';
import { BIS_STANDARDS_CATALOG } from '../data/mockData';

interface StandardsViewProps {
  onDownloadStandard: (code: string) => void;
}

export const StandardsView: React.FC<StandardsViewProps> = ({ onDownloadStandard }) => {
  const [selectedStandard, setSelectedStandard] = useState(BIS_STANDARDS_CATALOG[0]);
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = BIS_STANDARDS_CATALOG.filter(
    (s) =>
      s.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.scope.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-surface-container-low p-5 sm:p-6 rounded-xl border border-outline-variant/30 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-primary text-xs font-mono mb-1">
            <span className="material-symbols-outlined text-[16px] text-secondary">policy</span>
            <span>BUREAU OF INDIAN STANDARDS (BIS) MANDATORY CODES</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-primary font-headline tracking-tight">
            Packaging Standards, Quality Control Orders & BIS Specs
          </h1>
          <p className="text-xs text-on-surface-variant max-w-2xl mt-1">
            Comprehensive compendium of mandatory industrial, medical, and commercial packaging specifications enforceable under the BIS Act, 2016 and Legal Metrology Rules.
          </p>
        </div>

        <div className="w-full md:w-64 relative">
          <span className="material-symbols-outlined absolute left-3 top-2.5 text-[18px] text-outline">
            search
          </span>
          <input
            type="text"
            placeholder="Search IS standards..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-surface-container-lowest border border-outline-variant/40 rounded-lg py-2 pl-9 pr-3 text-xs text-on-surface focus:outline-none focus:border-secondary font-medium"
          />
        </div>
      </div>

      {/* Grid: Left List (4 cols) vs Right Details (8 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left List */}
        <div className="lg:col-span-4 space-y-3">
          <div className="text-xs font-bold text-primary uppercase tracking-wider font-headline">
            Mandatory Standards List ({filtered.length})
          </div>
          <div className="space-y-2">
            {filtered.map((std) => (
              <div
                key={std.code}
                onClick={() => setSelectedStandard(std)}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                  selectedStandard.code === std.code
                    ? 'bg-primary text-white border-primary shadow-sm'
                    : 'bg-surface-container-lowest hover:bg-surface-container-low border-outline-variant/30 text-on-surface'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`font-mono text-xs font-bold ${
                    selectedStandard.code === std.code ? 'text-primary-fixed' : 'text-primary'
                  }`}>
                    {std.code}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    selectedStandard.code === std.code ? 'bg-white/20 text-white' : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {std.complianceRate} Compliance
                  </span>
                </div>
                <div className={`text-xs font-semibold line-clamp-2 ${
                  selectedStandard.code === std.code ? 'text-white' : 'text-on-surface'
                }`}>
                  {std.title}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Details */}
        <div className="lg:col-span-8 bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/30 shadow-xs space-y-6">
          <div className="flex flex-wrap items-start justify-between gap-4 pb-4 border-b border-outline-variant/20">
            <div>
              <span className="bg-primary/10 text-primary font-mono font-bold text-xs px-2.5 py-1 rounded">
                {selectedStandard.code}
              </span>
              <h2 className="text-lg font-bold text-primary font-headline mt-2">
                {selectedStandard.title}
              </h2>
              <p className="text-xs text-on-surface-variant mt-1 max-w-xl">
                {selectedStandard.description}
              </p>
            </div>

            <button
              type="button"
              onClick={() => onDownloadStandard(selectedStandard.code)}
              className="px-4 py-2 rounded-lg bg-secondary text-white text-xs font-bold hover:bg-secondary/90 transition-all flex items-center space-x-1.5 shadow-xs"
            >
              <span className="material-symbols-outlined text-[16px]">download</span>
              <span>Download Full IS Spec (PDF)</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3.5 rounded-lg bg-surface-container-low border border-outline-variant/30 space-y-1">
              <span className="text-[10px] text-on-surface-variant uppercase font-bold">Mandatory Enforcement Date</span>
              <strong className="text-on-surface block text-xs">{selectedStandard.mandatoryDate}</strong>
            </div>

            <div className="p-3.5 rounded-lg bg-surface-container-low border border-outline-variant/30 space-y-1">
              <span className="text-[10px] text-on-surface-variant uppercase font-bold">Applicable Commodity Scope</span>
              <strong className="text-on-surface block text-xs">{selectedStandard.scope}</strong>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-xs font-bold text-primary uppercase tracking-wider font-headline flex items-center space-x-1.5">
              <span className="material-symbols-outlined text-[18px] text-emerald-700">science</span>
              <span>Mandatory Physical & Chemical Assay Parameters</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {selectedStandard.testingRequirements.map((req, idx) => (
                <div key={idx} className="p-3 rounded-lg border border-outline-variant/30 bg-surface flex items-start space-x-2.5">
                  <span className="w-5 h-5 rounded-full bg-primary/10 text-primary font-mono text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    0{idx + 1}
                  </span>
                  <span className="text-on-surface text-[11px] leading-snug">{req}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-lg bg-error-container/30 border border-error/30 text-xs space-y-1 text-on-error-container">
            <div className="font-bold flex items-center space-x-1.5 text-error">
              <span className="material-symbols-outlined text-[18px]">gavel</span>
              <span>Statutory Penalty & Seizure Clause</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              Consignments failing {selectedStandard.code} specifications are liable for summary confiscation under {selectedStandard.penaltyClause}. Manufacturer licenses may be suspended by the Central Certification Body.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
