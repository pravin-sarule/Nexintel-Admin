import React from 'react';

const LandingPage: React.FC = () => {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to Nexintel Admin</h1>
      <p className="text-lg text-gray-600 mb-8">Your central hub for administration and management.</p>
      <a href="/login" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Go to Login
      </a>
    </div>
  );
};

export default LandingPage;