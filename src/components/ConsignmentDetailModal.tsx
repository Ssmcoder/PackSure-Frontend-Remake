import React from 'react';
import { ConsignmentItem } from '../types';
import { ASSET_IMAGES } from '../data/mockData';

interface ConsignmentDetailModalProps {
  item: ConsignmentItem | null;
  isOpen: boolean;
  onClose: () => void;
  onViewQuickVerify: (item: ConsignmentItem) => void;
  onFlagAnomaly: (item: ConsignmentItem) => void;
  onDownloadPdf: (item: ConsignmentItem) => void;
  onPrintPass: (item: ConsignmentItem) => void;
}

export const ConsignmentDetailModal: React.FC<ConsignmentDetailModalProps> = ({
  item,
  isOpen,
  onClose,
  onViewQuickVerify,
  onFlagAnomaly,
  onDownloadPdf,
  onPrintPass
}) => {
  if (!isOpen || !item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-surface-container-lowest rounded-xl max-w-3xl w-full p-6 shadow-2xl border border-outline-variant/40 max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-start justify-between pb-4 border-b border-outline-variant/30">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-base font-bold text-primary font-headline">
                Consignment Statutory Audit Dossier
              </span>
              <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border ${
                item.status === 'verified'
                  ? 'bg-tertiary-fixed text-on-tertiary-fixed border-tertiary-fixed-dim'
                  : item.status === 'flagged'
                  ? 'bg-error-container text-on-error-container border-error/30'
                  : item.status === 'delivered'
                  ? 'bg-surface-container-high text-primary border-outline-variant'
                  : 'bg-amber-100 text-amber-900 border-amber-300'
              }`}>
                {item.status.toUpperCase()}
              </span>
            </div>
            <div className="flex items-center space-x-3 mt-1 text-xs text-on-surface-variant font-mono">
              <span>UID: <strong className="text-on-surface">{item.id}</strong></span>
              <span>•</span>
              <span>E-Way Bill: <strong className="text-on-surface">{item.ewayBill}</strong></span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-on-surface-variant hover:text-on-surface p-1 rounded-md"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="mt-5 space-y-5 text-xs">
          {/* Top Alert / Verification Verdict */}
          <div className={`p-4 rounded-lg border flex items-center justify-between ${
            item.status === 'flagged'
              ? 'bg-error-container/30 border-error/40 text-on-error-container'
              : 'bg-tertiary-fixed/20 border-tertiary-container/30 text-on-surface'
          }`}>
            <div className="flex items-center space-x-3">
              <span className={`material-symbols-outlined text-[24px] ${
                item.status === 'flagged' ? 'text-error' : 'text-emerald-700'
              }`}>
                {item.status === 'flagged' ? 'warning' : 'verified'}
              </span>
              <div>
                <div className="font-bold text-sm">
                  {item.status === 'flagged' 
                    ? 'STATUTORY SEIZURE / ANOMALY WARNING'
                    : 'CERTIFIED COMPLIANT WITH PACKAGING RULES'}
                </div>
                <div className="text-[11px] opacity-80">
                  {item.telemetryNotes}
                </div>
              </div>
            </div>
            <div className="text-right font-mono text-[11px] hidden sm:block">
              <div className="text-on-surface-variant font-sans">Cryptographic Hash</div>
              <div className="text-primary font-bold">{item.cryptoProof || '0x7F89B...44A291'}</div>
            </div>
          </div>

          {/* Grid of 4 Detail Panels */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Panel 1: Manufacturer & Route */}
            <div className="p-3.5 rounded-lg bg-surface-container-low border border-outline-variant/30 space-y-2">
              <div className="font-bold text-primary flex items-center space-x-1.5 pb-1 border-b border-outline-variant/20">
                <span className="material-symbols-outlined text-[16px] text-secondary">factory</span>
                <span>Manufacturer & Dispatch</span>
              </div>
              <div className="space-y-1">
                <div><span className="text-on-surface-variant">Shipper:</span> <strong className="text-on-surface block">{item.manufacturer}</strong></div>
                <div><span className="text-on-surface-variant">Hub:</span> {item.manufacturerHub}</div>
                <div><span className="text-on-surface-variant">Consignee:</span> <strong className="text-on-surface block">{item.destination}</strong></div>
              </div>
            </div>

            {/* Panel 2: Product & BIS Standard */}
            <div className="p-3.5 rounded-lg bg-surface-container-low border border-outline-variant/30 space-y-2">
              <div className="font-bold text-primary flex items-center space-x-1.5 pb-1 border-b border-outline-variant/20">
                <span className="material-symbols-outlined text-[16px] text-primary">policy</span>
                <span>Standard & Commodity</span>
              </div>
              <div className="space-y-1">
                <div><span className="text-on-surface-variant">Product:</span> <strong className="text-on-surface block">{item.productName}</strong></div>
                <div><span className="text-on-surface-variant">Standard:</span> <span className="bg-primary/10 text-primary font-bold px-1.5 py-0.5 rounded font-mono text-[11px]">{item.standardCode}</span> ({item.standardName})</div>
                <div><span className="text-on-surface-variant">Batch / Lot:</span> <span className="font-mono">{item.batchLot}</span></div>
              </div>
            </div>

            {/* Panel 3: Quantities & Packaging Mass */}
            <div className="p-3.5 rounded-lg bg-surface-container-low border border-outline-variant/30 space-y-2">
              <div className="font-bold text-primary flex items-center space-x-1.5 pb-1 border-b border-outline-variant/20">
                <span className="material-symbols-outlined text-[16px] text-secondary">scale</span>
                <span>Weights & Legal Metrology</span>
              </div>
              <div className="space-y-1">
                <div><span className="text-on-surface-variant">Net Quantity:</span> <strong className="text-on-surface">{item.netQuantity}</strong></div>
                <div><span className="text-on-surface-variant">Gross Mass:</span> <strong className="text-on-surface">{item.grossQuantity}</strong></div>
                <div><span className="text-on-surface-variant">MRP Declared:</span> <strong className="text-on-surface">{item.mrp || '₹ 1,850.00'}</strong></div>
                <div><span className="text-on-surface-variant">Expiry Date:</span> {item.expiryDate || 'March 2028'}</div>
              </div>
            </div>

            {/* Panel 4: Physical Tamper Seal & Checkpoint */}
            <div className="p-3.5 rounded-lg bg-surface-container-low border border-outline-variant/30 space-y-2">
              <div className="font-bold text-primary flex items-center space-x-1.5 pb-1 border-b border-outline-variant/20">
                <span className="material-symbols-outlined text-[16px] text-emerald-700">security</span>
                <span>Tamper-Evident Security Seal</span>
              </div>
              <div className="space-y-1">
                <div><span className="text-on-surface-variant">Seal Tag ID:</span> <span className="font-mono font-bold text-primary">{item.sealTag}</span></div>
                <div><span className="text-on-surface-variant">Seal Status:</span> <strong className="text-on-surface">{item.sealStatusText}</strong></div>
                <div><span className="text-on-surface-variant">Logged At:</span> {item.checkpointLocation}</div>
                <div><span className="text-on-surface-variant">Timestamp:</span> {item.timestamp}</div>
              </div>
            </div>
          </div>

          {/* Checkpoint Photographic Proof Documentation */}
          <div>
            <div className="font-bold text-xs text-primary mb-2 flex items-center space-x-1.5">
              <span className="material-symbols-outlined text-[16px]">photo_camera</span>
              <span>Checkpoint Photographic Evidence Stream</span>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-lg overflow-hidden border border-outline-variant/40 bg-black/5">
                <img
                  src={ASSET_IMAGES.sealDocLaserRfid}
                  alt="Laser RFID Bolt Seal"
                  className="h-24 w-full object-cover"
                  crossOrigin="anonymous"
                />
                <div className="p-1.5 bg-surface-container-lowest text-[10px] text-center font-medium truncate">
                  Laser RFID Tag Check
                </div>
              </div>
              <div className="rounded-lg overflow-hidden border border-outline-variant/40 bg-black/5">
                <img
                  src={ASSET_IMAGES.sealDocBisStamp}
                  alt="BIS Stamp Verification"
                  className="h-24 w-full object-cover"
                  crossOrigin="anonymous"
                />
                <div className="p-1.5 bg-surface-container-lowest text-[10px] text-center font-medium truncate">
                  BIS Holographic Seal
                </div>
              </div>
              <div className="rounded-lg overflow-hidden border border-outline-variant/40 bg-black/5">
                <img
                  src={ASSET_IMAGES.sealDocWeighbridge}
                  alt="Weighbridge Automated Scan"
                  className="h-24 w-full object-cover"
                  crossOrigin="anonymous"
                />
                <div className="p-1.5 bg-surface-container-lowest text-[10px] text-center font-medium truncate">
                  Weighbridge & Tare Scan
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Controls Footer */}
        <div className="mt-6 pt-4 border-t border-outline-variant/30 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={() => onFlagAnomaly(item)}
              className="px-3 py-2 rounded-lg bg-error text-white font-semibold hover:bg-error/90 flex items-center space-x-1.5"
            >
              <span className="material-symbols-outlined text-[16px]">flag</span>
              <span>File Anomaly (Form 4-B)</span>
            </button>
            <button
              type="button"
              onClick={() => onPrintPass(item)}
              className="px-3 py-2 rounded-lg border border-outline-variant text-on-surface font-semibold hover:bg-surface-container-low flex items-center space-x-1.5"
            >
              <span className="material-symbols-outlined text-[16px]">print</span>
              <span>Print Inspection Pass</span>
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={() => onDownloadPdf(item)}
              className="px-3 py-2 rounded-lg bg-secondary text-white font-semibold hover:bg-secondary/90 flex items-center space-x-1.5"
            >
              <span className="material-symbols-outlined text-[16px]">download</span>
              <span>Statutory Certificate (PDF)</span>
            </button>
            <button
              type="button"
              onClick={() => {
                onViewQuickVerify(item);
                onClose();
              }}
              className="px-4 py-2 rounded-lg bg-primary text-white font-semibold hover:bg-primary-container flex items-center space-x-1.5 shadow-xs"
            >
              <span>Open in Quick Verify</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
