export type NavigationPath = 
  | 'dashboard'
  | 'quick-verify'
  | 'consignment-registry'
  | 'packaging-standards-and-bis'
  | 'qr-and-barcode-validator'
  | 'report-violation-or-grievance';

export type ComplianceStatus = 
  | 'verified' 
  | 'inspecting' 
  | 'flagged' 
  | 'delivered' 
  | 'notice';

export interface ConsignmentItem {
  id: string;
  ewayBill: string;
  loggedDate: string;
  manufacturer: string;
  manufacturerHub: string;
  manufacturerReg: string;
  destination: string;
  productName: string;
  standardCode: string;
  standardName: string;
  standardClass?: string;
  batchLot: string;
  netQuantity: string;
  grossQuantity: string;
  sealTag: string;
  sealStatusText: string;
  sealStatusType: 'intact' | 'breached' | 'pending' | 'warning';
  checkpointLocation: string;
  checkpointLane?: string;
  timestamp: string;
  status: ComplianceStatus;
  transitFrom: string;
  transitTo: string;
  transitProgress: number;
  transitCheckpoint: string;
  telemetryNotes: string;
  temperature?: string;
  cryptoProof?: string;
  mrp?: string;
  expiryDate?: string;
  transportMode?: string;
  officerName?: string;
  officerId?: string;
}

export interface GrievanceFormData {
  consignmentUid: string;
  productCategory: string;
  batchNo: string;
  manufacturerName: string;
  violationCategories: string[];
  severityLevel: 'routine' | 'priority' | 'critical';
  stateJurisdiction: string;
  checkpointName: string;
  incidentTime: string;
  incidentDescription: string;
  reportingRole: 'inspector' | 'consignee' | 'whistleblower';
  inspectorPhone: string;
  inspectorEmail: string;
  isAnonymous: boolean;
  statutoryDeclaration: boolean;
}

export interface ToastMessage {
  id: string;
  message: string;
  icon?: string;
  type?: 'success' | 'warning' | 'info';
}
