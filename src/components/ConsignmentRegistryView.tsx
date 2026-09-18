import React, { useState } from 'react';
import { ConsignmentItem, NavigationPath } from '../types';

interface ConsignmentRegistryViewProps {
  consignments: ConsignmentItem[];
  onSelectConsignment: (item: ConsignmentItem) => void;
  onNavigate: (path: NavigationPath) => void;
  onInspect: (item: ConsignmentItem) => void;
  onOpenNewBatchModal: () => void;
  onDownloadPdf: (item: ConsignmentItem) => void;
  onExportLedger: (format: string) => void;
}

export const ConsignmentRegistryView: React.FC<ConsignmentRegistryViewProps> = ({
  consignments,
  onSelectConsignment,
  onNavigate,
  onInspect,
  onOpenNewBatchModal,
  onDownloadPdf,
  onExportLedger,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStandard, setSelectedStandard] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedOrigin, setSelectedOrigin] = useState('all');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [showExportMenu, setShowExportMenu] = useState(false);

  const filteredItems = consignments.filter((item) => {
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      item.id.toLowerCase().includes(q) ||
      item.ewayBill.toLowerCase().includes(q) ||
      item.manufacturer.toLowerCase().includes(q) ||
      item.productName.toLowerCase().includes(q) ||
      item.sealTag.toLowerCase().includes(q);

    const matchesStandard =
      selectedStandard === 'all' || item.standardCode.includes(selectedStandard);

    const matchesStatus =
      selectedStatus === 'all' || item.status === selectedStatus;

    const matchesOrigin =
      selectedOrigin === 'all' ||
      item.transitFrom.toLowerCase().includes(selectedOrigin.toLowerCase()) ||
      item.manufacturerHub.toLowerCase().includes(selectedOrigin.toLowerCase());

    return matchesSearch && matchesStandard && matchesStatus && matchesOrigin;
  });

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(filteredItems.map((i) => i.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectRow = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedStandard('all');
    setSelectedStatus('all');
    setSelectedOrigin('all');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Ledger Synchronization & Title Bar */}
      <div className="bg-surface-container-low p-5 sm:p-6 rounded-xl border border-outline-variant/30 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-primary font-mono text-[11px] mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>NODE: WEST-04</span>
            <span>•</span>
            <span>BLOCK: #9821-44B</span>
            <span>•</span>
            <span className="text-emerald-700 font-bold">SHA-256 LEDGER SYNCHRONIZED</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-primary font-headline tracking-tight">
            Central Consignment Registry & Batch Audit Trail
          </h1>
          <p className="text-xs text-on-surface-variant max-w-2xl mt-1">
            National Statutory Repository under Bureau of Indian Standards (BIS) & Legal Metrology Act, 2009. Ledger synchronized across 1,280 Inter-State Checkposts.
          </p>
        </div>

        {/* Top Actions */}
        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={onOpenNewBatchModal}
            className="px-3.5 py-2 rounded-lg bg-primary text-white text-xs font-bold hover:bg-primary-container transition-all flex items-center space-x-1.5 shadow-xs cursor-pointer active:scale-98"
          >
            <span className="material-symbols-outlined text-[16px]">add_box</span>
            <span>+ Register New Consignment</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('qr-and-barcode-validator')}
            className="px-3.5 py-2 rounded-lg bg-surface-container-lowest border border-outline-variant text-on-surface text-xs font-bold hover:bg-surface-container transition-all flex items-center space-x-1.5 cursor-pointer active:scale-98"
          >
            <span className="material-symbols-outlined text-[16px]">qr_code_scanner</span>
            <span>Bulk QR Verification</span>
          </button>

          {/* Export Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowExportMenu(!showExportMenu)}
              className="px-3.5 py-2 rounded-lg bg-secondary text-white text-xs font-bold hover:bg-secondary/90 transition-all flex items-center space-x-1.5 shadow-xs cursor-pointer active:scale-98"
            >
              <span className="material-symbols-outlined text-[16px]">download</span>
              <span>Export Statutory Ledger</span>
              <span className="material-symbols-outlined text-[14px]">arrow_drop_down</span>
            </button>

            {showExportMenu && (
              <div className="absolute right-0 mt-1.5 w-48 bg-surface-container-lowest rounded-xl shadow-xl border border-outline-variant/40 py-1.5 z-30 text-xs font-medium">
                <button
                  type="button"
                  onClick={() => {
                    setShowExportMenu(false);
                    onExportLedger('csv');
                  }}
                  className="w-full text-left px-3.5 py-2 hover:bg-surface-container-low flex items-center space-x-2"
                >
                  <span className="material-symbols-outlined text-[16px] text-emerald-600">table_view</span>
                  <span>Export as CSV (.csv)</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowExportMenu(false);
                    onExportLedger('xlsx');
                  }}
                  className="w-full text-left px-3.5 py-2 hover:bg-surface-container-low flex items-center space-x-2"
                >
                  <span className="material-symbols-outlined text-[16px] text-green-700">sheet</span>
                  <span>Export as Excel (.xlsx)</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowExportMenu(false);
                    onExportLedger('pdf');
                  }}
                  className="w-full text-left px-3.5 py-2 hover:bg-surface-container-low flex items-center space-x-2"
                >
                  <span className="material-symbols-outlined text-[16px] text-red-600">picture_as_pdf</span>
                  <span>Official PDF Ledger (.pdf)</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 4 Metric Strip Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/30 shadow-xs space-y-1">
          <span className="text-xs font-semibold text-on-surface-variant">Total Active In-Transit</span>
          <div className="text-2xl font-bold text-primary font-headline">3,841 Consignments</div>
          <div className="text-[11px] text-on-surface-variant">Gross Mass: 142,800 MT</div>
        </div>

        <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/30 shadow-xs space-y-1">
          <span className="text-xs font-semibold text-on-surface-variant">Compliant Batches</span>
          <div className="text-2xl font-bold text-emerald-800 font-headline">98.6% (3,788 Units)</div>
          <div className="text-[11px] text-emerald-700 font-medium">Zero Discrepancy Gate Scans</div>
        </div>

        <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/30 shadow-xs space-y-1">
          <span className="text-xs font-semibold text-on-surface-variant">Quarantined / Flagged</span>
          <div className="text-2xl font-bold text-error font-headline">18 Shipments</div>
          <div className="text-[11px] text-error font-medium">Under Active Sec 19(2) Seizure</div>
        </div>

        <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/30 shadow-xs space-y-1">
          <span className="text-xs font-semibold text-on-surface-variant">Average Clearance Time</span>
          <div className="text-2xl font-bold text-primary font-headline">4.2 Minutes</div>
          <div className="text-[11px] text-secondary font-medium">Gate Optical Speed &lt; 40 km/h</div>
        </div>
      </div>

      {/* Filter & Search Toolbar Console */}
      <div className="bg-surface-container-lowest p-4 sm:p-5 rounded-xl border border-outline-variant/30 shadow-xs space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
          {/* Search Box */}
          <div className="sm:col-span-2 relative">
            <span className="material-symbols-outlined absolute left-3 top-2.5 text-[18px] text-outline">
              search
            </span>
            <input
              type="text"
              placeholder="Search by Consignment UID, E-Way Bill, Manufacturer, or RFID Seal Tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-surface-container-low border border-outline-variant/40 rounded-lg py-2 pl-9 pr-3 text-xs text-on-surface focus:outline-none focus:border-secondary font-medium"
            />
          </div>

          {/* BIS Standard Dropdown */}
          <div>
            <select
              value={selectedStandard}
              onChange={(e) => setSelectedStandard(e.target.value)}
              className="w-full bg-surface-container-low border border-outline-variant/40 rounded-lg p-2 text-xs focus:outline-none focus:border-secondary"
            >
              <option value="all">All Standards (BIS)</option>
              <option value="16636">IS 16636:2023 (Security QR)</option>
              <option value="15410">IS 15410:2020 (Pharma Glass)</option>
              <option value="2771">IS 2771:2018 (Corrugated)</option>
              <option value="16187">IS 16187:2014 (Dangerous Goods)</option>
            </select>
          </div>

          {/* Compliance Status Dropdown */}
          <div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full bg-surface-container-low border border-outline-variant/40 rounded-lg p-2 text-xs focus:outline-none focus:border-secondary"
            >
              <option value="all">All Compliance Statuses</option>
              <option value="verified">Verified Compliant</option>
              <option value="inspecting">In Inspection</option>
              <option value="flagged">Flagged Anomaly</option>
              <option value="delivered">Delivered</option>
            </select>
          </div>

          {/* Origin Hub State */}
          <div>
            <select
              value={selectedOrigin}
              onChange={(e) => setSelectedOrigin(e.target.value)}
              className="w-full bg-surface-container-low border border-outline-variant/40 rounded-lg p-2 text-xs focus:outline-none focus:border-secondary"
            >
              <option value="all">All Origin States</option>
              <option value="Gujarat">Gujarat</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Himachal">Himachal Pradesh</option>
              <option value="Uttar Pradesh">Uttar Pradesh</option>
              <option value="Andhra">Andhra Pradesh</option>
            </select>
          </div>
        </div>

        {/* Active Filter Tags */}
        {(searchQuery || selectedStandard !== 'all' || selectedStatus !== 'all' || selectedOrigin !== 'all') && (
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-outline-variant/20 text-xs">
            <span className="text-[11px] text-on-surface-variant">Active Filters:</span>
            {searchQuery && (
              <span className="bg-surface-container px-2 py-0.5 rounded-full text-[11px] flex items-center space-x-1">
                <span>Search: "{searchQuery}"</span>
                <button type="button" onClick={() => setSearchQuery('')} className="hover:text-error">×</button>
              </span>
            )}
            {selectedStandard !== 'all' && (
              <span className="bg-surface-container px-2 py-0.5 rounded-full text-[11px] flex items-center space-x-1">
                <span>Standard: IS {selectedStandard}</span>
                <button type="button" onClick={() => setSelectedStandard('all')} className="hover:text-error">×</button>
              </span>
            )}
            {selectedStatus !== 'all' && (
              <span className="bg-surface-container px-2 py-0.5 rounded-full text-[11px] flex items-center space-x-1">
                <span>Status: {selectedStatus}</span>
                <button type="button" onClick={() => setSelectedStatus('all')} className="hover:text-error">×</button>
              </span>
            )}
            {selectedOrigin !== 'all' && (
              <span className="bg-surface-container px-2 py-0.5 rounded-full text-[11px] flex items-center space-x-1">
                <span>Origin: {selectedOrigin}</span>
                <button type="button" onClick={() => setSelectedOrigin('all')} className="hover:text-error">×</button>
              </span>
            )}
            <button
              type="button"
              onClick={resetFilters}
              className="text-[11px] text-secondary font-bold hover:underline ml-2"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>

      {/* High-Density Statutory Consignment Table */}
      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-surface-container-low/80 text-on-surface-variant uppercase text-[10px] font-bold tracking-wider border-b border-outline-variant/20">
              <tr>
                <th className="py-3.5 px-3 text-center w-10">
                  <input
                    type="checkbox"
                    checked={selectedIds.length === filteredItems.length && filteredItems.length > 0}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className="rounded text-primary focus:ring-primary"
                  />
                </th>
                <th className="py-3.5 px-3">Consignment UID & E-Way Bill</th>
                <th className="py-3.5 px-3">Manufacturer & Origin Hub</th>
                <th className="py-3.5 px-3">Destination Consignee</th>
                <th className="py-3.5 px-3">Standard / Product</th>
                <th className="py-3.5 px-3">Seal Status & RFID Tag</th>
                <th className="py-3.5 px-3">Transit Route & Progress</th>
                <th className="py-3.5 px-3">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20">
              {filteredItems.map((item) => {
                const isSelected = selectedIds.includes(item.id);
                return (
                  <tr
                    key={item.id}
                    className={`hover:bg-surface-container-low/40 transition-colors ${
                      isSelected ? 'bg-primary/5' : ''
                    }`}
                  >
                    {/* Checkbox */}
                    <td className="py-3.5 px-3 text-center align-middle">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleSelectRow(item.id)}
                        className="rounded text-primary focus:ring-primary"
                      />
                    </td>

                    {/* UID & E-Way Bill */}
                    <td className="py-3.5 px-3 align-top">
                      <button
                        type="button"
                        onClick={() => {
                          onSelectConsignment(item);
                          onNavigate('quick-verify');
                        }}
                        className="font-mono font-bold text-primary hover:text-secondary text-left transition-colors block"
                      >
                        {item.id}
                      </button>
                      <div className="font-mono text-[10px] text-on-surface-variant">
                        {item.ewayBill}
                      </div>
                      <div className="text-[10px] text-outline mt-0.5">
                        {item.loggedDate}
                      </div>
                    </td>

                    {/* Manufacturer */}
                    <td className="py-3.5 px-3 align-top max-w-[170px]">
                      <div className="font-semibold text-on-surface truncate" title={item.manufacturer}>
                        {item.manufacturer}
                      </div>
                      <div className="text-[10px] text-on-surface-variant truncate" title={item.manufacturerHub}>
                        {item.manufacturerHub}
                      </div>
                      <div className="text-[9px] font-mono text-outline mt-0.5">
                        {item.manufacturerReg}
                      </div>
                    </td>

                    {/* Destination */}
                    <td className="py-3.5 px-3 align-top max-w-[160px]">
                      <div className="font-medium text-on-surface truncate" title={item.destination}>
                        {item.destination}
                      </div>
                      <div className="text-[10px] text-on-surface-variant">
                        {item.netQuantity}
                      </div>
                    </td>

                    {/* Standard / Product */}
                    <td className="py-3.5 px-3 align-top max-w-[170px]">
                      <span className="inline-block bg-primary/10 text-primary font-mono font-bold text-[10px] px-1.5 py-0.2 rounded">
                        {item.standardCode}
                      </span>
                      <div className="text-[11px] text-on-surface font-medium truncate mt-0.5" title={item.productName}>
                        {item.productName}
                      </div>
                      <div className="text-[9px] font-mono text-outline">
                        Lot: {item.batchLot}
                      </div>
                    </td>

                    {/* Seal Status & RFID Tag */}
                    <td className="py-3.5 px-3 align-top">
                      <div className="flex items-center space-x-1">
                        <span className={`w-2 h-2 rounded-full ${
                          item.sealStatusType === 'intact'
                            ? 'bg-emerald-600'
                            : item.sealStatusType === 'breached'
                            ? 'bg-red-600 animate-ping'
                            : 'bg-amber-500'
                        }`} />
                        <span className={`text-[10px] font-bold ${
                          item.sealStatusType === 'intact'
                            ? 'text-emerald-800'
                            : item.sealStatusType === 'breached'
                            ? 'text-error font-extrabold'
                            : 'text-amber-800'
                        }`}>
                          {item.sealStatusType.toUpperCase()}
                        </span>
                      </div>
                      <div className="font-mono text-[10px] text-on-surface-variant mt-0.5">
                        {item.sealTag}
                      </div>
                    </td>

                    {/* Route Transit Progress */}
                    <td className="py-3.5 px-3 align-top min-w-[130px]">
                      <div className="flex justify-between text-[10px] font-mono text-on-surface-variant mb-1">
                        <span>{item.transitProgress}%</span>
                        <span className="truncate max-w-[80px]">{item.transitCheckpoint}</span>
                      </div>
                      <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            item.status === 'flagged' ? 'bg-error' : 'bg-primary'
                          }`}
                          style={{ width: `${item.transitProgress}%` }}
                        />
                      </div>
                    </td>

                    {/* Compliance Status Badge */}
                    <td className="py-3.5 px-3 align-middle">
                      <span className={`inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                        item.status === 'verified'
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                          : item.status === 'flagged'
                          ? 'bg-error-container text-on-error-container border-error/30'
                          : item.status === 'delivered'
                          ? 'bg-blue-50 text-blue-800 border-blue-200'
                          : 'bg-amber-50 text-amber-800 border-amber-300'
                      }`}>
                        <span>{item.status.toUpperCase()}</span>
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 align-middle text-right">
                      <div className="flex items-center justify-end space-x-1">
                        <button
                          type="button"
                          onClick={() => onInspect(item)}
                          title="Inspect Statutory Dossier"
                          className="p-1.5 rounded-md hover:bg-surface-container text-primary hover:text-secondary transition-colors"
                        >
                          <span className="material-symbols-outlined text-[18px]">visibility</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => onDownloadPdf(item)}
                          title="Download Certificate (PDF)"
                          className="p-1.5 rounded-md hover:bg-surface-container text-on-surface-variant hover:text-primary transition-colors"
                        >
                          <span className="material-symbols-outlined text-[18px]">download</span>
                        </button>
                        {item.status === 'flagged' ? (
                          <button
                            type="button"
                            onClick={() => onNavigate('report-violation-or-grievance')}
                            title="File Seizure Notice"
                            className="p-1.5 rounded-md bg-error text-white hover:bg-error/90 transition-colors"
                          >
                            <span className="material-symbols-outlined text-[18px]">gavel</span>
                          </button>
                        ) : null}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination & Footer Controls */}
        <div className="p-4 bg-surface-container-low/60 border-t border-outline-variant/20 flex flex-wrap items-center justify-between gap-3 text-xs text-on-surface-variant">
          <div className="flex items-center space-x-3">
            <span>Showing 1 to {filteredItems.length} of {consignments.length} Consignments</span>
            <span>•</span>
            <div className="flex items-center space-x-1.5">
              <span>Rows per page:</span>
              <select className="bg-surface-container-lowest border border-outline-variant/40 rounded px-1.5 py-0.5 text-xs">
                <option>10</option>
                <option>25</option>
                <option>50</option>
              </select>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              type="button"
              disabled
              className="px-2.5 py-1 rounded border border-outline-variant/30 text-outline cursor-not-allowed text-[11px]"
            >
              Previous
            </button>
            <span className="px-2.5 py-1 rounded bg-primary text-white text-[11px] font-bold">1</span>
            <button
              type="button"
              disabled
              className="px-2.5 py-1 rounded border border-outline-variant/30 text-outline cursor-not-allowed text-[11px]"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Statutory Protection Legal Notice Footer */}
      <div className="bg-surface-container-low p-4 rounded-xl border border-outline-variant/30 flex items-start space-x-3 text-xs text-on-surface-variant">
        <span className="material-symbols-outlined text-primary text-[20px] shrink-0 mt-0.5">
          gavel
        </span>
        <div className="space-y-1">
          <div className="font-bold text-primary">
            Statutory Data Integrity & IT Act 2000 Protection
          </div>
          <p className="text-[11px] leading-relaxed">
            Under Section 43 of the Information Technology Act 2000 and Section 36 of the Legal Metrology Act, unauthorized alteration, deletion, or digital spoofing of registered consignment ledger entries constitutes a cognizable offense punishable with rigorous imprisonment up to 3 years and statutory fines.
          </p>
        </div>
      </div>
    </div>
  );
};
