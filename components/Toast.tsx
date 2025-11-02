import React, { useEffect } from 'react';
import { ToastMessage } from '../types.ts';

interface ToastProps {
  toast: ToastMessage;
  onClose: () => void;
}

const SuccessIcon = () => (
    <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
);

const ErrorIcon = () => (
    <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
);

export const Toast: React.FC<ToastProps> = ({ toast, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000); // Auto-dismiss after 5 seconds

    return () => {
      clearTimeout(timer);
    };
  }, [toast, onClose]);

  const isSuccess = toast.type === 'success';

  return (
    <div 
        className={`fixed bottom-5 right-5 w-full max-w-sm p-4 rounded-lg shadow-lg flex items-center space-x-4 animate-toast-in ${isSuccess ? 'bg-green-900/80 border-green-600' : 'bg-red-900/80 border-red-600'} border backdrop-blur-sm text-white z-50`}
        role="alert"
    >
      {isSuccess ? <SuccessIcon /> : <ErrorIcon />}
      <span className="flex-grow">{toast.message}</span>
      <button onClick={onClose} aria-label="Close notification" className="ml-auto -mx-1.5 -my-1.5 p-1.5 rounded-full hover:bg-white/20 transition-colors flex-shrink-0">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
      </button>
    </div>
  );
};