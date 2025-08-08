import React from 'react';

const DashboardContent = () => {
  console.log('DashboardContent is rendering');
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Dashboard Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card 1 */}
        <div className="bg-blue-100 p-4 rounded-lg shadow">
          <h3 className="text-xl font-semibold text-blue-800 mb-2">Total Cases</h3>
          <p className="text-3xl font-bold text-blue-900">1,234</p>
        </div>
        {/* Card 2 */}
        <div className="bg-green-100 p-4 rounded-lg shadow">
          <h3 className="text-xl font-semibold text-green-800 mb-2">Active Clients</h3>
          <p className="text-3xl font-bold text-green-900">567</p>
        </div>
        {/* Card 3 */}
        <div className="bg-yellow-100 p-4 rounded-lg shadow">
          <h3 className="text-xl font-semibold text-yellow-800 mb-2">Pending Tasks</h3>
          <p className="text-3xl font-bold text-yellow-900">89</p>
        </div>
      </div>
      <div className="mt-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Recent Activity</h3>
        <ul className="list-disc list-inside text-gray-700">
          <li>Case #1234 updated by John Doe.</li>
          <li>New client "ABC Corp" added.</li>
          <li>Document "Contract_v2.pdf" uploaded.</li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardContent;