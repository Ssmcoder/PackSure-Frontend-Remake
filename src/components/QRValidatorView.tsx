import React, { useState } from 'react';
import { ConsignmentItem } from '../types';

interface QRValidatorViewProps {
  consignments: ConsignmentItem[];
  onSelectConsignment: (item: ConsignmentItem) => void;
  onNavigateToQuickVerify: () => void;
}

export const QRValidatorView: React.FC<QRValidatorViewProps> = ({
  consignments,
  onSelectConsignment,
  onNavigateToQuickVerify,
}) => {
  const [inputCode, setInputCode] = useState('010890123456789010LOTBPL2025992141728033121SNIND99201');
  const [isScanning, setIsScanning] = useState(false);
  const [verificationResult, setVerificationResult] = useState<{
    status: 'valid' | 'invalid' | 'breached';
    matchedItem?: ConsignmentItem;
    hash?: string;
    decodedGS1?: {
      gtin: string;
      batch: string;
      expiry: string;
      serial: string;
    };
  } | null>({
    status: 'valid',
    matchedItem: consignments[0],
    hash: '0x7F89B44A291E9012A34901BF',
    decodedGS1: {
      gtin: '08901234567890 (GS1 India Reg)',
      batch: 'LOT-BPL-2025-99214',
      expiry: '31/03/2028',
      serial: 'SN-IND-99201'
    }
  });

  const handleSimulateScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setVerificationResult({
        status: 'valid',
        matchedItem: consignments[0],
        hash: '0x7F89B44A291E9012A34901BF',
        decodedGS1: {
          gtin: '08901234567890 (GS1 India Reg)',
          batch: 'LOT-BPL-2025-99214',
          expiry: '31/03/2028',
          serial: 'SN-IND-99201'
        }
      });
    }, 1200);
  };

  const handleManualVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCode.trim()) return;

    if (inputCode.includes('884102') || inputCode.includes('FLAG') || inputCode.includes('BREACH')) {
      setVerificationResult({
        status: 'breached',
        matchedItem: consignments.find((c) => c.status === 'flagged'),
        hash: '0xFLAGGED_HASH_MISMATCH',
        decodedGS1: {
          gtin: '08909988112233 (Discrepancy)',
          batch: 'LOT-NTC-25-4401',
          expiry: '31/12/2026',
          serial: 'SN-BREACH-001'
        }
      });
    } else {
      const matched = consignments.find((c) =>
        c.id.toLowerCase().includes(inputCode.toLowerCase()) ||
        c.batchLot.toLowerCase().includes(inputCode.toLowerCase())
      ) || consignments[0];

      setVerificationResult({
        status: 'valid',
        matchedItem: matched,
        hash: '0x992B1...12C884',
        decodedGS1: {
          gtin: '08901234567890 (GS1 India)',
          batch: matched.batchLot,
          expiry: matched.expiryDate || 'March 2028',
          serial: `SN-IND-${Math.floor(10000 + Math.random() * 90000)}`
        }
      });
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-surface-container-low p-5 sm:p-6 rounded-xl border border-outline-variant/30 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-primary text-xs font-mono mb-1">
            <span className="material-symbols-outlined text-[16px] text-secondary">qr_code_scanner</span>
            <span>GS1 DATAMATRIX & BIS ECC200 CRYPTOGRAPHIC ENGINE</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-primary font-headline tracking-tight">
            High-Speed 2D DataMatrix & QR Seal Validator
          </h1>
          <p className="text-xs text-on-surface-variant max-w-2xl mt-1">
            Optical scan simulation and cryptographic signature verification against the National NIC Central SHA-256 Ledger for inter-state checkpoint validation.
          </p>
        </div>

        <button
          type="button"
          onClick={handleSimulateScan}
          disabled={isScanning}
          className="px-4 py-2.5 rounded-lg bg-primary text-white text-xs font-bold hover:bg-primary-container transition-all flex items-center space-x-2 shadow-xs shrink-0 cursor-pointer active:scale-98 disabled:opacity-50"
        >
          <span className="material-symbols-outlined text-[18px]">
            {isScanning ? 'sync' : 'videocam'}
          </span>
          <span>{isScanning ? 'Scanning Gate Stream...' : 'Simulate Optical Camera Scan'}</span>
        </button>
      </div>

      {/* Main Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Input Console & Scanner Viewport */}
        <div className="lg:col-span-6 bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/30 shadow-xs space-y-4">
          <h2 className="text-xs font-bold text-primary uppercase tracking-wider font-headline">
            Optical Gate & Decryption Console
          </h2>

          {/* Camera Viewport Simulation */}
          <div className="relative aspect-video rounded-xl bg-black overflow-hidden flex items-center justify-center border border-outline-variant">
            <div className="absolute inset-0 bg-radial from-transparent to-black/80" />
            
            {/* Viewfinder Reticle */}
            <div className="relative w-48 h-48 border-2 border-emerald-400 rounded-lg flex items-center justify-center">
              <div className="absolute top-0 left-0 w-4 h-4 border-t-4 border-l-4 border-emerald-400 -mt-1 -ml-1" />
              <div className="absolute top-0 right-0 w-4 h-4 border-t-4 border-r-4 border-emerald-400 -mt-1 -mr-1" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-4 border-l-4 border-emerald-400 -mb-1 -ml-1" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-4 border-r-4 border-emerald-400 -mb-1 -mr-1" />

              {/* Animated Laser Scanning Line */}
              <div className={`absolute left-0 right-0 h-0.5 bg-emerald-400 shadow-[0_0_8px_#34d399] ${
                isScanning ? 'animate-bounce' : 'top-1/2'
              }`} />

              <span className="text-[10px] font-mono text-emerald-400/80 bg-black/60 px-2 py-0.5 rounded">
                AIM AT GS1 DATAMATRIX
              </span>
            </div>

            <div className="absolute bottom-3 left-3 right-3 flex justify-between text-[10px] text-white/80 font-mono">
              <span>FPS: 60 • ISO 15415</span>
              <span>ALGORITHM: ECC200 LEVEL-5</span>
            </div>
          </div>

          {/* Manual Payload Input */}
          <form onSubmit={handleManualVerify} className="space-y-3 pt-2">
            <label className="block text-xs font-semibold text-on-surface">
              Manual Raw QR Payload / String Input:
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value)}
                placeholder="Enter raw GS1 encoded string or Consignment UID..."
                className="w-full bg-surface-container-low border border-outline-variant/50 rounded-lg px-3 py-2 text-xs font-mono focus:border-secondary focus:outline-none"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-secondary text-white font-bold text-xs rounded-lg hover:bg-secondary/90 transition-all shrink-0 cursor-pointer"
              >
                Validate
              </button>
            </div>
            <div className="flex flex-wrap gap-2 text-[11px] text-on-surface-variant">
              <span>Try test payloads:</span>
              <button
                type="button"
                onClick={() => setInputCode('010890123456789010LOTBPL2025992141728033121SNIND99201')}
                className="text-primary font-mono font-bold hover:underline"
              >
                Pharma IS 15410
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={() => setInputCode('FLAG_TAMPER_SEAL_BREACH_884102')}
                className="text-error font-mono font-bold hover:underline"
              >
                Breached Seal Payload
              </button>
            </div>
          </form>
        </div>

        {/* Right: Decoded Specification & Cryptographic Signature */}
        <div className="lg:col-span-6 bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/30 shadow-xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-outline-variant/20">
            <h2 className="text-xs font-bold text-primary uppercase tracking-wider font-headline">
              Decrypted Payload & Verification Status
            </h2>
            {verificationResult && (
              <span className={`px-2.5 py-1 rounded-full text-xs font-bold flex items-center space-x-1 ${
                verificationResult.status === 'valid'
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-error-container text-on-error-container'
              }`}>
                <span className="material-symbols-outlined text-[14px]">
                  {verificationResult.status === 'valid' ? 'verified' : 'error'}
                </span>
                <span>{verificationResult.status === 'valid' ? 'AUTHENTIC QR SEAL' : 'VERIFICATION FAILED'}</span>
              </span>
            )}
          </div>

          {verificationResult && (
            <div className="space-y-4 text-xs">
              {/* Hash Verification Box */}
              <div className={`p-3.5 rounded-lg border ${
                verificationResult.status === 'valid'
                  ? 'bg-emerald-50/50 border-emerald-300 text-on-surface'
                  : 'bg-error-container/40 border-error/40 text-on-error-container'
              }`}>
                <div className="flex justify-between font-mono text-[11px] mb-1">
                  <span className="text-on-surface-variant font-sans">Ledger Cryptographic Proof:</span>
                  <span className="font-bold text-primary">{verificationResult.hash}</span>
                </div>
                <div className="text-[11px] text-on-surface-variant">
                  {verificationResult.status === 'valid'
                    ? 'Cryptographic signature anchored into National NIC Block #9821-44B. Digital certificate verified.'
                    : 'CRITICAL ALERT: Digital signature mismatch or non-existent in Central Ledger. Suspected counterfeit packaging.'}
                </div>
              </div>

              {/* Decoded GS1 Elements */}
              {verificationResult.decodedGS1 && (
                <div className="space-y-2">
                  <div className="font-bold text-primary text-xs uppercase tracking-wider">
                    Decoded GS1 Application Identifiers (AI)
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                    <div className="p-2.5 rounded-lg bg-surface-container-low border border-outline-variant/30">
                      <span className="text-[10px] text-on-surface-variant block font-sans">[01] GTIN</span>
                      <strong className="text-on-surface text-[11px]">{verificationResult.decodedGS1.gtin}</strong>
                    </div>
                    <div className="p-2.5 rounded-lg bg-surface-container-low border border-outline-variant/30">
                      <span className="text-[10px] text-on-surface-variant block font-sans">[10] Batch / Lot</span>
                      <strong className="text-on-surface text-[11px]">{verificationResult.decodedGS1.batch}</strong>
                    </div>
                    <div className="p-2.5 rounded-lg bg-surface-container-low border border-outline-variant/30">
                      <span className="text-[10px] text-on-surface-variant block font-sans">[17] Expiration Date</span>
                      <strong className="text-on-surface text-[11px]">{verificationResult.decodedGS1.expiry}</strong>
                    </div>
                    <div className="p-2.5 rounded-lg bg-surface-container-low border border-outline-variant/30">
                      <span className="text-[10px] text-on-surface-variant block font-sans">[21] Serial Unit</span>
                      <strong className="text-on-surface text-[11px]">{verificationResult.decodedGS1.serial}</strong>
                    </div>
                  </div>
                </div>
              )}

              {/* Matched Consignment Card */}
              {verificationResult.matchedItem && (
                <div className="p-3.5 rounded-lg bg-surface-container-low border border-outline-variant/30 space-y-2">
                  <div className="font-bold text-primary flex items-center justify-between">
                    <span>Matched Consignment Record</span>
                    <span className="font-mono text-xs">{verificationResult.matchedItem.id}</span>
                  </div>
                  <div className="text-[11px] text-on-surface-variant">
                    {verificationResult.matchedItem.manufacturer} • {verificationResult.matchedItem.productName}
                  </div>
                  <div className="pt-2 flex items-center justify-end">
                    <button
                      type="button"
                      onClick={() => {
                        onSelectConsignment(verificationResult.matchedItem!);
                        onNavigateToQuickVerify();
                      }}
                      className="px-3 py-1.5 rounded-lg bg-primary text-white font-bold text-xs hover:bg-primary-container flex items-center space-x-1 shadow-xs"
                    >
                      <span>View Full Profile in Quick Verify</span>
                      <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
