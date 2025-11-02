import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Header } from './components/Header.tsx';
import { AttendanceTaker } from './components/AttendanceTaker.tsx';
import { AttendanceLog } from './components/AttendanceLog.tsx';
import { Login } from './components/Login.tsx';
import { Toast } from './components/Toast.tsx';
import { getAIText } from './services/geminiService.ts';
import { saveAttendanceRecord } from './services/googleSheetsService.ts';
import { AttendanceRecord, AttendanceStatus, ToastMessage } from './types.ts';

export interface CameraViewRef {
  takeSnapshot: () => string | null;
}

const EMPLOYEE_NAME_KEY = 'ai_attendance_employee_name';

export default function App() {
  const [employeeName, setEmployeeName] = useState<string | null>(null);
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [attendanceLog, setAttendanceLog] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<ToastMessage | null>(null);

  const cameraRef = useRef<CameraViewRef>(null);

  // Check for saved name on initial load
  useEffect(() => {
    const savedName = localStorage.getItem(EMPLOYEE_NAME_KEY);
    if (savedName) {
      setEmployeeName(savedName);
    }
  }, []);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ id: Date.now(), message, type });
  };

  const handleLogin = (name: string) => {
    localStorage.setItem(EMPLOYEE_NAME_KEY, name);
    setEmployeeName(name);
  };

  const handleLogout = () => {
    localStorage.removeItem(EMPLOYEE_NAME_KEY);
    setEmployeeName(null);
    setIsClockedIn(false); // Reset clock-in state on logout
  };

  const handleClockEvent = useCallback(async (workStatus: string) => {
    if (!employeeName) return; // Should not happen, but a good safeguard

    setLoading(true);

    const snapshotDataUrl = cameraRef.current?.takeSnapshot();
    const newStatus = isClockedIn ? AttendanceStatus.CLOCKED_OUT : AttendanceStatus.CLOCKED_IN;

    try {
      const AITextType = newStatus === AttendanceStatus.CLOCKED_IN ? 'clock-in' : 'clock-out';
      const aiText = await getAIText(AITextType, workStatus);
      
      const newRecordData = {
        employeeName,
        timestamp: new Date(),
        status: newStatus,
        workStatus: workStatus.trim() || (newStatus === AttendanceStatus.CLOCKED_IN ? 'Starting the day' : 'Ending the day'),
        snapshotDataUrl: snapshotDataUrl || undefined,
        motivationalQuote: aiText,
      };

      const response = await saveAttendanceRecord(newRecordData);
      
      if (response.success) {
        const finalRecord: AttendanceRecord = {
          ...newRecordData,
          id: response.recordId,
        };
        setAttendanceLog(prevLog => [finalRecord, ...prevLog]);
        setIsClockedIn(!isClockedIn);
        showToast(`Successfully ${newStatus.toLowerCase()}!`, 'success');
      } else {
        throw new Error('Failed to save attendance record.');
      }
    } catch (err) {
      console.error("Clock event failed:", err);
      showToast('An error occurred. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  }, [isClockedIn, employeeName]);

  if (!employeeName) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-brand-dark text-brand-text font-sans animate-fade-in">
      <Header employeeName={employeeName} onLogout={handleLogout} />
      <main className="container mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <AttendanceTaker
              ref={cameraRef}
              isClockedIn={isClockedIn}
              onClockEvent={handleClockEvent}
              loading={loading}
            />
          </div>
          <div className="lg:col-span-3">
            <AttendanceLog records={attendanceLog} />
          </div>
        </div>
      </main>
      {toast && <Toast toast={toast} onClose={() => setToast(null)} />}
    </div>
  );
}