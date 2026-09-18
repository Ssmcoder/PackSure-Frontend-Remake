import React, { useState } from 'react';
import { ConsignmentItem, GrievanceFormData } from '../types';
import { ASSET_IMAGES } from '../data/mockData';

interface GrievanceFormViewProps {
  initialConsignment?: ConsignmentItem | null;
  onSubmitSuccess: (docketId: string) => void;
}

export const GrievanceFormView: React.FC<GrievanceFormViewProps> = ({
  initialConsignment,
  onSubmitSuccess,
}) => {
  const [formData, setFormData] = useState<GrievanceFormData>({
    consignmentUid: initialConsignment?.id || 'PS-IND-2025-884102',
    productCategory: 'Industrial Chemicals / Hazardous Solvents',
    batchNo: initialConsignment?.batchLot || 'LOT-NTC-25-4401',
    manufacturerName: initialConsignment?.manufacturer || 'Novatech Chem-Packs Ltd., Ankleshwar GIDC',
    violationCategories: [
      'Compromised / Broken Tamper-Evident Seal Tag',
      'Anomalous Weight Differential (>1.5% Tare/Gross Variance)'
    ],
    severityLevel: 'critical',
    stateJurisdiction: 'Maharashtra (MH)',
    checkpointName: initialConsignment?.checkpointLocation || 'Bhiwandi Inbound Freight Checkpost #09',
    incidentTime: '24 Oct 2025, 08:39 IST',
    incidentDescription:
      'Physical bolt seal tag snapped; weighbridge detected anomalous weight differential (-430 kg). Consignment seized under Section 19(2).',
    reportingRole: 'inspector',
    inspectorPhone: '+91 98190 44210',
    inspectorEmail: 'r.sharma.bis@nic.in',
    isAnonymous: false,
    statutoryDeclaration: true,
  });

  const [docketSuccessId, setDocketSuccessId] = useState<string | null>(null);
  const [trackDocketInput, setTrackDocketInput] = useState('');
  const [trackedResult, setTrackedResult] = useState<string | null>(null);

  const toggleViolation = (item: string) => {
    if (formData.violationCategories.includes(item)) {
      setFormData({
        ...formData,
        violationCategories: formData.violationCategories.filter((v) => v !== item),
      });
    } else {
      setFormData({
        ...formData,
        violationCategories: [...formData.violationCategories, item],
      });
    }
  };

  const handleAutoFillScan = () => {
    setFormData({
      ...formData,
      consignmentUid: 'PS-IND-2025-884102',
      productCategory: 'Industrial Chemicals / Hazardous Solvents',
      batchNo: 'LOT-NTC-25-4401',
      manufacturerName: 'Novatech Chem-Packs Ltd., Ankleshwar GIDC Industrial Estate',
      incidentDescription: 'Scanned optical sensor mismatch: Laser tag 0x7F-BREACH reported tare variance of -430kg at Bhiwandi Bay 3.',
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.statutoryDeclaration) {
      alert('Please check the statutory undertaking declaration before filing.');
      return;
    }

    const newDocketId = `DOCA-MH-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
    setDocketSuccessId(newDocketId);
    onSubmitSuccess(newDocketId);
  };

  const handleTrackDocket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackDocketInput.trim()) return;
    setTrackedResult(`Docket #${trackDocketInput.toUpperCase()}: Active Investigation by Maharashtra Enforcement Wing. Field Officer Insp. K. Salunkhe assigned.`);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Title Bar with Whistleblower Status */}
      <div className="bg-surface-container-low p-5 sm:p-6 rounded-xl border border-outline-variant/30 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs">
        <div>
          <div className="flex items-center space-x-2 text-error mb-1">
            <span className="material-symbols-outlined text-[22px]">gavel</span>
            <span className="text-[11px] font-bold uppercase tracking-wider">
              Enforcement & Vigilance Wing
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-primary font-headline tracking-tight">
            National Anti-Counterfeit & Legal Metrology Enforcement Desk
          </h1>
          <p className="text-xs text-on-surface-variant max-w-2xl mt-1">
            Statutory Form 4-B: Packaging Non-Compliance & Tampering Incident Report under Section 19(2) of the Legal Metrology Act, 2009 and BIS Act, 2016.
          </p>
        </div>

        <div className="flex flex-col sm:items-end justify-center space-y-1 shrink-0">
          <div className="flex items-center space-x-2 bg-error-container text-on-error-container px-3 py-1.5 rounded-full text-xs font-bold border border-error/20">
            <span className="material-symbols-outlined text-[16px]">shield</span>
            <span>Whistleblower Protection Active (Sec 11)</span>
          </div>
          <span className="text-[10px] text-on-surface-variant font-mono">
            Form UID: F4B-IN-2025-VER-2
          </span>
        </div>
      </div>

      {/* 4 Step Progress Indicator */}
      <div className="bg-surface-container-lowest p-3.5 rounded-xl border border-outline-variant/30 shadow-xs">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="flex items-center space-x-2 p-2 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200">
            <span className="w-5 h-5 rounded-full bg-emerald-700 text-white flex items-center justify-center text-[10px] font-bold">✓</span>
            <span className="font-bold text-[11px]">1. Consignment ID</span>
          </div>
          <div className="flex items-center space-x-2 p-2 rounded-lg bg-error-container/60 text-error border border-error/30">
            <span className="w-5 h-5 rounded-full bg-error text-white flex items-center justify-center text-[10px] font-bold">2</span>
            <span className="font-bold text-[11px]">2. Violation Type</span>
          </div>
          <div className="flex items-center space-x-2 p-2 rounded-lg bg-surface-container text-on-surface-variant">
            <span className="w-5 h-5 rounded-full bg-outline-variant text-on-surface flex items-center justify-center text-[10px] font-bold">3</span>
            <span className="font-medium text-[11px]">3. Physical Proof</span>
          </div>
          <div className="flex items-center space-x-2 p-2 rounded-lg bg-surface-container text-on-surface-variant">
            <span className="w-5 h-5 rounded-full bg-outline-variant text-on-surface flex items-center justify-center text-[10px] font-bold">4</span>
            <span className="font-medium text-[11px]">4. Officer Review</span>
          </div>
        </div>
      </div>

      {/* Success Banner when Docket Submitted */}
      {docketSuccessId && (
        <div className="p-6 rounded-xl bg-emerald-950 text-white border border-emerald-700 shadow-xl space-y-3 animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="material-symbols-outlined text-emerald-400 text-[32px]">task_alt</span>
              <div>
                <h3 className="text-lg font-bold font-headline">Statutory Seizure Report Filed Successfully</h3>
                <p className="text-xs text-emerald-200">
                  Transmitted to Central Legal Metrology Enforcement Server & GSTN Interoperability Gate.
                </p>
              </div>
            </div>
            <span className="bg-emerald-800 text-emerald-100 text-xs font-mono font-bold px-3 py-1 rounded">
              STATUS: PENDING SEIZURE EXECUTION
            </span>
          </div>

          <div className="p-4 bg-emerald-900/60 rounded-lg flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
            <div>
              <span className="text-emerald-300 block text-[10px] uppercase font-sans">Official Docket ID</span>
              <strong className="text-base text-white">{docketSuccessId}</strong>
            </div>
            <div>
              <span className="text-emerald-300 block text-[10px] uppercase font-sans">Target Consignment</span>
              <strong className="text-white">{formData.consignmentUid}</strong>
            </div>
            <div>
              <span className="text-emerald-300 block text-[10px] uppercase font-sans">Timestamp</span>
              <span className="text-emerald-100">{new Date().toLocaleString('en-GB')} IST</span>
            </div>
          </div>
        </div>
      )}

      {/* Main Split Layout: Left Form (8 cols) vs Right Sidecar (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Statutory Form 4-B */}
        <div className="lg:col-span-8 bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/30 shadow-xs space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6 text-xs">
            {/* Section 1: Consignment Identifiers */}
            <div className="space-y-3 pb-5 border-b border-outline-variant/20">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-primary uppercase tracking-wider font-headline flex items-center space-x-1.5">
                  <span className="material-symbols-outlined text-[16px] text-secondary">inventory_2</span>
                  <span>1. Consignment & Transit Identifiers</span>
                </h3>
                <button
                  type="button"
                  onClick={handleAutoFillScan}
                  className="text-[11px] font-bold text-secondary hover:underline flex items-center space-x-1"
                >
                  <span className="material-symbols-outlined text-[14px]">qr_code_scanner</span>
                  <span>Auto-Fill from Active Scan / OCR</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-on-surface mb-1">
                    Consignment UID *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.consignmentUid}
                    onChange={(e) => setFormData({ ...formData, consignmentUid: e.target.value })}
                    className="w-full bg-surface border border-outline-variant rounded-lg p-2.5 font-mono text-primary font-bold focus:border-secondary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-on-surface mb-1">
                    Product / Packaging Category
                  </label>
                  <select
                    value={formData.productCategory}
                    onChange={(e) => setFormData({ ...formData, productCategory: e.target.value })}
                    className="w-full bg-surface border border-outline-variant rounded-lg p-2.5 focus:border-secondary focus:outline-none"
                  >
                    <option value="Industrial Chemicals / Hazardous Solvents">Industrial Chemicals / Hazardous Solvents</option>
                    <option value="Pharmaceuticals & Sterile Biologicals">Pharmaceuticals & Sterile Biologicals</option>
                    <option value="Agricultural Commodities & Fertilizers">Agricultural Commodities & Fertilizers</option>
                    <option value="FMCG & Packaged Food Commodities">FMCG & Packaged Food Commodities</option>
                    <option value="Consumer Electronics Packaging">Consumer Electronics Packaging</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-on-surface mb-1">
                    Production Batch / Lot No.
                  </label>
                  <input
                    type="text"
                    value={formData.batchNo}
                    onChange={(e) => setFormData({ ...formData, batchNo: e.target.value })}
                    className="w-full bg-surface border border-outline-variant rounded-lg p-2.5 font-mono focus:border-secondary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-on-surface mb-1">
                    Manufacturer / Bottler Name
                  </label>
                  <input
                    type="text"
                    value={formData.manufacturerName}
                    onChange={(e) => setFormData({ ...formData, manufacturerName: e.target.value })}
                    className="w-full bg-surface border border-outline-variant rounded-lg p-2.5 focus:border-secondary focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Statutory Violation Classification */}
            <div className="space-y-3 pb-5 border-b border-outline-variant/20">
              <h3 className="text-xs font-bold text-primary uppercase tracking-wider font-headline flex items-center space-x-1.5">
                <span className="material-symbols-outlined text-[16px] text-error">warning</span>
                <span>2. Statutory Violation Classification (Select All That Apply)</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[
                  'Missing / Counterfeit BIS ISI Mark (IS 16187:2014)',
                  'Compromised / Broken Tamper-Evident Seal Tag',
                  'Anomalous Weight Differential (>1.5% Tare/Gross Variance)',
                  'Illegible / Mismatched Cryptographic 2D DataMatrix',
                  'Omission of Mandatory Legal Metrology Declarations (MRP/Date)',
                  'Unapproved Recycled Polymer Content / EPR Non-Compliance'
                ].map((violation) => (
                  <label
                    key={violation}
                    className={`flex items-start space-x-2.5 p-3 rounded-lg border cursor-pointer transition-all ${
                      formData.violationCategories.includes(violation)
                        ? 'bg-error-container/20 border-error/50 text-on-surface font-semibold'
                        : 'bg-surface border-outline-variant/30 text-on-surface-variant hover:border-outline-variant'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={formData.violationCategories.includes(violation)}
                      onChange={() => toggleViolation(violation)}
                      className="mt-0.5 rounded text-error focus:ring-error"
                    />
                    <span className="text-[11px] leading-snug">{violation}</span>
                  </label>
                ))}
              </div>

              {/* Severity Level Radios */}
              <div className="pt-2">
                <label className="block font-semibold text-on-surface mb-2">
                  Statutory Severity Rating
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <label className={`p-2.5 rounded-lg border text-center cursor-pointer ${
                    formData.severityLevel === 'routine' ? 'bg-amber-100 border-amber-400 text-amber-900 font-bold' : 'border-outline-variant/40'
                  }`}>
                    <input
                      type="radio"
                      name="severity"
                      className="hidden"
                      checked={formData.severityLevel === 'routine'}
                      onChange={() => setFormData({ ...formData, severityLevel: 'routine' })}
                    />
                    <div className="text-[11px]">Routine Defect (Class-C)</div>
                  </label>
                  <label className={`p-2.5 rounded-lg border text-center cursor-pointer ${
                    formData.severityLevel === 'priority' ? 'bg-orange-100 border-orange-400 text-orange-900 font-bold' : 'border-outline-variant/40'
                  }`}>
                    <input
                      type="radio"
                      name="severity"
                      className="hidden"
                      checked={formData.severityLevel === 'priority'}
                      onChange={() => setFormData({ ...formData, severityLevel: 'priority' })}
                    />
                    <div className="text-[11px]">Commercial Discrepancy (Class-B)</div>
                  </label>
                  <label className={`p-2.5 rounded-lg border text-center cursor-pointer ${
                    formData.severityLevel === 'critical' ? 'bg-error text-white font-bold' : 'border-outline-variant/40'
                  }`}>
                    <input
                      type="radio"
                      name="severity"
                      className="hidden"
                      checked={formData.severityLevel === 'critical'}
                      onChange={() => setFormData({ ...formData, severityLevel: 'critical' })}
                    />
                    <div className="text-[11px]">Critical Seizure Trigger (Class-A)</div>
                  </label>
                </div>
              </div>
            </div>

            {/* Section 3: Checkpoint Discovery & Observations */}
            <div className="space-y-3 pb-5 border-b border-outline-variant/20">
              <h3 className="text-xs font-bold text-primary uppercase tracking-wider font-headline flex items-center space-x-1.5">
                <span className="material-symbols-outlined text-[16px] text-secondary">location_on</span>
                <span>3. Checkpoint Discovery & Field Observations</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-on-surface mb-1">
                    State Jurisdiction
                  </label>
                  <input
                    type="text"
                    value={formData.stateJurisdiction}
                    onChange={(e) => setFormData({ ...formData, stateJurisdiction: e.target.value })}
                    className="w-full bg-surface border border-outline-variant rounded-lg p-2.5 focus:border-secondary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-on-surface mb-1">
                    Checkpoint / Weighbridge Name
                  </label>
                  <input
                    type="text"
                    value={formData.checkpointName}
                    onChange={(e) => setFormData({ ...formData, checkpointName: e.target.value })}
                    className="w-full bg-surface border border-outline-variant rounded-lg p-2.5 focus:border-secondary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-on-surface mb-1">
                    Incident Discovery Time
                  </label>
                  <input
                    type="text"
                    value={formData.incidentTime}
                    onChange={(e) => setFormData({ ...formData, incidentTime: e.target.value })}
                    className="w-full bg-surface border border-outline-variant rounded-lg p-2.5 focus:border-secondary focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-on-surface mb-1">
                  Technical Officer Observations & Seizure Basis *
                </label>
                <textarea
                  rows={3}
                  required
                  value={formData.incidentDescription}
                  onChange={(e) => setFormData({ ...formData, incidentDescription: e.target.value })}
                  placeholder="State physical checkpoint observations in detail (e.g. physical bolt seal tag snapped; weighbridge detected anomalous weight differential of -430 kg)..."
                  className="w-full bg-surface border border-outline-variant rounded-lg p-3 text-xs focus:border-error focus:outline-none font-mono"
                />
              </div>
            </div>

            {/* Section 4: Physical Evidence & Photographic Dossier */}
            <div className="space-y-3 pb-5 border-b border-outline-variant/20">
              <h3 className="text-xs font-bold text-primary uppercase tracking-wider font-headline flex items-center space-x-1.5">
                <span className="material-symbols-outlined text-[16px] text-primary">add_a_photo</span>
                <span>4. Physical Evidence & Photographic Dossier</span>
              </h3>

              {/* Upload Dropzone */}
              <div className="border-2 border-dashed border-outline-variant rounded-xl p-6 text-center hover:border-secondary/60 transition-colors bg-surface-container-low/40">
                <span className="material-symbols-outlined text-[32px] text-outline mx-auto block mb-1">
                  cloud_upload
                </span>
                <div className="font-semibold text-on-surface text-xs">
                  Drag & drop high-resolution photographs of broken seals, blurred ISI marks, or anomalous packaging
                </div>
                <div className="text-[11px] text-on-surface-variant mt-1">
                  Supports JPG, PNG, HEIC up to 25MB with embedded GPS EXIF metadata
                </div>
              </div>

              {/* Attached Proof Thumbnails */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                <div className="rounded-lg overflow-hidden border border-outline-variant/40 bg-surface-container-low relative">
                  <img src={ASSET_IMAGES.sealDocLaserRfid} alt="Evidence 1" className="h-20 w-full object-cover" crossOrigin="anonymous" />
                  <div className="p-1 text-[9px] bg-black/75 text-white font-mono text-center">RFID Tag Snapped</div>
                </div>
                <div className="rounded-lg overflow-hidden border border-outline-variant/40 bg-surface-container-low relative">
                  <img src={ASSET_IMAGES.sealDocBisStamp} alt="Evidence 2" className="h-20 w-full object-cover" crossOrigin="anonymous" />
                  <div className="p-1 text-[9px] bg-black/75 text-white font-mono text-center">Hologram Peel Discrepancy</div>
                </div>
                <div className="rounded-lg overflow-hidden border border-outline-variant/40 bg-surface-container-low relative">
                  <img src={ASSET_IMAGES.sealDocWeighbridge} alt="Evidence 3" className="h-20 w-full object-cover" crossOrigin="anonymous" />
                  <div className="p-1 text-[9px] bg-black/75 text-white font-mono text-center">Weighbridge Loss -430kg</div>
                </div>
              </div>

              {/* Whistleblower Protection Toggle */}
              <div className="p-3.5 rounded-lg bg-surface-container-low border border-outline-variant/40 flex items-center justify-between gap-4 mt-3">
                <div className="space-y-0.5">
                  <div className="font-bold text-xs text-primary flex items-center space-x-1.5">
                    <span className="material-symbols-outlined text-[16px] text-emerald-600">lock</span>
                    <span>Submit as Protected Confidential Whistleblower</span>
                  </div>
                  <p className="text-[11px] text-on-surface-variant">
                    Identity is cryptographically detached from the public registry under Section 11 of the Whistleblower Protection Standard.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, isAnonymous: !formData.isAnonymous })}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    formData.isAnonymous ? 'bg-emerald-600' : 'bg-outline-variant'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                      formData.isAnonymous ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Legal Undertaking Checkbox */}
            <div className="p-3.5 rounded-lg bg-surface-container-low border border-outline-variant/40 flex items-start space-x-3">
              <input
                type="checkbox"
                id="statutory-declaration"
                required
                checked={formData.statutoryDeclaration}
                onChange={(e) => setFormData({ ...formData, statutoryDeclaration: e.target.checked })}
                className="mt-1 rounded text-primary focus:ring-primary cursor-pointer"
              />
              <label htmlFor="statutory-declaration" className="text-[11px] text-on-surface leading-snug cursor-pointer">
                <strong>Statutory Undertaking:</strong> I hereby solemnly declare under Section 177 of the Indian Penal Code that the facts stated above are true to the best of my knowledge and physical examination. This seizure requisition is generated in official capacity under Section 19(2) of the Legal Metrology Act.
              </label>
            </div>

            {/* Submit Action Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <button
                type="button"
                onClick={() => alert('Draft saved to local checkpost cache.')}
                className="px-4 py-2.5 rounded-lg border border-outline-variant text-on-surface font-semibold hover:bg-surface-container transition-all"
              >
                Save Draft to Checkpost Cache
              </button>

              <button
                type="submit"
                className="px-6 py-2.5 rounded-lg bg-error text-white font-bold hover:bg-error/90 transition-all flex items-center space-x-2 shadow-xs cursor-pointer active:scale-98"
              >
                <span className="material-symbols-outlined text-[18px]">gavel</span>
                <span>Submit Statutory Seizure Report (Docket ID)</span>
              </button>
            </div>
          </form>
        </div>

        {/* Right: Sidecar Panel (Satellite In-Transit, Rapid Enforcement, Track Docket) */}
        <div className="lg:col-span-4 space-y-4">
          {/* Card 1: Flagged Shipment In Transit with Satellite Preview */}
          <div className="bg-surface-container-lowest p-5 rounded-xl border border-error/30 shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-outline-variant/20">
              <div className="flex items-center space-x-1.5 text-error">
                <span className="material-symbols-outlined text-[18px]">satellite_alt</span>
                <h3 className="text-xs font-bold uppercase tracking-wider font-headline">
                  Flagged Shipment In Transit
                </h3>
              </div>
              <span className="text-[10px] bg-error-container text-on-error-container font-mono font-bold px-1.5 py-0.5 rounded">
                LIVE GPS
              </span>
            </div>

            <div className="relative rounded-lg overflow-hidden border border-outline-variant/40 aspect-video">
              <img
                src={ASSET_IMAGES.satelliteBhiwandi}
                alt="Satellite Track Bhiwandi"
                className="w-full h-full object-cover"
                crossOrigin="anonymous"
              />
              <div className="absolute inset-0 bg-black/30 pointer-events-none" />
              <div className="absolute top-2 left-2 bg-black/80 text-white text-[9px] font-mono px-2 py-0.5 rounded flex items-center space-x-1">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                <span>19.2965° N, 73.0631° E</span>
              </div>
              <div className="absolute bottom-2 left-2 right-2 bg-black/80 backdrop-blur-xs text-white text-[10px] p-2 rounded">
                <div className="font-bold truncate text-red-300">Bhiwandi Freight Bypass Gate 09</div>
                <div className="text-[9px] text-white/70">Carrier: Tanker Flatbed (MH 04 ER 8820)</div>
              </div>
            </div>

            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Route:</span>
                <span className="font-semibold text-on-surface">Ankleshwar GIDC ➔ Bhiwandi</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Weighbridge Deficit:</span>
                <span className="font-bold text-error font-mono">-430 kg anomalous loss</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Enforcement Action:</span>
                <span className="text-red-700 font-bold">Bay 03 Physical Quarantine</span>
              </div>
            </div>
          </div>

          {/* Card 2: Rapid Enforcement Protocol */}
          <div className="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant/30 shadow-xs space-y-3 text-xs">
            <h3 className="text-xs font-bold text-primary uppercase tracking-wider font-headline flex items-center space-x-1.5 pb-2 border-b border-outline-variant/20">
              <span className="material-symbols-outlined text-[16px] text-secondary">verified_user</span>
              <span>Rapid Enforcement Protocol</span>
            </h3>

            <ol className="space-y-2.5 text-on-surface-variant text-[11px]">
              <li className="flex items-start space-x-2">
                <span className="font-bold text-primary">1.</span>
                <span><strong>Immediate Vehicle Impoundment:</strong> Checkpost FASTag bar barrier remains lowered until clearance.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="font-bold text-primary">2.</span>
                <span><strong>Seal Tag Preservation:</strong> Broken RFID wires preserved in statutory evidentiary poly-bag with wax stamp.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="font-bold text-primary">3.</span>
                <span><strong>Laboratory Sample Request:</strong> Three tamper-proof aliquots dispatched to Regional BIS Reference Lab.</span>
              </li>
            </ol>
          </div>

          {/* Card 3: Track Existing Grievance */}
          <div className="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant/30 shadow-xs space-y-3 text-xs">
            <h3 className="text-xs font-bold text-primary uppercase tracking-wider font-headline flex items-center space-x-1.5 pb-2 border-b border-outline-variant/20">
              <span className="material-symbols-outlined text-[16px] text-primary">manage_search</span>
              <span>Track Existing Grievance</span>
            </h3>

            <form onSubmit={handleTrackDocket} className="space-y-2">
              <input
                type="text"
                placeholder="Enter Docket ID (e.g. DOCA-MH-2025-88412)..."
                value={trackDocketInput}
                onChange={(e) => setTrackDocketInput(e.target.value)}
                className="w-full bg-surface border border-outline-variant rounded-lg p-2 text-xs font-mono focus:border-secondary focus:outline-none"
              />
              <button
                type="submit"
                className="w-full py-2 rounded-lg bg-primary text-white font-bold hover:bg-primary-container text-xs transition-all"
              >
                Track Status
              </button>
            </form>

            {trackedResult && (
              <div className="p-2.5 rounded-lg bg-surface-container-low border border-outline-variant/40 text-[11px] text-on-surface animate-in fade-in">
                {trackedResult}
              </div>
            )}
          </div>

          {/* Card 4: 24x7 Statutory Helplines */}
          <div className="bg-surface-container-low p-4 rounded-xl border border-outline-variant/30 space-y-2 text-xs">
            <div className="font-bold text-primary">Direct Vigilance Channels</div>
            <div className="text-[11px] text-on-surface-variant flex items-center space-x-2">
              <span className="material-symbols-outlined text-[16px] text-emerald-700">call</span>
              <span>Legal Metrology Vigilance: <strong>1800-11-4000</strong></span>
            </div>
            <div className="text-[11px] text-on-surface-variant flex items-center space-x-2">
              <span className="material-symbols-outlined text-[16px] text-emerald-700">chat</span>
              <span>WhatsApp Evidence Line: <strong>+91 98711 01915</strong></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
