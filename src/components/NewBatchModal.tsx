import React, { useState } from 'react';
import { ConsignmentItem } from '../types';

interface NewBatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (item: ConsignmentItem) => void;
}

export const NewBatchModal: React.FC<NewBatchModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    id: `PS-IND-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`,
    ewayBill: `EB-2025-${Math.floor(1000000000 + Math.random() * 9000000000)}`,
    manufacturer: '',
    manufacturerHub: '',
    destination: '',
    productName: '',
    standardCode: 'IS 16636:2023',
    standardName: 'Anti-Counterfeit Holographic QR & Tamper Packaging',
    batchLot: `LOT-${Math.floor(1000 + Math.random() * 9000)}-${new Date().getFullYear()}`,
    netQuantity: '5,000 Units',
    grossQuantity: '320.00 kg',
    checkpointLocation: 'Delhi-NCR Central Logistics Gate 01',
    sealTag: `SEAL-DL-${Math.floor(10000 + Math.random() * 90000)}-S`
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.manufacturer || !formData.productName) {
      alert('Please fill in Manufacturer and Product Name');
      return;
    }

    const newItem: ConsignmentItem = {
      id: formData.id,
      ewayBill: formData.ewayBill,
      loggedDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) + ', Just Now',
      manufacturer: formData.manufacturer,
      manufacturerHub: formData.manufacturerHub || 'Industrial Area, India',
      manufacturerReg: `BIS-REG-NEW-${Math.floor(10000 + Math.random() * 90000)}`,
      destination: formData.destination || 'Central Distribution Hub, India',
      productName: formData.productName,
      standardCode: formData.standardCode,
      standardName: formData.standardName,
      standardClass: 'Schedule M / BIS Class II',
      batchLot: formData.batchLot,
      netQuantity: formData.netQuantity,
      grossQuantity: formData.grossQuantity,
      sealTag: formData.sealTag,
      sealStatusText: 'Laser RFID Bolt Seal Initialized & Verified',
      sealStatusType: 'intact',
      checkpointLocation: formData.checkpointLocation,
      checkpointLane: 'Inbound Verification Lane 01',
      timestamp: new Date().toLocaleTimeString('en-GB') + ' IST',
      status: 'verified',
      transitFrom: formData.manufacturerHub || 'Origin Hub',
      transitTo: formData.destination || 'Destination Hub',
      transitProgress: 15,
      transitCheckpoint: 'Origin Gateway Gate 1',
      telemetryNotes: 'Registered into National Ledger with cryptographic SHA-256 seal.',
      temperature: 'Ambient (24°C)',
      cryptoProof: `0x${Math.random().toString(16).substring(2, 10).toUpperCase()}...${Math.random().toString(16).substring(2, 6).toUpperCase()}`
    };

    onSubmit(newItem);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-surface-container-lowest rounded-xl max-w-2xl w-full p-6 shadow-2xl border border-outline-variant/40 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-outline-variant/30">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 bg-primary text-white rounded-lg">
              <span className="material-symbols-outlined text-[20px]">post_add</span>
            </div>
            <div>
              <h3 className="text-base font-bold text-primary font-headline">
                Statutory Consignment Registration
              </h3>
              <p className="text-xs text-on-surface-variant">
                Form BIS-CONSIGN-1A: E-Way Bill & Tamper Seal Entry
              </p>
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

        <form onSubmit={handleSubmit} className="mt-5 space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-on-surface mb-1">
                Generated Consignment UID
              </label>
              <input
                type="text"
                readOnly
                value={formData.id}
                className="w-full bg-surface-container-low border border-outline-variant/50 rounded-lg px-3 py-2 font-mono text-primary font-bold cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block font-semibold text-on-surface mb-1">
                GSTN E-Way Bill Number *
              </label>
              <input
                type="text"
                required
                value={formData.ewayBill}
                onChange={(e) => setFormData({ ...formData, ewayBill: e.target.value })}
                className="w-full bg-surface border border-outline-variant rounded-lg px-3 py-2 font-mono focus:border-secondary focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-on-surface mb-1">
                Licensed Manufacturer / Shipper *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Apex Pharma Packaging Ltd."
                value={formData.manufacturer}
                onChange={(e) => setFormData({ ...formData, manufacturer: e.target.value })}
                className="w-full bg-surface border border-outline-variant rounded-lg px-3 py-2 focus:border-secondary focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-semibold text-on-surface mb-1">
                Manufacturing Plant / SEZ Hub
              </label>
              <input
                type="text"
                placeholder="e.g. Baddi Industrial Area, HP"
                value={formData.manufacturerHub}
                onChange={(e) => setFormData({ ...formData, manufacturerHub: e.target.value })}
                className="w-full bg-surface border border-outline-variant rounded-lg px-3 py-2 focus:border-secondary focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-on-surface mb-1">
              Consignment Product Description *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Sterile Glass Vials 50ml Type I Borosilicate with Holographic Seals"
              value={formData.productName}
              onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
              className="w-full bg-surface border border-outline-variant rounded-lg px-3 py-2 focus:border-secondary focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-on-surface mb-1">
                Mandatory BIS Packaging Standard
              </label>
              <select
                value={formData.standardCode}
                onChange={(e) => {
                  const val = e.target.value;
                  let name = 'Anti-Counterfeit Holographic QR & Tamper Packaging';
                  if (val === 'IS 15410:2020') name = 'Pharmaceutical Packaging Materials';
                  if (val === 'IS 2771:2018') name = 'Corrugated Fibreboard Packaging';
                  if (val === 'IS 16187:2014') name = 'Dangerous Goods IBC Packaging';
                  setFormData({ ...formData, standardCode: val, standardName: name });
                }}
                className="w-full bg-surface border border-outline-variant rounded-lg px-3 py-2 focus:border-secondary focus:outline-none"
              >
                <option value="IS 16636:2023">IS 16636:2023 - Security Holographic QR & Tamper Seal</option>
                <option value="IS 15410:2020">IS 15410:2020 - Pharmaceutical Packaging</option>
                <option value="IS 2771:2018">IS 2771:2018 - Corrugated Fiberboard Packaging</option>
                <option value="IS 16187:2014">IS 16187:2014 - Hazardous Goods IBC Standard</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold text-on-surface mb-1">
                Production Batch / Lot Number
              </label>
              <input
                type="text"
                value={formData.batchLot}
                onChange={(e) => setFormData({ ...formData, batchLot: e.target.value })}
                className="w-full bg-surface border border-outline-variant rounded-lg px-3 py-2 font-mono focus:border-secondary focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-semibold text-on-surface mb-1">
                Quantity & Package Units
              </label>
              <input
                type="text"
                value={formData.netQuantity}
                onChange={(e) => setFormData({ ...formData, netQuantity: e.target.value })}
                className="w-full bg-surface border border-outline-variant rounded-lg px-3 py-2 focus:border-secondary focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-semibold text-on-surface mb-1">
                Gross Mass (kg / MT)
              </label>
              <input
                type="text"
                value={formData.grossQuantity}
                onChange={(e) => setFormData({ ...formData, grossQuantity: e.target.value })}
                className="w-full bg-surface border border-outline-variant rounded-lg px-3 py-2 focus:border-secondary focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-semibold text-on-surface mb-1">
                RFID / Laser Seal Tag
              </label>
              <input
                type="text"
                value={formData.sealTag}
                onChange={(e) => setFormData({ ...formData, sealTag: e.target.value })}
                className="w-full bg-surface border border-outline-variant rounded-lg px-3 py-2 font-mono focus:border-secondary focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-on-surface mb-1">
              Destination Consignee Hub
            </label>
            <input
              type="text"
              placeholder="e.g. Apollo Central Distribution Hub, Greater Noida, UP"
              value={formData.destination}
              onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
              className="w-full bg-surface border border-outline-variant rounded-lg px-3 py-2 focus:border-secondary focus:outline-none"
            />
          </div>

          <div className="bg-surface-container-low p-3 rounded-lg border border-outline-variant/40 flex items-start space-x-2 text-[11px] text-on-surface-variant">
            <span className="material-symbols-outlined text-[16px] text-primary shrink-0 mt-0.5">verified_user</span>
            <span>
              By registering, this consignment entry will be cryptographically hashed and anchored into the National Central Ledger (NIC Node SHA-256) for checkpoint automated gate verification.
            </span>
          </div>

          <div className="flex items-center justify-end space-x-3 pt-3 border-t border-outline-variant/30">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-outline-variant text-on-surface font-semibold hover:bg-surface-container-low"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-primary text-white font-semibold hover:bg-primary-container shadow-xs active:scale-98"
            >
              Sign & Anchor Consignment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
