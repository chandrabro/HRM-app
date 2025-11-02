export enum AttendanceStatus {
  CLOCKED_IN = 'Clocked In',
  CLOCKED_OUT = 'Clocked Out',
}

export interface AttendanceRecord {
  id: string;
  employeeName: string;
  timestamp: Date;
  status: AttendanceStatus;
  workStatus: string;
  snapshotDataUrl?: string;
  motivationalQuote: string;
}

export interface ToastMessage {
  id: number;
  message: string;
  type: 'success' | 'error';
}
