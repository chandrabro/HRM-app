import React from 'react';
import { AttendanceRecord, AttendanceStatus } from '../types.ts';

const LogIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
    </svg>
);


const formatTimestamp = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
        dateStyle: 'medium',
        timeStyle: 'short',
    }).format(date);
};

const LogItem: React.FC<{ record: AttendanceRecord }> = ({ record }) => {
    const isClockedIn = record.status === AttendanceStatus.CLOCKED_IN;
    return (
        <li className="bg-gray-900 p-4 rounded-lg animate-fade-in">
            <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                    {record.snapshotDataUrl ? 
                        <img src={record.snapshotDataUrl} alt="attendance snapshot" className="h-16 w-16 rounded-full object-cover border-2 border-gray-600" />
                        :
                        <div className="h-16 w-16 rounded-full bg-gray-700 flex items-center justify-center border-2 border-gray-600">
                           <span className="text-2xl font-bold">{record.employeeName.charAt(0)}</span>
                        </div>
                    }
                </div>
                <div className="flex-1">
                    <div className="flex justify-between items-center">
                        <p className="font-bold text-lg text-white">{record.employeeName}</p>
                        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${isClockedIn ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}>
                            {record.status}
                        </span>
                    </div>
                    <p className="text-sm text-gray-400">{formatTimestamp(record.timestamp)}</p>
                    <p className="mt-2 text-gray-300">{record.workStatus}</p>
                    <div className="mt-3 pt-3 border-t border-gray-700">
                        <p className="text-sm italic text-brand-blue/80">"{record.motivationalQuote}"</p>
                    </div>
                </div>
            </div>
        </li>
    );
};


export const AttendanceLog: React.FC<{ records: AttendanceRecord[] }> = ({ records }) => {
  return (
    <div className="bg-brand-light-dark p-6 rounded-xl shadow-2xl h-full flex flex-col animate-slide-in-up" style={{animationDelay: '100ms'}}>
      <h2 className="text-xl font-bold text-white mb-4">Attendance Log</h2>
      {records.length > 0 ? (
        <ul className="space-y-4 overflow-y-auto flex-grow pr-2">
            {records.map((record) => <LogItem key={record.id} record={record} />)}
        </ul>
      ) : (
        <div className="flex-grow flex flex-col items-center justify-center text-gray-500 text-center">
            <LogIcon />
            <p className="mt-4 font-semibold">No attendance records yet.</p>
            <p className="text-sm">Your clock-in and clock-out events will appear here.</p>
        </div>
      )}
    </div>
  );
};