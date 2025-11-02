import React from 'react';

interface HeaderProps {
  employeeName: string;
  onLogout: () => void;
}

const ClockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-3 text-brand-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

export const Header: React.FC<HeaderProps> = ({ employeeName, onLogout }) => {
  return (
    <header className="bg-brand-light-dark shadow-lg">
      <div className="container mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center">
            <ClockIcon />
            <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white">AI Attendance Tracker</h1>
                <p className="text-sm text-gray-400">Your smart solution for workplace attendance</p>
            </div>
        </div>
        <div className="text-right">
            <p className="text-white font-semibold">{employeeName}</p>
            <button onClick={onLogout} className="text-sm text-brand-blue/80 hover:text-brand-blue transition-colors">
                Change User
            </button>
        </div>
      </div>
    </header>
  );
};
