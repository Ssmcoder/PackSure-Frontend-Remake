import React, { useState } from 'react';
import { NavigationPath, ConsignmentItem, ToastMessage } from './types';
import { MOCK_CONSIGNMENTS } from './data/mockData';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { StatutoryBanner } from './components/StatutoryBanner';
import { ToastContainer } from './components/Toast';
import { DashboardView } from './components/DashboardView';
import { QuickVerifyView } from './components/QuickVerifyView';
import { ConsignmentRegistryView } from './components/ConsignmentRegistryView';
import { GrievanceFormView } from './components/GrievanceFormView';
import { StandardsView } from './components/StandardsView';
import { QRValidatorView } from './components/QRValidatorView';
import { NewBatchModal } from './components/NewBatchModal';
import { ConsignmentDetailModal } from './components/ConsignmentDetailModal';

export const App: React.FC = () => {
  const [currentPath, setCurrentPath] = useState<NavigationPath>('dashboard');
  const [consignments, setConsignments] = useState<ConsignmentItem[]>(MOCK_CONSIGNMENTS);
  const [selectedConsignment, setSelectedConsignment] = useState<ConsignmentItem>(MOCK_CONSIGNMENTS[0]);
  const [inspectingConsignment, setInspectingConsignment] = useState<ConsignmentItem | null>(null);
  const [isNewBatchModalOpen, setIsNewBatchModalOpen] = useState(false);
  const [showStatutoryBanner, setShowStatutoryBanner] = useState(true);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Accessibility State
  const [fontSizeLevel, setFontSizeLevel] = useState<number>(0);
  const [isHighContrast, setIsHighContrast] = useState<boolean>(false);
  const [language, setLanguage] = useState<'EN' | 'HI'>('EN');

  const addToast = (message: string, icon?: string, type?: 'success' | 'warning' | 'info') => {
    const id = `${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, message, icon, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const handleDismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleSelectConsignment = (item: ConsignmentItem) => {
    setSelectedConsignment(item);
    setCurrentPath('quick-verify');
    addToast(`Loaded Consignment ${item.id}`, 'inventory_2', 'info');
  };

  const handleInspect = (item: ConsignmentItem) => {
    setInspectingConsignment(item);
  };

  const handleNewBatchSubmit = (newItem: ConsignmentItem) => {
    setConsignments((prev) => [newItem, ...prev]);
    setSelectedConsignment(newItem);
    addToast(`New Consignment ${newItem.id} anchored to NIC Ledger!`, 'verified', 'success');
  };

  const handlePrintPass = (item: ConsignmentItem) => {
    addToast(`Generated Official Inspection Pass for ${item.id}. Preparing print queue...`, 'print', 'success');
    window.print();
  };

  const handleDownloadPdf = (item: ConsignmentItem) => {
    addToast(`Downloading Statutory Certificate (PDF) for ${item.id}...`, 'download', 'success');
    const content = `
=======================================================================
GOVERNMENT OF INDIA - MINISTRY OF CONSUMER AFFAIRS
NATIONAL PACKAGING & CONSIGNMENT VERIFICATION CERTIFICATE (NAT-VERIFY)
=======================================================================
Consignment UID:       ${item.id}
GSTN E-Way Bill:       ${item.ewayBill}
Date of Registration:  ${item.loggedDate}
Cryptographic Hash:    ${item.cryptoProof || '0x7F89B44A291E9012'}

MANUFACTURER & ROUTE:
Shipper / Licensee:    ${item.manufacturer} (${item.manufacturerHub})
Destination Consignee: ${item.destination}
Transport Carrier:     ${item.transportMode || 'Reefer Freight (DL 1GC 8821)'}

STATUTORY BIS PACKAGING CONFORMANCE:
Mandatory Standard:    ${item.standardCode} - ${item.standardName}
Commodity Material:    ${item.productName}
Production Batch / Lot:${item.batchLot}
Declared MRP:          ${item.mrp || '₹ 1,850.00 / Unit'}

LEGAL METROLOGY & WEIGHTS:
Net Declared Content:  ${item.netQuantity}
Gross Mass Measured:   ${item.grossQuantity}

TAMPER-EVIDENT SECURITY SEALS:
RFID / Laser Bolt ID:  ${item.sealTag}
Seal Integrity Status: ${item.sealStatusText} (${item.sealStatusType.toUpperCase()})
Last Gateway Check:    ${item.checkpointLocation}
Inspecting Officer:    ${item.officerName || 'Insp. R. Sharma'} (Badge: ${item.officerId || 'BIS-INSP-HR-048'})

VERDICT: CERTIFIED COMPLIANT WITH PACKAGING RULES & ACTS.
VALID FOR TRANSIT ACROSS ALL INDIAN INTER-STATE FREIGHT CORRIDORS.
=======================================================================
NIC Digital Signature Block #9821-44B Verified.
    `.trim();

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `BIS-CERTIFICATE-${item.id}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleExportLedger = (format: string) => {
    addToast(`Exporting Statutory Consignment Ledger as ${format.toUpperCase()}...`, 'table_view', 'success');
    const csvContent =
      'UID,E-Way Bill,Manufacturer,Destination,Product,Standard,Seal Status,Status,Transit From,Transit To\n' +
      consignments
        .map(
          (c) =>
            `"${c.id}","${c.ewayBill}","${c.manufacturer}","${c.destination}","${c.productName}","${c.standardCode}","${c.sealStatusType}","${c.status}","${c.transitFrom}","${c.transitTo}"`
        )
        .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `PackSure-Statutory-Ledger-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownloadStandard = (code: string) => {
    addToast(`Downloading Official Gazette Specifications for ${code}...`, 'download', 'info');
  };

  // Font size multiplier class
  const fontSizeClass =
    fontSizeLevel === -1
      ? 'text-[13px]'
      : fontSizeLevel === 1
      ? 'text-[15px]'
      : fontSizeLevel === 2
      ? 'text-[16px]'
      : 'text-[14px]';

  return (
    <div
      className={`min-h-screen flex flex-col font-sans selection:bg-secondary/20 selection:text-secondary ${fontSizeClass} ${
        isHighContrast ? 'contrast-125 saturate-150 bg-white text-black' : 'bg-background text-on-surface'
      }`}
    >
      {/* Header */}
      <Header
        currentPath={currentPath}
        onNavigate={setCurrentPath}
        onOpenNewBatchModal={() => setIsNewBatchModalOpen(true)}
        fontSizeLevel={fontSizeLevel}
        onSetFontSizeLevel={setFontSizeLevel}
        isHighContrast={isHighContrast}
        onToggleHighContrast={() => setIsHighContrast(!isHighContrast)}
        language={language}
        onToggleLanguage={() => setLanguage(language === 'EN' ? 'HI' : 'EN')}
      />

      {/* Dismissible Statutory Gazette Notification Banner */}
      {showStatutoryBanner && (
        <StatutoryBanner
          onDismiss={() => setShowStatutoryBanner(false)}
          onDownloadCircular={() =>
            addToast('Downloading Gazette Circular S.O. 4410(E)...', 'download', 'info')
          }
        />
      )}

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6">
        {currentPath === 'dashboard' && (
          <DashboardView
            consignments={consignments}
            onSelectConsignment={handleSelectConsignment}
            onNavigate={setCurrentPath}
            onInspect={handleInspect}
          />
        )}

        {currentPath === 'quick-verify' && (
          <QuickVerifyView
            consignment={selectedConsignment}
            onNavigate={setCurrentPath}
            onPrintPass={handlePrintPass}
            onDownloadPdf={handleDownloadPdf}
          />
        )}

        {currentPath === 'consignment-registry' && (
          <ConsignmentRegistryView
            consignments={consignments}
            onSelectConsignment={handleSelectConsignment}
            onNavigate={setCurrentPath}
            onInspect={handleInspect}
            onOpenNewBatchModal={() => setIsNewBatchModalOpen(true)}
            onDownloadPdf={handleDownloadPdf}
            onExportLedger={handleExportLedger}
          />
        )}

        {currentPath === 'report-violation-or-grievance' && (
          <GrievanceFormView
            initialConsignment={selectedConsignment.status === 'flagged' ? selectedConsignment : null}
            onSubmitSuccess={(docketId) =>
              addToast(`Statutory Docket #${docketId} logged under Sec 19(2)`, 'gavel', 'warning')
            }
          />
        )}

        {currentPath === 'packaging-standards-and-bis' && (
          <StandardsView onDownloadStandard={handleDownloadStandard} />
        )}

        {currentPath === 'qr-and-barcode-validator' && (
          <QRValidatorView
            consignments={consignments}
            onSelectConsignment={handleSelectConsignment}
            onNavigateToQuickVerify={() => setCurrentPath('quick-verify')}
          />
        )}
      </main>

      {/* Institutional Footer */}
      <Footer />

      {/* Consignment Inspection Modal */}
      <ConsignmentDetailModal
        item={inspectingConsignment}
        isOpen={!!inspectingConsignment}
        onClose={() => setInspectingConsignment(null)}
        onViewQuickVerify={(item) => {
          setSelectedConsignment(item);
          setCurrentPath('quick-verify');
        }}
        onFlagAnomaly={(item) => {
          setSelectedConsignment(item);
          setInspectingConsignment(null);
          setCurrentPath('report-violation-or-grievance');
        }}
        onDownloadPdf={handleDownloadPdf}
        onPrintPass={handlePrintPass}
      />

      {/* New Batch Registration Modal */}
      <NewBatchModal
        isOpen={isNewBatchModalOpen}
        onClose={() => setIsNewBatchModalOpen(false)}
        onSubmit={handleNewBatchSubmit}
      />

      {/* Toast Container */}
      <ToastContainer toasts={toasts} onDismiss={handleDismissToast} />
    </div>
  );
};

export default App;
