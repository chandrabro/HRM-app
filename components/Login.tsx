import React, { useState } from 'react';

interface LoginProps {
  onLogin: (name: string) => void;
}

const UserIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-brand-blue mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);


export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onLogin(name.trim());
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-dark animate-fade-in p-4">
      <div className="bg-brand-light-dark p-8 rounded-2xl shadow-2xl w-full max-w-md text-center animate-slide-in-up">
        <UserIcon />
        <h1 className="text-3xl font-bold text-white mt-4">Welcome!</h1>
        <p className="text-gray-400 mb-6">Please enter your name to begin.</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your full name"
            className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-white text-center text-lg focus:ring-2 focus:ring-brand-blue focus:border-brand-blue transition"
            required
            aria-label="Your full name"
          />
          <button
            type="submit"
            disabled={!name.trim()}
            className="w-full mt-4 font-bold py-3 px-4 rounded-lg text-white transition-colors duration-300 bg-brand-blue hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Start My Day
          </button>
        </form>
      </div>
    </div>
  );
};
