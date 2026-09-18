import React, { useState } from 'react';
import { ConsignmentItem, NavigationPath } from '../types';
import { ASSET_IMAGES } from '../data/mockData';

interface DashboardViewProps {
  consignments: ConsignmentItem[];
  onSelectConsignment: (item: ConsignmentItem) => void;
  onNavigate: (path: NavigationPath) => void;
  onInspect: (item: ConsignmentItem) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  consignments,
  onSelectConsignment,
  onNavigate,
  onInspect,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'verified' | 'inspecting' | 'flagged'>('all');

  const filteredConsignments = consignments.filter((item) => {
    const matchesFilter =
      activeFilter === 'all'
        ? true
        : activeFilter === 'verified'
        ? item.status === 'verified'
        : activeFilter === 'inspecting'
        ? item.status === 'inspecting'
        : item.status === 'flagged';

    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      item.id.toLowerCase().includes(q) ||
      item.ewayBill.toLowerCase().includes(q) ||
      item.manufacturer.toLowerCase().includes(q) ||
      item.productName.toLowerCase().includes(q) ||
      item.sealTag.toLowerCase().includes(q);

    return matchesFilter && matchesSearch;
  });

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    const found = consignments.find(
      (c) =>
        c.id.toLowerCase() === searchQuery.toLowerCase().trim() ||
        c.ewayBill.toLowerCase() === searchQuery.toLowerCase().trim()
    );
    if (found) {
      onSelectConsignment(found);
    }
  };

  const handlePresetClick = (uid: string) => {
    setSearchQuery(uid);
    const item = consignments.find((c) => c.id === uid);
    if (item) {
      onSelectConsignment(item);
    }
  };

  return (
    <div className="space-y-6">
      {/* Search Hero Box with Presets */}
      <div className="bg-surface-container-low rounded-xl p-5 sm:p-6 border border-outline-variant/30 shadow-xs">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-primary font-headline tracking-tight">
            National Consignment Verification Desk
          </h1>
          <p className="text-xs sm:text-sm text-on-surface-variant max-w-2xl mx-auto">
            Real-time validation of industrial packaging integrity, BIS IS 16636:2023 tamper-evident seals, and statutory E-Way bill declarations across inter-state border checkposts.
          </p>

          {/* Search Input Bar */}
          <form onSubmit={handleSearchSubmit} className="pt-2">
            <div className="relative flex items-center shadow-sm rounded-xl overflow-hidden border border-outline-variant bg-surface-container-lowest focus-within:border-secondary focus-within:ring-2 focus-within:ring-secondary/20 transition-all">
              <span className="material-symbols-outlined text-outline ml-4 text-[22px]">
                qr_code_scanner
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter Consignment UID, E-Way Bill, or Scan QR Seal (e.g. PS-IND-2025-783920)..."
                className="w-full py-3.5 pl-3 pr-24 sm:pr-32 text-xs sm:text-sm text-on-surface bg-transparent focus:outline-none placeholder:text-outline font-medium"
              />
              <button
                type="submit"
                className="absolute right-1.5 top-1.5 bottom-1.5 px-4 sm:px-6 bg-secondary text-on-secondary hover:bg-secondary/90 rounded-lg text-xs font-bold transition-all active:scale-98 flex items-center space-x-1.5"
              >
                <span className="material-symbols-outlined text-[18px]">search</span>
                <span className="hidden sm:inline">Verify</span>
              </button>
            </div>
          </form>

          {/* Quick Presets */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-1 text-xs">
            <span className="text-on-surface-variant text-[11px] font-medium">Quick Audit Presets:</span>
            <button
              type="button"
              onClick={() => handlePresetClick('PS-IND-2025-783920')}
              className="px-2.5 py-1 rounded-md bg-surface-container border border-outline-variant/40 hover:border-primary text-primary font-mono text-[11px] font-bold transition-colors"
            >
              PS-IND-2025-783920 (Pharma)
            </button>
            <button
              type="button"
              onClick={() => handlePresetClick('PS-AGRI-84729')}
              className="px-2.5 py-1 rounded-md bg-surface-container border border-outline-variant/40 hover:border-primary text-primary font-mono text-[11px] font-bold transition-colors"
            >
              PS-AGRI-84729 (Urea Sacks)
            </button>
            <button
              type="button"
              onClick={() => handlePresetClick('RX-99214')}
              className="px-2.5 py-1 rounded-md bg-surface-container border border-outline-variant/40 hover:border-primary text-primary font-mono text-[11px] font-bold transition-colors"
            >
              RX-99214 (Cold-Chain)
            </button>
            <button
              type="button"
              onClick={() => handlePresetClick('PS-IND-2025-884102')}
              className="px-2.5 py-1 rounded-md bg-error-container/60 border border-error/30 hover:border-error text-error font-mono text-[11px] font-bold transition-colors flex items-center space-x-1"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-error animate-ping" />
              <span>PS-IND-2025-884102 (Flagged)</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Metric Cards Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="bg-surface-container-lowest rounded-xl p-4 border border-outline-variant/30 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-on-surface-variant">Total Audited Consignments</span>
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <span className="material-symbols-outlined text-[20px]">local_shipping</span>
            </div>
          </div>
          <div className="text-2xl font-bold text-primary font-headline">4,892,104</div>
          <div className="text-[11px] text-emerald-700 font-medium flex items-center space-x-1">
            <span className="material-symbols-outlined text-[14px]">trending_up</span>
            <span>+12.4% vs previous 30-day cycle</span>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-surface-container-lowest rounded-xl p-4 border border-outline-variant/30 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-on-surface-variant">Certified Compliant Packaging</span>
            <div className="p-2 rounded-lg bg-emerald-100 text-emerald-800">
              <span className="material-symbols-outlined text-[20px]">verified</span>
            </div>
          </div>
          <div className="text-2xl font-bold text-emerald-800 font-headline">98.4%</div>
          <div className="text-[11px] text-on-surface-variant font-medium">
            National Standard Target: 99.0% (BIS QCO)
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-surface-container-lowest rounded-xl p-4 border border-outline-variant/30 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-on-surface-variant">Tamper Discrepancies Flagged</span>
            <div className="p-2 rounded-lg bg-error-container text-error">
              <span className="material-symbols-outlined text-[20px]">report</span>
            </div>
          </div>
          <div className="text-2xl font-bold text-error font-headline">1,429</div>
          <div className="text-[11px] text-error font-medium flex items-center space-x-1">
            <span className="material-symbols-outlined text-[14px]">gavel</span>
            <span>Seizure notice issued under Sec 19(2)</span>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-surface-container-lowest rounded-xl p-4 border border-outline-variant/30 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-on-surface-variant">Active Gateway Checkposts</span>
            <div className="p-2 rounded-lg bg-secondary/10 text-secondary">
              <span className="material-symbols-outlined text-[20px]">toll</span>
            </div>
          </div>
          <div className="text-2xl font-bold text-primary font-headline">1,280</div>
          <div className="text-[11px] text-secondary font-medium flex items-center space-x-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>FastTag & Optical Live Sensor Linked</span>
          </div>
        </div>
      </div>

      {/* Main Split Layout: Audit Stream Table (Left 8 cols) vs Side Panels (Right 4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Consignment Audit Stream */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 shadow-xs overflow-hidden">
            {/* Table Header & Controls */}
            <div className="p-4 border-b border-outline-variant/20 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-sm font-bold text-primary font-headline flex items-center space-x-2">
                  <span>Consignment Audit Stream</span>
                  <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-mono">
                    Live Inter-State Feeds
                  </span>
                </h2>
                <p className="text-[11px] text-on-surface-variant mt-0.5">
                  Showing {filteredConsignments.length} logged transit records across national corridors
                </p>
              </div>

              {/* Filter Tabs */}
              <div className="flex items-center bg-surface-container-low p-0.5 rounded-lg border border-outline-variant/30 text-[11px] font-semibold">
                <button
                  type="button"
                  onClick={() => setActiveFilter('all')}
                  className={`px-2.5 py-1 rounded-md transition-all ${
                    activeFilter === 'all'
                      ? 'bg-surface-container-lowest text-primary shadow-xs font-bold'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  All ({consignments.length})
                </button>
                <button
                  type="button"
                  onClick={() => setActiveFilter('verified')}
                  className={`px-2.5 py-1 rounded-md transition-all ${
                    activeFilter === 'verified'
                      ? 'bg-surface-container-lowest text-emerald-800 shadow-xs font-bold'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  Verified
                </button>
                <button
                  type="button"
                  onClick={() => setActiveFilter('inspecting')}
                  className={`px-2.5 py-1 rounded-md transition-all ${
                    activeFilter === 'inspecting'
                      ? 'bg-surface-container-lowest text-amber-800 shadow-xs font-bold'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  Inspecting
                </button>
                <button
                  type="button"
                  onClick={() => setActiveFilter('flagged')}
                  className={`px-2.5 py-1 rounded-md transition-all ${
                    activeFilter === 'flagged'
                      ? 'bg-surface-container-lowest text-error shadow-xs font-bold'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  Flagged (1)
                </button>
              </div>
            </div>

            {/* Table Container */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-surface-container-low/60 text-on-surface-variant uppercase text-[10px] font-bold tracking-wider border-b border-outline-variant/20">
                  <tr>
                    <th className="py-3 px-4">Consignment UID & Bill</th>
                    <th className="py-3 px-3">Manufacturer & Route</th>
                    <th className="py-3 px-3">Standard / Product</th>
                    <th className="py-3 px-3">Seal Integrity</th>
                    <th className="py-3 px-3">Checkpoint</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/20">
                  {filteredConsignments.map((item) => (
                    <tr
                      key={item.id}
                      className="hover:bg-surface-container-low/40 transition-colors group cursor-pointer"
                      onClick={() => onInspect(item)}
                    >
                      {/* UID & Date */}
                      <td className="py-3 px-4 align-top">
                        <div className="font-mono font-bold text-primary group-hover:text-secondary transition-colors">
                          {item.id}
                        </div>
                        <div className="font-mono text-[10px] text-on-surface-variant">
                          {item.ewayBill}
                        </div>
                        <div className="text-[10px] text-outline mt-0.5">
                          {item.loggedDate}
                        </div>
                      </td>

                      {/* Manufacturer */}
                      <td className="py-3 px-3 align-top max-w-[180px]">
                        <div className="font-semibold text-on-surface truncate" title={item.manufacturer}>
                          {item.manufacturer}
                        </div>
                        <div className="text-[10px] text-on-surface-variant truncate" title={item.transitFrom + ' ➔ ' + item.transitTo}>
                          {item.transitFrom} ➔ {item.transitTo}
                        </div>
                      </td>

                      {/* Standard */}
                      <td className="py-3 px-3 align-top max-w-[160px]">
                        <div className="font-mono text-[11px] font-bold text-primary">
                          {item.standardCode}
                        </div>
                        <div className="text-[10px] text-on-surface-variant truncate" title={item.productName}>
                          {item.productName}
                        </div>
                      </td>

                      {/* Seal Status */}
                      <td className="py-3 px-3 align-top">
                        <span className={`inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                          item.status === 'verified'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                            : item.status === 'flagged'
                            ? 'bg-error-container text-on-error-container border-error/30'
                            : item.status === 'delivered'
                            ? 'bg-blue-50 text-blue-800 border-blue-200'
                            : 'bg-amber-50 text-amber-800 border-amber-300'
                        }`}>
                          <span className="material-symbols-outlined text-[12px]">
                            {item.status === 'verified' ? 'check_circle' : item.status === 'flagged' ? 'warning' : item.status === 'delivered' ? 'done_all' : 'hourglass_top'}
                          </span>
                          <span>{item.sealStatusType.toUpperCase()}</span>
                        </span>
                        <div className="font-mono text-[9px] text-on-surface-variant mt-1 truncate max-w-[120px]">
                          {item.sealTag}
                        </div>
                      </td>

                      {/* Checkpoint */}
                      <td className="py-3 px-3 align-top text-[11px]">
                        <div className="text-on-surface font-medium truncate max-w-[140px]" title={item.checkpointLocation}>
                          {item.checkpointLocation}
                        </div>
                        <div className="text-[10px] text-outline">
                          {item.timestamp}
                        </div>
                      </td>

                      {/* Action */}
                      <td className="py-3 px-4 align-middle text-right">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onInspect(item);
                          }}
                          className="px-2.5 py-1.5 rounded-md bg-surface-container-low hover:bg-primary hover:text-white text-primary border border-outline-variant/40 text-[11px] font-bold transition-all shadow-2xs"
                        >
                          Inspect
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Table Footer */}
            <div className="p-3 bg-surface-container-low/40 border-t border-outline-variant/20 flex items-center justify-between text-xs text-on-surface-variant">
              <span>Showing {filteredConsignments.length} of {consignments.length} consignments</span>
              <button
                type="button"
                onClick={() => onNavigate('consignment-registry')}
                className="font-bold text-secondary hover:underline flex items-center space-x-1"
              >
                <span>View Full Registry & Audit Ledger</span>
                <span className="material-symbols-outlined text-[16px]">chevron_right</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right: Side Cards (Standards Meter, Fast-Track Grievance, Customs Stream) */}
        <div className="lg:col-span-4 space-y-4">
          {/* Card 1: Standards Health Meter */}
          <div className="bg-surface-container-lowest rounded-xl p-5 border border-outline-variant/30 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-outline-variant/20">
              <h3 className="text-xs font-bold text-primary uppercase tracking-wider font-headline">
                Standards Health Meter
              </h3>
              <span className="text-[10px] bg-tertiary-fixed text-on-tertiary-fixed px-2 py-0.5 rounded font-bold">
                IS 16636 Conforming
              </span>
            </div>

            {/* Circular Meter Simulation */}
            <div className="flex items-center space-x-4">
              <div className="relative w-24 h-24 shrink-0 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-surface-container-high"
                    strokeWidth="3.5"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-emerald-600"
                    strokeDasharray="99.1, 100"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute text-center">
                  <div className="text-xl font-bold text-primary font-headline leading-none">99.1%</div>
                  <div className="text-[9px] text-on-surface-variant font-medium">Compliance</div>
                </div>
              </div>
              <div className="text-xs text-on-surface-variant space-y-1">
                <div className="font-semibold text-on-surface">National Quality Score</div>
                <p className="text-[11px] leading-snug">
                  Derived from 1,280 automated optical gates across western, northern and southern freight corridors.
                </p>
              </div>
            </div>

            {/* Parameter Bars */}
            <div className="space-y-2 pt-2 border-t border-outline-variant/20 text-xs">
              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="font-medium text-on-surface">Holographic Optical Seal Integrity</span>
                  <span className="font-bold text-primary font-mono">99.8%</span>
                </div>
                <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
                  <div className="bg-emerald-600 h-full rounded-full" style={{ width: '99.8%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="font-medium text-on-surface">Cryptographic 2D DataMatrix</span>
                  <span className="font-bold text-primary font-mono">98.9%</span>
                </div>
                <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
                  <div className="bg-emerald-600 h-full rounded-full" style={{ width: '98.9%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="font-medium text-on-surface">Drop & Moisture Barrier (IS 2771)</span>
                  <span className="font-bold text-primary font-mono">97.4%</span>
                </div>
                <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
                  <div className="bg-amber-600 h-full rounded-full" style={{ width: '97.4%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="font-medium text-on-surface">Legal Metrology MRP Declaration</span>
                  <span className="font-bold text-primary font-mono">99.5%</span>
                </div>
                <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
                  <div className="bg-emerald-600 h-full rounded-full" style={{ width: '99.5%' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Fast-Track Grievance Desk */}
          <div className="bg-surface-container-lowest rounded-xl p-5 border border-error/30 shadow-xs space-y-3 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-error/5 rounded-bl-full pointer-events-none" />
            <div className="flex items-center space-x-2 text-error">
              <span className="material-symbols-outlined text-[20px]">gavel</span>
              <h3 className="text-xs font-bold uppercase tracking-wider font-headline">
                Fast-Track Grievance Desk
              </h3>
            </div>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Detected tampered packaging, forged BIS ISI marks, or anomalous weight differential? File an immediate statutory complaint under Section 19(2) of the Legal Metrology Act.
            </p>
            <button
              type="button"
              onClick={() => onNavigate('report-violation-or-grievance')}
              className="w-full py-2.5 px-4 rounded-lg bg-error text-white text-xs font-bold hover:bg-error/90 transition-all flex items-center justify-center space-x-2 shadow-xs cursor-pointer active:scale-98"
            >
              <span className="material-symbols-outlined text-[16px]">report_problem</span>
              <span>File Tampered Package Report (Form 4-B)</span>
            </button>
          </div>

          {/* Card 3: Customs Dock Camera Stream */}
          <div className="bg-surface-container-lowest rounded-xl p-4 border border-outline-variant/30 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
                <h3 className="text-xs font-bold text-primary uppercase tracking-wider font-headline">
                  Customs Dock Live Optical Gate
                </h3>
              </div>
              <span className="text-[10px] bg-surface-container text-on-surface-variant px-1.5 py-0.5 rounded font-mono">
                BAY 04 • JNPT
              </span>
            </div>

            <div className="relative rounded-lg overflow-hidden border border-outline-variant/40 bg-black aspect-video group">
              <img
                src={ASSET_IMAGES.dockCamera}
                alt="Customs Dock Camera Feed"
                className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                crossOrigin="anonymous"
              />
              <div className="absolute top-2 left-2 bg-black/75 backdrop-blur-xs text-white text-[9px] font-mono px-2 py-0.5 rounded flex items-center space-x-1">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                <span>REC • FASTSCAN LASER 120 FPS</span>
              </div>
              <div className="absolute bottom-2 left-2 right-2 bg-black/70 backdrop-blur-xs text-white text-[10px] p-1.5 rounded flex items-center justify-between">
                <span className="font-mono truncate">CONTAINER #IN-JNPT-8812</span>
                <span className="text-emerald-400 font-bold text-[9px]">SEAL INTACT</span>
              </div>
            </div>

            <p className="text-[11px] text-on-surface-variant">
              Automated high-speed OCR scanning container bolt seals and BIS holograms at 40 km/h drive-through velocity.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
