import React, { useState } from 'react';
import { ConsignmentItem, NavigationPath } from '../types';
import { ASSET_IMAGES } from '../data/mockData';

interface QuickVerifyViewProps {
  consignment: ConsignmentItem;
  onNavigate: (path: NavigationPath) => void;
  onPrintPass: (item: ConsignmentItem) => void;
  onDownloadPdf: (item: ConsignmentItem) => void;
}

export const QuickVerifyView: React.FC<QuickVerifyViewProps> = ({
  consignment,
  onNavigate,
  onPrintPass,
  onDownloadPdf,
}) => {
  const [showAnomalyModal, setShowAnomalyModal] = useState(false);
  const [anomalyReason, setAnomalyReason] = useState('Broken / Compromised Seal Tag');
  const [anomalyNotes, setAnomalyNotes] = useState('');

  const handleAnomalySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowAnomalyModal(false);
    onNavigate('report-violation-or-grievance');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Banner: Government Certified Compliant Packaging */}
      <div className={`rounded-xl p-6 sm:p-8 text-white relative overflow-hidden shadow-md ${
        consignment.status === 'flagged'
          ? 'bg-linear-to-r from-red-900 via-red-800 to-red-950 border border-red-600'
          : 'bg-linear-to-r from-primary via-primary-container to-[#0b2447] border border-primary-fixed-dim/30'
      }`}>
        {/* Background Emblem Watermark */}
        <div className="absolute -right-10 -bottom-10 opacity-10 pointer-events-none">
          <span className="material-symbols-outlined text-[260px]">verified_user</span>
        </div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start space-x-4">
            <div className={`p-3 sm:p-4 rounded-2xl flex items-center justify-center shrink-0 shadow-inner ${
              consignment.status === 'flagged' ? 'bg-red-700/80 text-white' : 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/40'
            }`}>
              <span className="material-symbols-outlined text-[36px] sm:text-[44px]">
                {consignment.status === 'flagged' ? 'gavel' : 'verified_user'}
              </span>
            </div>
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                  consignment.status === 'flagged'
                    ? 'bg-red-500 text-white'
                    : 'bg-emerald-400 text-emerald-950 font-extrabold'
                }`}>
                  {consignment.status === 'flagged' ? 'DISCREPANCY FLAGGED' : 'GOVERNMENT CERTIFIED COMPLIANT PACKAGING'}
                </span>
                <span className="text-white/60 text-xs font-mono">
                  Ledger Block #9821-44B
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight font-headline">
                {consignment.id}
              </h1>
              <div className="text-xs text-white/80 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono">
                <span>E-Way Bill: <strong className="text-white">{consignment.ewayBill}</strong></span>
                <span>•</span>
                <span>Logged: <strong className="text-white">{consignment.loggedDate}</strong></span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:items-end justify-center space-y-1.5 shrink-0 bg-white/10 backdrop-blur-xs p-3.5 rounded-xl border border-white/15">
            <div className="text-[11px] text-white/80 uppercase font-medium">Compliance Verdict</div>
            <div className="flex items-center space-x-2 text-emerald-300 font-bold text-sm">
              <span className="material-symbols-outlined text-[20px]">task_alt</span>
              <span>{consignment.status === 'flagged' ? 'SEIZURE ORDER ACTIVE' : 'ALL 18 STATUTORY PARAMETERS PASS'}</span>
            </div>
            <div className="text-[10px] text-white/70">
              Valid For Transit Across All Indian States & UTs
            </div>
          </div>
        </div>
      </div>

      {/* Authenticated Consignment Profile: 4 Specification Cards */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-primary font-headline uppercase tracking-wider flex items-center space-x-2">
            <span className="material-symbols-outlined text-[18px] text-secondary">badge</span>
            <span>Authenticated Consignment Profile</span>
          </h2>
          <span className="text-xs text-on-surface-variant font-mono">
            Audit Checkpoint #14 (NH-48 Haryana)
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Manufacturer & Route */}
          <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/30 shadow-xs space-y-3">
            <div className="flex items-center space-x-2 text-primary pb-2 border-b border-outline-variant/20">
              <span className="material-symbols-outlined text-[18px] text-secondary">factory</span>
              <h3 className="text-xs font-bold uppercase tracking-wider font-headline">Manufacturer & Route</h3>
            </div>
            <div className="space-y-2 text-xs">
              <div>
                <span className="text-[10px] text-on-surface-variant block uppercase font-bold">Shipper / Licensee</span>
                <strong className="text-on-surface text-xs block leading-tight">{consignment.manufacturer}</strong>
                <span className="text-[11px] text-on-surface-variant">{consignment.manufacturerHub}</span>
              </div>
              <div>
                <span className="text-[10px] text-on-surface-variant block uppercase font-bold">Consignee Hub</span>
                <strong className="text-on-surface text-xs block leading-tight">{consignment.destination}</strong>
              </div>
              <div>
                <span className="text-[10px] text-on-surface-variant block uppercase font-bold">Transit Carrier</span>
                <span className="text-[11px] font-mono text-primary font-medium">{consignment.transportMode || 'Dedicated Reefer Truck (DL 1GC 8821)'}</span>
              </div>
            </div>
          </div>

          {/* Card 2: BIS Standard & Material */}
          <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/30 shadow-xs space-y-3">
            <div className="flex items-center space-x-2 text-primary pb-2 border-b border-outline-variant/20">
              <span className="material-symbols-outlined text-[18px] text-primary">policy</span>
              <h3 className="text-xs font-bold uppercase tracking-wider font-headline">BIS Standard & Material</h3>
            </div>
            <div className="space-y-2 text-xs">
              <div>
                <span className="text-[10px] text-on-surface-variant block uppercase font-bold">Packaging Standard</span>
                <span className="inline-block bg-primary/10 text-primary font-mono font-bold text-xs px-2 py-0.5 rounded">
                  {consignment.standardCode}
                </span>
                <span className="text-[11px] text-on-surface-variant block mt-0.5">{consignment.standardName}</span>
              </div>
              <div>
                <span className="text-[10px] text-on-surface-variant block uppercase font-bold">Primary Barrier Material</span>
                <strong className="text-on-surface text-xs block leading-tight">{consignment.productName}</strong>
              </div>
              <div>
                <span className="text-[10px] text-on-surface-variant block uppercase font-bold">Regulatory Class</span>
                <span className="text-[11px] text-on-surface font-medium">{consignment.standardClass || 'Schedule M Class III Compliant'}</span>
              </div>
            </div>
          </div>

          {/* Card 3: Tamper-Evident Seals */}
          <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/30 shadow-xs space-y-3">
            <div className="flex items-center space-x-2 text-primary pb-2 border-b border-outline-variant/20">
              <span className="material-symbols-outlined text-[18px] text-emerald-700">security</span>
              <h3 className="text-xs font-bold uppercase tracking-wider font-headline">Tamper-Evident Seals</h3>
            </div>
            <div className="space-y-2 text-xs">
              <div>
                <span className="text-[10px] text-on-surface-variant block uppercase font-bold">Primary Seal Tag</span>
                <span className="font-mono font-bold text-xs text-primary block">{consignment.sealTag}</span>
                <span className="text-[11px] text-on-surface-variant">{consignment.sealStatusText}</span>
              </div>
              <div>
                <span className="text-[10px] text-on-surface-variant block uppercase font-bold">Optical Seal Integrity</span>
                <span className={`inline-flex items-center space-x-1 font-bold text-[11px] ${
                  consignment.sealStatusType === 'intact' ? 'text-emerald-700' : 'text-error'
                }`}>
                  <span className="material-symbols-outlined text-[14px]">
                    {consignment.sealStatusType === 'intact' ? 'check_circle' : 'warning'}
                  </span>
                  <span>{consignment.sealStatusType === 'intact' ? 'INTACT (Zero Micro-Fissures)' : 'BREACH DETECTED'}</span>
                </span>
              </div>
              <div>
                <span className="text-[10px] text-on-surface-variant block uppercase font-bold">Last Scanned Station</span>
                <span className="text-[11px] text-on-surface font-medium">{consignment.checkpointLocation}</span>
              </div>
            </div>
          </div>

          {/* Card 4: Legal Metrology Declarations */}
          <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/30 shadow-xs space-y-3">
            <div className="flex items-center space-x-2 text-primary pb-2 border-b border-outline-variant/20">
              <span className="material-symbols-outlined text-[18px] text-secondary">scale</span>
              <h3 className="text-xs font-bold uppercase tracking-wider font-headline">Legal Metrology Declarations</h3>
            </div>
            <div className="space-y-2 text-xs">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-[10px] text-on-surface-variant block uppercase font-bold">Net Quantity</span>
                  <strong className="text-on-surface text-[11px] block">{consignment.netQuantity}</strong>
                </div>
                <div>
                  <span className="text-[10px] text-on-surface-variant block uppercase font-bold">Gross Mass</span>
                  <strong className="text-on-surface text-[11px] block">{consignment.grossQuantity}</strong>
                </div>
              </div>
              <div>
                <span className="text-[10px] text-on-surface-variant block uppercase font-bold">Declared MRP</span>
                <strong className="text-on-surface text-xs block">{consignment.mrp || '₹ 1,850.00 / Master Pack'}</strong>
              </div>
              <div>
                <span className="text-[10px] text-on-surface-variant block uppercase font-bold">Batch & Expiry</span>
                <span className="text-[11px] font-mono text-on-surface">Lot: {consignment.batchLot} | Exp: {consignment.expiryDate || '03/2028'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Checkpoint Physical Evidence & Government QR Seal */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Physical Seal Documentation at Checkpoint (8 cols) */}
        <div className="lg:col-span-8 bg-surface-container-lowest p-5 rounded-xl border border-outline-variant/30 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-outline-variant/20">
            <div className="flex items-center space-x-2">
              <span className="material-symbols-outlined text-[20px] text-primary">photo_library</span>
              <h3 className="text-xs font-bold text-primary uppercase tracking-wider font-headline">
                Physical Seal Documentation at Checkpoint
              </h3>
            </div>
            <span className="text-[10px] bg-surface-container text-on-surface-variant font-mono px-2 py-0.5 rounded">
              Gate-4 High-Res Capture
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Photo 1: Laser RFID */}
            <div className="rounded-lg overflow-hidden border border-outline-variant/40 bg-surface-container-low group">
              <div className="h-44 overflow-hidden relative">
                <img
                  src={ASSET_IMAGES.sealDocLaserRfid}
                  alt="Laser-Etched Bolt Seal"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  crossOrigin="anonymous"
                />
                <div className="absolute top-2 left-2 bg-black/75 text-white text-[9px] font-mono px-2 py-0.5 rounded">
                  CAM 01 • RFID BOLT
                </div>
              </div>
              <div className="p-3 bg-surface-container-lowest space-y-1">
                <div className="text-xs font-bold text-on-surface">Laser RFID Bolt Seal Tag</div>
                <p className="text-[10px] text-on-surface-variant leading-snug">
                  Electronic tamper wire continuity verified. Zero bypass detected.
                </p>
                <div className="text-[10px] text-emerald-700 font-bold flex items-center space-x-1 pt-1">
                  <span className="material-symbols-outlined text-[13px]">check_circle</span>
                  <span>ID Match: SEAL-IND-882104-Z</span>
                </div>
              </div>
            </div>

            {/* Photo 2: BIS Stamp */}
            <div className="rounded-lg overflow-hidden border border-outline-variant/40 bg-surface-container-low group">
              <div className="h-44 overflow-hidden relative">
                <img
                  src={ASSET_IMAGES.sealDocBisStamp}
                  alt="BIS Holographic Security Stamp"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  crossOrigin="anonymous"
                />
                <div className="absolute top-2 left-2 bg-black/75 text-white text-[9px] font-mono px-2 py-0.5 rounded">
                  CAM 02 • HOLOGRAM
                </div>
              </div>
              <div className="p-3 bg-surface-container-lowest space-y-1">
                <div className="text-xs font-bold text-on-surface">BIS Holographic Security Label</div>
                <p className="text-[10px] text-on-surface-variant leading-snug">
                  Micro-optical kinematic refraction verified under 405nm ultraviolet gate.
                </p>
                <div className="text-[10px] text-emerald-700 font-bold flex items-center space-x-1 pt-1">
                  <span className="material-symbols-outlined text-[13px]">check_circle</span>
                  <span>IS 16636:2023 Conforming</span>
                </div>
              </div>
            </div>

            {/* Photo 3: Weighbridge */}
            <div className="rounded-lg overflow-hidden border border-outline-variant/40 bg-surface-container-low group">
              <div className="h-44 overflow-hidden relative">
                <img
                  src={ASSET_IMAGES.sealDocWeighbridge}
                  alt="Weighbridge Automated Scan"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  crossOrigin="anonymous"
                />
                <div className="absolute top-2 left-2 bg-black/75 text-white text-[9px] font-mono px-2 py-0.5 rounded">
                  SCALE #14 • SENSOR
                </div>
              </div>
              <div className="p-3 bg-surface-container-lowest space-y-1">
                <div className="text-xs font-bold text-on-surface">Automated Tare & Gross Weighbridge</div>
                <p className="text-[10px] text-on-surface-variant leading-snug">
                  Axle mass 480.50 kg aligns with E-Way Bill bill-of-lading (±0.02% error).
                </p>
                <div className="text-[10px] text-emerald-700 font-bold flex items-center space-x-1 pt-1">
                  <span className="material-symbols-outlined text-[13px]">check_circle</span>
                  <span>Weight Verified (Zero Pilferage)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Government Cryptographic QR Seal (4 cols) */}
        <div className="lg:col-span-4 bg-surface-container-lowest p-5 rounded-xl border border-outline-variant/30 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-outline-variant/20">
              <h3 className="text-xs font-bold text-primary uppercase tracking-wider font-headline">
                Government Cryptographic QR Seal
              </h3>
              <span className="material-symbols-outlined text-emerald-600 text-[18px]">verified</span>
            </div>

            {/* QR Visual representation */}
            <div className="mt-4 flex flex-col items-center justify-center p-4 bg-surface-container-low rounded-xl border border-outline-variant/30">
              <div className="relative p-2 bg-white rounded-lg shadow-sm">
                {/* SVG 2D QR Code Matrix Representation */}
                <svg className="w-36 h-36" viewBox="0 0 100 100" fill="currentColor">
                  {/* Outer corner markers */}
                  <rect x="5" y="5" width="25" height="25" fill="#002046" />
                  <rect x="9" y="9" width="17" height="17" fill="#ffffff" />
                  <rect x="13" y="13" width="9" height="9" fill="#002046" />

                  <rect x="70" y="5" width="25" height="25" fill="#002046" />
                  <rect x="74" y="9" width="17" height="17" fill="#ffffff" />
                  <rect x="78" y="13" width="9" height="9" fill="#002046" />

                  <rect x="5" y="70" width="25" height="25" fill="#002046" />
                  <rect x="9" y="74" width="17" height="17" fill="#ffffff" />
                  <rect x="13" y="78" width="9" height="9" fill="#002046" />

                  {/* High density DataMatrix pixels */}
                  <rect x="35" y="10" width="6" height="6" fill="#002046" />
                  <rect x="45" y="15" width="6" height="6" fill="#002046" />
                  <rect x="55" y="10" width="6" height="6" fill="#002046" />
                  <rect x="40" y="25" width="6" height="6" fill="#002046" />
                  <rect x="50" y="25" width="6" height="6" fill="#002046" />

                  <rect x="10" y="35" width="6" height="6" fill="#002046" />
                  <rect x="25" y="40" width="6" height="6" fill="#002046" />
                  <rect x="15" y="50" width="6" height="6" fill="#002046" />
                  <rect x="25" y="55" width="6" height="6" fill="#002046" />

                  {/* Center Emblem circle */}
                  <circle cx="50" cy="50" r="14" fill="#fc6018" />
                  <circle cx="50" cy="50" r="10" fill="#ffffff" />
                  <circle cx="50" cy="50" r="5" fill="#002046" />

                  <rect x="70" y="35" width="6" height="6" fill="#002046" />
                  <rect x="80" y="40" width="6" height="6" fill="#002046" />
                  <rect x="75" y="50" width="6" height="6" fill="#002046" />
                  <rect x="85" y="55" width="6" height="6" fill="#002046" />

                  <rect x="35" y="70" width="6" height="6" fill="#002046" />
                  <rect x="45" y="75" width="6" height="6" fill="#002046" />
                  <rect x="55" y="80" width="6" height="6" fill="#002046" />
                  <rect x="40" y="85" width="6" height="6" fill="#002046" />
                  <rect x="60" y="70" width="6" height="6" fill="#002046" />
                </svg>
              </div>

              <div className="mt-3 text-center space-y-1">
                <span className="text-[10px] font-mono text-on-surface-variant block">
                  SHA-256 SIGNATURE:
                </span>
                <span className="font-mono text-xs font-bold text-primary block">
                  {consignment.cryptoProof || '0x7F89B44A291E9012'}
                </span>
                <span className="inline-block bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  ACTIVE & AUTHENTIC
                </span>
              </div>
            </div>
          </div>

          <div className="bg-surface-container-low p-3 rounded-lg border border-outline-variant/30 space-y-1 text-xs">
            <div className="flex justify-between">
              <span className="text-on-surface-variant">Gate Inspector:</span>
              <strong className="text-on-surface">{consignment.officerName || 'Insp. R. Sharma'}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-on-surface-variant">Inspector Badge ID:</span>
              <span className="font-mono text-primary font-bold">{consignment.officerId || 'BIS-INSP-HR-048'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-on-surface-variant">Security Protocol:</span>
              <span className="text-emerald-700 font-bold">ECC200 Level-5</span>
            </div>
          </div>
        </div>
      </div>

      {/* Consignment Transit & Verification Lifecycle Stepper */}
      <div className="bg-surface-container-lowest p-5 sm:p-6 rounded-xl border border-outline-variant/30 shadow-xs space-y-5">
        <div className="flex items-center justify-between pb-2 border-b border-outline-variant/20">
          <div className="flex items-center space-x-2">
            <span className="material-symbols-outlined text-[20px] text-primary">alt_route</span>
            <h3 className="text-xs font-bold text-primary uppercase tracking-wider font-headline">
              Consignment Transit & Verification Lifecycle
            </h3>
          </div>
          <span className="text-xs text-on-surface-variant font-mono">
            {consignment.transitProgress}% Route Completed
          </span>
        </div>

        {/* 4 Step Process Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 relative">
          {/* Step 1 */}
          <div className="relative pl-6 sm:pl-0 sm:text-center space-y-1.5">
            <div className="sm:mx-auto w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
              <span className="material-symbols-outlined text-[18px]">check</span>
            </div>
            <div className="font-bold text-xs text-on-surface">1. Dispatched from Hub</div>
            <div className="text-[11px] text-on-surface-variant">{consignment.transitFrom}</div>
            <div className="text-[10px] text-outline font-mono">24 Oct, 06:15 IST</div>
          </div>

          {/* Step 2 */}
          <div className="relative pl-6 sm:pl-0 sm:text-center space-y-1.5">
            <div className="sm:mx-auto w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xs ring-4 ring-primary/20 shadow-xs">
              <span className="material-symbols-outlined text-[18px]">qr_code_scanner</span>
            </div>
            <div className="font-bold text-xs text-primary">2. Optical Gate Audit</div>
            <div className="text-[11px] text-on-surface font-semibold">{consignment.checkpointLocation}</div>
            <div className="text-[10px] text-emerald-700 font-mono font-bold">24 Oct, 08:30 IST (Pass)</div>
          </div>

          {/* Step 3 */}
          <div className="relative pl-6 sm:pl-0 sm:text-center space-y-1.5 opacity-60">
            <div className="sm:mx-auto w-8 h-8 rounded-full bg-surface-container-high text-on-surface-variant flex items-center justify-center font-bold text-xs border border-outline-variant">
              3
            </div>
            <div className="font-bold text-xs text-on-surface">3. Regional Sorting Hub</div>
            <div className="text-[11px] text-on-surface-variant">Delhi-NCR Central Hub</div>
            <div className="text-[10px] text-outline font-mono">Est. 24 Oct, 13:00 IST</div>
          </div>

          {/* Step 4 */}
          <div className="relative pl-6 sm:pl-0 sm:text-center space-y-1.5 opacity-60">
            <div className="sm:mx-auto w-8 h-8 rounded-full bg-surface-container-high text-on-surface-variant flex items-center justify-center font-bold text-xs border border-outline-variant">
              4
            </div>
            <div className="font-bold text-xs text-on-surface">4. Destination Offload</div>
            <div className="text-[11px] text-on-surface-variant">{consignment.destination}</div>
            <div className="text-[10px] text-outline font-mono">Pending Delivery OTP</div>
          </div>
        </div>
      </div>

      {/* Action Footer Panel */}
      <div className="bg-surface-container-low p-4 sm:p-5 rounded-xl border border-outline-variant/40 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h4 className="text-xs font-bold text-primary font-headline">Statutory Verification Desk Actions</h4>
          <p className="text-[11px] text-on-surface-variant">
            Authorized officers can print checkpoint inspection passes, download compliance certificates, or report packaging defects.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Report Anomaly CTA */}
          <button
            type="button"
            onClick={() => setShowAnomalyModal(true)}
            className="px-4 py-2 rounded-lg bg-error text-white text-xs font-bold hover:bg-error/90 transition-all flex items-center space-x-1.5 shadow-xs cursor-pointer active:scale-98"
          >
            <span className="material-symbols-outlined text-[16px]">flag</span>
            <span>Report Packaging Anomaly</span>
          </button>

          {/* Print Pass */}
          <button
            type="button"
            onClick={() => onPrintPass(consignment)}
            className="px-4 py-2 rounded-lg bg-surface-container-lowest border border-outline-variant text-on-surface text-xs font-bold hover:bg-surface-container transition-all flex items-center space-x-1.5 cursor-pointer active:scale-98"
          >
            <span className="material-symbols-outlined text-[16px]">print</span>
            <span>Print Official QR Inspection Pass</span>
          </button>

          {/* Download PDF */}
          <button
            type="button"
            onClick={() => onDownloadPdf(consignment)}
            className="px-4 py-2 rounded-lg bg-secondary text-white text-xs font-bold hover:bg-secondary/90 transition-all flex items-center space-x-1.5 shadow-xs cursor-pointer active:scale-98"
          >
            <span className="material-symbols-outlined text-[16px]">download</span>
            <span>Download Verified Certificate (PDF)</span>
          </button>
        </div>
      </div>

      {/* Quick Anomaly Report Modal Dialog */}
      {showAnomalyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-surface-container-lowest rounded-xl max-w-lg w-full p-6 shadow-2xl border border-error/30">
            <div className="flex items-center space-x-2 text-error pb-3 border-b border-outline-variant/30">
              <span className="material-symbols-outlined text-[24px]">report_problem</span>
              <h3 className="font-bold text-base font-headline">Report Packaging Anomaly</h3>
            </div>

            <form onSubmit={handleAnomalySubmit} className="mt-4 space-y-4 text-xs">
              <p className="text-on-surface-variant">
                Reporting an anomaly will flag consignment <strong>{consignment.id}</strong> in the Central Registry and initiate Form 4-B under Section 19(2) of the Legal Metrology Act.
              </p>

              <div>
                <label className="block font-semibold text-on-surface mb-1">
                  Primary Anomaly Type *
                </label>
                <select
                  value={anomalyReason}
                  onChange={(e) => setAnomalyReason(e.target.value)}
                  className="w-full bg-surface border border-outline-variant rounded-lg p-2.5 focus:outline-none focus:border-error text-xs"
                >
                  <option value="Broken / Compromised Seal Tag">Broken / Compromised Bolt or RFID Seal Tag</option>
                  <option value="Counterfeit BIS Hologram">Suspected Counterfeit BIS ISI Hologram</option>
                  <option value="Weighbridge Discrepancy">Weighbridge Discrepancy / Significant Tare Loss</option>
                  <option value="Barcode Mismatch">2D DataMatrix Hash Mismatch against Central Database</option>
                  <option value="Missing Legal Metrology MRP">Missing MRP, Manufacturing Date, or Consumer Address</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-on-surface mb-1">
                  Officer Inspection Remarks
                </label>
                <textarea
                  rows={3}
                  value={anomalyNotes}
                  onChange={(e) => setAnomalyNotes(e.target.value)}
                  placeholder="Provide physical checkpoint observations (e.g. secondary tear on left seam, unsealed master carton)..."
                  className="w-full bg-surface border border-outline-variant rounded-lg p-2.5 focus:outline-none focus:border-error text-xs"
                />
              </div>

              <div className="flex items-center justify-end space-x-3 pt-3 border-t border-outline-variant/30">
                <button
                  type="button"
                  onClick={() => setShowAnomalyModal(false)}
                  className="px-4 py-2 rounded-lg border border-outline-variant text-on-surface font-semibold hover:bg-surface-container-low"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-error text-white font-bold hover:bg-error/90 shadow-xs"
                >
                  Proceed to Form 4-B Desk
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
