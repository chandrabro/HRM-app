import React, { useState, forwardRef, useEffect } from 'react';
import { CameraView } from './CameraView.tsx';
import { LoadingSpinner } from './LoadingSpinner.tsx';
import { CameraViewRef } from '../App.tsx';

interface AttendanceTakerProps {
  isClockedIn: boolean;
  onClockEvent: (workStatus: string) => void;
  loading: boolean;
}

export const AttendanceTaker = forwardRef<CameraViewRef, AttendanceTakerProps>(({ isClockedIn, onClockEvent, loading }, ref) => {
  const [workStatus, setWorkStatus] = useState('');

  // Clear work status when clock-in status changes for better UX.
  useEffect(() => {
    setWorkStatus('');
  }, [isClockedIn]);

  const handleButtonClick = () => {
    if (!loading) {
      onClockEvent(workStatus);
    }
  };

  const buttonText = isClockedIn ? 'Clock Out' : 'Clock In';
  const buttonColor = isClockedIn ? 'bg-red-600 hover:bg-red-700' : 'bg-brand-blue hover:bg-blue-700';
  const labelText = isClockedIn ? 'What did you accomplish?' : 'What are you working on today?';
  const placeholderText = isClockedIn ? 'e.g., Deployed the new feature...' : 'e.g., Finalizing the Q3 report...';


  return (
    <div className="bg-brand-light-dark p-6 rounded-xl shadow-2xl space-y-4 flex flex-col h-full animate-slide-in-up">
      <h2 className="text-xl font-bold text-white text-center">Attendance Station</h2>
      <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden border-2 border-gray-600">
        <CameraView ref={ref} />
      </div>
      <div className="flex-grow">
        <label htmlFor="workStatus" className="block text-sm font-medium text-gray-300 mb-2">
          {labelText} (Optional)
        </label>
        <textarea
          id="workStatus"
          rows={3}
          value={workStatus}
          onChange={(e) => setWorkStatus(e.target.value)}
          placeholder={placeholderText}
          className="w-full bg-gray-900 border border-gray-600 rounded-md p-2 text-white focus:ring-2 focus:ring-brand-blue focus:border-brand-blue transition"
          disabled={loading}
        />
      </div>
      <button
        onClick={handleButtonClick}
        disabled={loading}
        className={`w-full flex justify-center items-center font-bold py-3 px-4 rounded-lg text-white transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${buttonColor}`}
      >
        {loading ? <LoadingSpinner /> : buttonText}
      </button>
    </div>
  );
});