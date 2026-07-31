export interface InstituteInfo {
  name: string;
  address: string;
  phone: string;
}

export interface ServiceOption {
  id: string;
  label: string;        // e.g. "Option 1"
  description?: string; // optional short name, e.g. "Basic Reading"
  advance: number;      // default advance payment amount
  balance: number;      // default remaining balance amount
}

export interface BillData {
  customerName: string;
  option: ServiceOption;
  customAdvance: string; // The dynamically entered advance amount
  customBalance: string; // The dynamically entered balance amount
  date: string;          // generated at print time, e.g. "27 Jul 2026"
  billNo?: string;        // optional running reference number
}
