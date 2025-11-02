
import { AttendanceRecord } from '../types';

/**
 * Mocks saving an attendance record to a backend service like Google Sheets.
 * @param record - The attendance record to save, without an ID.
 * @returns A promise that resolves with the success status and a mock record ID.
 */
export const saveAttendanceRecord = async (record: Omit<AttendanceRecord, 'id'>): Promise<{ success: boolean; recordId: string }> => {
  console.log('// MOCK API CALL: Saving to Google Sheets:', {
    ...record,
    timestamp: record.timestamp.toISOString(),
  });
  
  // Simulate network delay to make the loading state visible
  await new Promise(resolve => setTimeout(resolve, 750));

  // In a real application, this would be a fetch call to your backend.
  // The backend would then use the Google Sheets API.

  return { success: true, recordId: `mock_${Date.now()}` };
};
