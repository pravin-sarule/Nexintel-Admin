
// import React, { useState, useMemo } from 'react';
// import { Eye, Lock, Unlock, Edit, Save, User, Mail, Shield, Hash, Filter, ChevronLeft, ChevronRight } from 'lucide-react';

// const UserManagement = () => {
//   console.log('UserManagement is rendering');
  
//   // Sample user data
//   const [users, setUsers] = useState([
//     {
//       id: 1,
//       username: 'john_doe',
//       email: 'john.doe@example.com',
//       authType: 'Local',
//       status: 'Active',
//       firstName: 'John',
//       lastName: 'Doe',
//       phone: '+1-555-0123',
//       role: 'Admin',
//       createdAt: '2024-01-15',
//       lastLogin: '2024-08-07'
//     },
//     {
//       id: 2,
//       username: 'jane_smith',
//       email: 'jane.smith@example.com',
//       authType: 'OAuth',
//       status: 'Active',
//       firstName: 'Jane',
//       lastName: 'Smith',
//       phone: '+1-555-0124',
//       role: 'User',
//       createdAt: '2024-02-20',
//       lastLogin: '2024-08-06'
//     },
//     {
//       id: 3,
//       username: 'bob_wilson',
//       email: 'bob.wilson@example.com',
//       authType: 'LDAP',
//       status: 'Blocked',
//       firstName: 'Bob',
//       lastName: 'Wilson',
//       phone: '+1-555-0125',
//       role: 'User',
//       createdAt: '2024-03-10',
//       lastLogin: '2024-07-30'
//     },
//     {
//       id: 4,
//       username: 'alice_brown',
//       email: 'alice.brown@example.com',
//       authType: 'Local',
//       status: 'Active',
//       firstName: 'Alice',
//       lastName: 'Brown',
//       phone: '+1-555-0126',
//       role: 'Manager',
//       createdAt: '2024-01-25',
//       lastLogin: '2024-08-07'
//     },
//     {
//       id: 5,
//       username: 'charlie_davis',
//       email: 'charlie.davis@example.com',
//       authType: 'OAuth',
//       status: 'Active',
//       firstName: 'Charlie',
//       lastName: 'Davis',
//       phone: '+1-555-0127',
//       role: 'User',
//       createdAt: '2024-04-05',
//       lastLogin: '2024-08-05'
//     }
//   ]);

//   const [selectedUser, setSelectedUser] = useState(null);
//   const [editMode, setEditMode] = useState(false);
//   const [editedUser, setEditedUser] = useState(null);
//   const [showUserTable, setShowUserTable] = useState(true);
  
//   // Filter and pagination states
//   const [searchValue, setSearchValue] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 5;

//   const handleViewUser = (user) => {
//     setSelectedUser(user);
//     setEditedUser({ ...user });
//     setEditMode(false);
//     setShowUserTable(false);
//   };

//   const handleBackToTable = () => {
//     setSelectedUser(null);
//     setEditedUser(null);
//     setEditMode(false);
//     setShowUserTable(true);
//   };

//   // Filter and pagination logic
//   const filteredUsers = useMemo(() => {
//     if (!searchValue.trim()) {
//       return users;
//     }
    
//     const searchTerm = searchValue.toLowerCase().trim();
//     return users.filter(user => {
//       return (
//         user.id.toString().includes(searchTerm) ||
//         user.username.toLowerCase().includes(searchTerm) ||
//         user.email.toLowerCase().includes(searchTerm)
//       );
//     });
//   }, [users, searchValue]);

//   const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const paginatedUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage);

//   // Reset to first page when search changes
//   const handleSearchChange = (value) => {
//     setSearchValue(value);
//     setCurrentPage(1);
//   };

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };

//   const handleEditToggle = () => {
//     setEditMode(!editMode);
//   };

//   const handleSaveUser = () => {
//     const updatedUsers = users.map(user => 
//       user.id === editedUser.id ? editedUser : user
//     );
//     setUsers(updatedUsers);
//     setSelectedUser(editedUser);
//     setEditMode(false);
//   };

//   const handleInputChange = (field, value) => {
//     setEditedUser({ ...editedUser, [field]: value });
//   };

//   const handleBlockUser = (userId) => {
//     const updatedUsers = users.map(user => 
//       user.id === userId 
//         ? { ...user, status: user.status === 'Active' ? 'Blocked' : 'Active' }
//         : user
//     );
//     setUsers(updatedUsers);
    
//     // Update selectedUser if it's currently viewing the modified user
//     if (selectedUser && selectedUser.id === userId) {
//       const updatedUser = updatedUsers.find(u => u.id === userId);
//       setSelectedUser(updatedUser);
//       setEditedUser(updatedUser);
//     }
//   };

//   return (
//     <div className="p-6 bg-white rounded-xl shadow-lg font-inter">
//       {showUserTable ? (
//         <>
//           <div className="flex items-center justify-between mb-6">
//             <h2 className="text-3xl font-semibold text-gray-800 flex items-center">
//               <User className="mr-3" />
//               Manage Users
//             </h2>
            
//             {/* Search Section */}
//             <div className="flex items-center space-x-3">
//               <Filter className="w-5 h-5 text-gray-600" />
//               <input
//                 type="text"
//                 placeholder="Search by ID, Username, or Email..."
//                 value={searchValue}
//                 onChange={(e) => handleSearchChange(e.target.value)}
//                 className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-64"
//               />
              
//               {searchValue && (
//                 <button
//                   onClick={() => handleSearchChange('')}
//                   className="px-3 py-2 text-xs font-semibold text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
//                 >
//                   Clear
//                 </button>
//               )}
//             </div>
//           </div>
          
//           <div className="overflow-x-auto">
//             <table className="min-w-full bg-white border border-gray-200 rounded-xl overflow-hidden">
//               <thead>
//                 <tr className="bg-gray-50 border-b border-gray-200">
//                   <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                     S.No
//                   </th>
//                   <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                     ID
//                   </th>
//                   <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                     Username
//                   </th>
//                   <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                     Email
//                   </th>
//                   <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                     Auth Type
//                   </th>
//                   <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                     Status
//                   </th>
//                   <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {paginatedUsers.length > 0 ? (
//                   paginatedUsers.map((user, index) => (
//                     <tr key={user.id} className="hover:bg-gray-50 transition-colors">
//                       <td className="px-4 py-2.5 whitespace-nowrap text-sm font-medium text-gray-900">
//                         {startIndex + index + 1}
//                       </td>
//                       <td className="px-4 py-2.5 whitespace-nowrap text-sm font-medium text-gray-900 flex items-center">
//                         <Hash className="w-4 h-4 mr-1 text-gray-600" />
//                         {user.id}
//                       </td>
//                       <td className="px-4 py-2.5 whitespace-nowrap text-sm font-medium text-gray-900">
//                         {user.username}
//                       </td>
//                       <td className="px-4 py-2.5 whitespace-nowrap text-sm font-medium text-gray-900 flex items-center">
//                         <Mail className="w-4 h-4 mr-1 text-gray-600" />
//                         {user.email}
//                       </td>
//                       <td className="px-4 py-2.5 whitespace-nowrap text-sm">
//                         {user.authType}
//                       </td>
//                       <td className="px-4 py-2.5 whitespace-nowrap text-sm font-semibold text-gray-900">
//                         {user.status}
//                       </td>
//                       <td className="px-4 py-2.5 whitespace-nowrap text-sm font-medium">
//                         <div className="flex space-x-2">
//                           <button
//                             onClick={() => handleViewUser(user)}
//                             className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs leading-4 font-semibold rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
//                           >
//                             <Eye className="w-4 h-4 mr-1" />
//                             View
//                           </button>
//                           <button
//                             onClick={() => handleBlockUser(user.id)}
//                             className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs leading-4 font-semibold rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
//                           >
//                             {user.status === 'Active' ? <Lock className="w-4 h-4 mr-1" /> : <Unlock className="w-4 h-4 mr-1" />}
//                             {user.status === 'Active' ? 'Block' : 'Unblock'}
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan="7" className="px-4 py-8 text-center text-gray-500">
//                       No users found matching your filter criteria.
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
          
//           {/* Pagination */}
//           {filteredUsers.length > 0 && (
//             <div className="flex items-center justify-between mt-6 px-2">
//               <div className="text-sm text-gray-700">
//                 Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredUsers.length)} of {filteredUsers.length} entries
//                 {searchValue && (
//                   <span className="text-gray-500"> (filtered from {users.length} total entries)</span>
//                 )}
//               </div>
              
//               <div className="flex items-center space-x-2">
//                 <button
//                   onClick={() => handlePageChange(currentPage - 1)}
//                   disabled={currentPage === 1}
//                   className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-lg border transition-colors ${
//                     currentPage === 1
//                       ? 'border-gray-300 text-gray-400 bg-white cursor-not-allowed'
//                       : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500'
//                   }`}
//                 >
//                   <ChevronLeft className="w-4 h-4 mr-1" />
//                   Previous
//                 </button>
                
//                 <div className="flex space-x-1">
//                   {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
//                     <button
//                       key={page}
//                       onClick={() => handlePageChange(page)}
//                       className={`px-3 py-2 text-sm font-medium rounded-lg border transition-colors ${
//                         currentPage === page
//                           ? 'border-blue-500 text-blue-600 bg-blue-50'
//                           : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500'
//                       }`}
//                     >
//                       {page}
//                     </button>
//                   ))}
//                 </div>
                
//                 <button
//                   onClick={() => handlePageChange(currentPage + 1)}
//                   disabled={currentPage === totalPages}
//                   className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-lg border transition-colors ${
//                     currentPage === totalPages
//                       ? 'border-gray-300 text-gray-400 bg-white cursor-not-allowed'
//                       : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500'
//                   }`}
//                 >
//                   Next
//                   <ChevronRight className="w-4 h-4 ml-1" />
//                 </button>
//               </div>
//             </div>
//           )}
//         </>
//       ) : (
//         /* User Detail View */
//         <div className="bg-white">
//           <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
//             <h2 className="text-3xl font-semibold text-gray-800 flex items-center">
//               <User className="mr-3" />
//               User Details
//             </h2>
//             <div className="flex items-center space-x-2">
//               <button
//                 onClick={handleBackToTable}
//                 className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-semibold rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
//               >
//                 Back to List
//               </button>
//               {editMode ? (
//                 <>
//                   <button
//                     onClick={handleSaveUser}
//                     className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-semibold rounded-lg text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
//                   >
//                     <Save className="w-4 h-4 mr-2" />
//                     Save
//                   </button>
//                   <button
//                     onClick={handleEditToggle}
//                     className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-semibold rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
//                   >
//                     Cancel
//                   </button>
//                 </>
//               ) : (
//                 <button
//                   onClick={handleEditToggle}
//                   className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-semibold rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
//                 >
//                   <Edit className="w-4 h-4 mr-2" />
//                   Edit
//                 </button>
//               )}
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {/* Basic Information */}
//             <div className="space-y-4">
//               <h4 className="text-lg font-medium text-gray-900 border-b pb-2">Basic Information</h4>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">User ID</label>
//                 <div className="flex items-center">
//                   <Hash className="w-4 h-4 mr-2 text-gray-600" />
//                   <span className="text-sm text-gray-900">{selectedUser.id}</span>
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
//                 {editMode ? (
//                   <input
//                     type="text"
//                     value={editedUser.username}
//                     onChange={(e) => handleInputChange('username', e.target.value)}
//                     className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 font-medium"
//                   />
//                 ) : (
//                   <p className="text-sm text-gray-900">{selectedUser.username}</p>
//                 )}
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
//                 {editMode ? (
//                   <div className="flex items-center">
//                     <Mail className="w-4 h-4 mr-2 text-gray-600" />
//                     <input
//                       type="email"
//                       value={editedUser.email}
//                       onChange={(e) => handleInputChange('email', e.target.value)}
//                       className="flex-1 px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 font-medium"
//                     />
//                   </div>
//                 ) : (
//                   <div className="flex items-center">
//                     <Mail className="w-4 h-4 mr-2 text-gray-600" />
//                     <span className="text-sm text-gray-900">{selectedUser.email}</span>
//                   </div>
//                 )}
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Authentication Type</label>
//                 {editMode ? (
//                   <div className="flex items-center">
//                     <Shield className="w-4 h-4 mr-2 text-gray-600" />
//                     <select
//                       value={editedUser.authType}
//                       onChange={(e) => handleInputChange('authType', e.target.value)}
//                       className="flex-1 px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 font-medium"
//                     >
//                       <option value="Local">Local</option>
//                       <option value="OAuth">OAuth</option>
//                       <option value="LDAP">LDAP</option>
//                     </select>
//                   </div>
//                 ) : (
//                   <div className="flex items-center">
//                     <Shield className="w-4 h-4 mr-2 text-gray-600" />
//                     <span className="text-sm text-gray-900">
//                       {selectedUser.authType}
//                     </span>
//                   </div>
//                 )}
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
//                 <span className="text-sm font-medium text-gray-900">
//                   {selectedUser.status}
//                 </span>
//               </div>
//             </div>

//             {/* Personal Information */}
//             <div className="space-y-4">
//               <h4 className="text-lg font-medium text-gray-900 border-b pb-2">Personal Information</h4>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
//                 {editMode ? (
//                   <input
//                     type="text"
//                     value={editedUser.firstName}
//                     onChange={(e) => handleInputChange('firstName', e.target.value)}
//                     className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 font-medium"
//                   />
//                 ) : (
//                   <p className="text-sm text-gray-900">{selectedUser.firstName}</p>
//                 )}
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
//                 {editMode ? (
//                   <input
//                     type="text"
//                     value={editedUser.lastName}
//                     onChange={(e) => handleInputChange('lastName', e.target.value)}
//                     className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 font-medium"
//                   />
//                 ) : (
//                   <p className="text-sm text-gray-900">{selectedUser.lastName}</p>
//                 )}
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
//                 {editMode ? (
//                   <input
//                     type="tel"
//                     value={editedUser.phone}
//                     onChange={(e) => handleInputChange('phone', e.target.value)}
//                     className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 font-medium"
//                   />
//                 ) : (
//                   <p className="text-sm text-gray-900">{selectedUser.phone}</p>
//                 )}
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
//                 {editMode ? (
//                   <select
//                     value={editedUser.role}
//                     onChange={(e) => handleInputChange('role', e.target.value)}
//                     className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 font-medium"
//                   >
//                     <option value="User">User</option>
//                     <option value="Manager">Manager</option>
//                     <option value="Admin">Admin</option>
//                   </select>
//                 ) : (
//                   <p className="text-sm text-gray-900">{selectedUser.role}</p>
//                 )}
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Created At</label>
//                 <p className="text-sm text-gray-900">{selectedUser.createdAt}</p>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Last Login</label>
//                 <p className="text-sm text-gray-900">{selectedUser.lastLogin}</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserManagement;


// import React, { useState, useMemo, useEffect } from 'react';
// import ReactDOM from 'react-dom'; // Import ReactDOM
// import { Eye, Lock, Unlock, Edit, Save, User, Mail, Shield, Hash, Filter, ChevronLeft, ChevronRight, Clock, RefreshCw, X, AlertTriangle, CheckCircle, AlertCircle } from 'lucide-react';

// // API base URL - adjust this to your backend URL
// const API_BASE_URL = 'http://localhost:3000/api';

// // Custom Alert Modal Component
// const AlertModal = ({ isOpen, onClose, title, message, type = 'info', confirmText = 'OK', cancelText = 'Cancel', onConfirm, showCancel = false }) => {
//   if (!isOpen) return null;

//   const getIcon = () => {
//     switch (type) {
//       case 'success':
//         return <CheckCircle className="w-12 h-12 text-green-500" />;
//       case 'error':
//         return <AlertCircle className="w-12 h-12 text-red-500" />;
//       case 'warning':
//         return <AlertTriangle className="w-12 h-12 text-yellow-500" />;
//       default:
//         return <AlertCircle className="w-12 h-12 text-blue-500" />;
//     }
//   };

//   const modalContent = (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
//         <div className="flex items-center justify-between mb-4">
//           <h3 className="text-lg font-medium text-gray-900">{title}</h3>
//           <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
//             <X className="w-6 h-6" />
//           </button>
//         </div>
        
//         <div className="flex flex-col items-center text-center mb-6">
//           {getIcon()}
//           <p className="mt-4 text-gray-700">{message}</p>
//         </div>
        
//         <div className="flex justify-end space-x-3">
//           {showCancel && (
//             <button
//               onClick={onClose}
//               className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
//             >
//               {cancelText}
//             </button>
//           )}
//           <button
//             onClick={() => {
//               if (onConfirm) onConfirm();
//               else onClose();
//             }}
//             className={`px-4 py-2 text-sm font-medium text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 ${
//               type === 'error' ? 'bg-red-600 hover:bg-red-700 focus:ring-red-500' :
//               type === 'warning' ? 'bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500' :
//               type === 'success' ? 'bg-green-600 hover:bg-green-700 focus:ring-green-500' :
//               'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
//             }`}
//           >
//             {confirmText}
//           </button>
//         </div>
//       </div>
//     </div>
//   );

//   return ReactDOM.createPortal(
//     modalContent,
//     document.getElementById('modal-root') || document.body // Render into 'modal-root' or body
//   );
// };

// const UserManagement = () => {
//   // State management
//   const [users, setUsers] = useState([]);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [editMode, setEditMode] = useState(false);
//   const [editedUser, setEditedUser] = useState(null);
//   const [showUserTable, setShowUserTable] = useState(true);
//   const [loading, setLoading] = useState(false);
//   const [userSessions, setUserSessions] = useState([]);
  
//   // Alert modal state
//   const [alert, setAlert] = useState({
//     isOpen: false,
//     title: '',
//     message: '',
//     type: 'info',
//     confirmText: 'OK',
//     cancelText: 'Cancel',
//     showCancel: false,
//     onConfirm: null
//   });
  
//   // Filter and pagination states
//   const [searchValue, setSearchValue] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 5;

//   // Alert helper functions
//   const showAlert = (config) => {
//     console.log('showAlert triggered:', config.title, config.message); // Added console.log
//     setAlert({
//       isOpen: true,
//       title: config.title || 'Alert',
//       message: config.message || '',
//       type: config.type || 'info',
//       confirmText: config.confirmText || 'OK',
//       cancelText: config.cancelText || 'Cancel',
//       showCancel: config.showCancel || false,
//       onConfirm: config.onConfirm || null
//     });
//   };

//   const closeAlert = () => {
//     console.log('closeAlert triggered'); // Added console.log
//     setAlert(prev => ({ ...prev, isOpen: false }));
//   };

//   // Get auth token from localStorage
//   const getAuthToken = () => {
//     return localStorage.getItem('token') || sessionStorage.getItem('token'); // Changed key to 'token'
//   };

//   // API helper function
//   const apiCall = async (endpoint, options = {}) => {
//     const token = getAuthToken();
    
//     const defaultHeaders = {
//       'Content-Type': 'application/json',
//       ...(token && { Authorization: `Bearer ${token}` })
//     };

//     const config = {
//       ...options,
//       headers: {
//         ...defaultHeaders,
//         ...options.headers
//       }
//     };

//     try {
//       const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
      
//       if (!response.ok) {
//         const errorData = await response.json().catch(() => ({}));
//         throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
//       }
      
//       return await response.json();
//     } catch (error) {
//       console.error('API call error:', error);
//       throw error;
//     }
//   };

//   // Fetch users with last session info
//   const fetchUsersWithSessions = async () => {
//     setLoading(true);
//     try {
//       const data = await apiCall('/users/sessions');
//       setUsers(data);
//     } catch (error) {
//       showAlert({
//         title: 'Error',
//         message: `Failed to fetch user sessions: ${error.message}`,
//         type: 'error'
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch specific user sessions
//   const fetchUserSessions = async (userId) => {
//     try {
//       const data = await apiCall(`/users/sessions/${userId}`);
//       setUserSessions(data.sessions || []);
//     } catch (error) {
//       showAlert({
//         title: 'Error',
//         message: `Failed to fetch user sessions: ${error.message}`,
//         type: 'error'
//       });
//     }
//   };

//   // Toggle block/unblock user
//   const handleBlockUser = async (userId) => {
//     const user = users.find(u => u.id === userId);
//     const action = user.is_blocked ? 'unblock' : 'block';
    
//     showAlert({
//       title: `${action.charAt(0).toUpperCase() + action.slice(1)} User`,
//       message: `Are you sure you want to ${action} ${user.username}?`,
//       type: 'warning',
//       confirmText: `Yes, ${action}!`,
//       showCancel: true,
//       onConfirm: async () => {
//         closeAlert();
//         try {
//           await apiCall(`/users/block/${userId}`, {
//             method: 'PUT'
//           });

//           const updatedUsers = users.map(u => 
//             u.id === userId 
//               ? { ...u, is_blocked: !u.is_blocked }
//               : u
//           );
//           setUsers(updatedUsers);
          
//           if (selectedUser && selectedUser.id === userId) {
//             const updatedUser = updatedUsers.find(u => u.id === userId);
//             setSelectedUser(updatedUser);
//             setEditedUser(updatedUser);
//           }

//           showAlert({
//             title: 'Success!',
//             message: `User ${action}ed successfully!`,
//             type: 'success'
//           });
//           fetchUsersWithSessions(); // Re-fetch users after successful block/unblock
//         } catch (error) {
//           showAlert({
//             title: 'Error',
//             message: `Failed to ${action} user: ${error.message}`,
//             type: 'error'
//           });
//         }
//       }
//     });
//   };

//   // Update user
//   const handleSaveUser = async () => {
//     try {
//       const updateData = {
//         username: editedUser.username,
//         ...(editedUser.password && { password: editedUser.password })
//       };

//       await apiCall(`/users/edit/${editedUser.id}`, {
//         method: 'PUT',
//         body: JSON.stringify(updateData)
//       });

//       const updatedUsers = users.map(user =>
//         user.id === editedUser.id ? { ...user, ...editedUser } : user
//       );
//       setUsers(updatedUsers);
//       setSelectedUser(editedUser);
//       setEditMode(false);

//       showAlert({
//         title: 'Success!',
//         message: 'User updated successfully!',
//         type: 'success'
//       });
//       fetchUsersWithSessions(); // Re-fetch users after successful save
//     } catch (error) {
//       showAlert({
//         title: 'Error',
//         message: `Failed to update user: ${error.message}`,
//         type: 'error'
//       });
//     }
//   };

//   // Unblock specific user
//   const handleUnblockUser = async (userId) => {
//     const user = users.find(u => u.id === userId);
    
//     if (!user.is_blocked) {
//       showAlert({
//         title: 'Info',
//         message: 'User is already unblocked!',
//         type: 'info'
//       });
//       return;
//     }

//     showAlert({
//       title: 'Unblock User',
//       message: `Are you sure you want to unblock ${user.username}?`,
//       type: 'warning',
//       confirmText: 'Yes, unblock!',
//       showCancel: true,
//       onConfirm: async () => {
//         closeAlert();
//         try {
//           await apiCall(`/users/unblock/${userId}`, {
//             method: 'PUT'
//           });

//           const updatedUsers = users.map(u =>
//             u.id === userId
//               ? { ...u, is_blocked: false }
//               : u
//           );
//           setUsers(updatedUsers);
          
//           if (selectedUser && selectedUser.id === userId) {
//             const updatedUser = updatedUsers.find(u => u.id === userId);
//             setSelectedUser(updatedUser);
//             setEditedUser(updatedUser);
//           }

//           showAlert({
//             title: 'Success!',
//             message: 'User unblocked successfully!',
//             type: 'success'
//           });
//           fetchUsersWithSessions(); // Re-fetch users after successful unblock
//         } catch (error) {
//           showAlert({
//             title: 'Error',
//             message: `Failed to unblock user: ${error.message}`,
//             type: 'error'
//           });
//         }
//       }
//     });
//   };

//   // Load users on component mount
//   useEffect(() => {
//     fetchUsersWithSessions();
//   }, []);

//   const handleViewUser = async (user) => {
//     setSelectedUser(user);
//     setEditedUser({ ...user });
//     setEditMode(false);
//     setShowUserTable(false);
//     await fetchUserSessions(user.id);
//   };

//   const handleBackToTable = () => {
//     setSelectedUser(null);
//     setEditedUser(null);
//     setEditMode(false);
//     setShowUserTable(true);
//     setUserSessions([]);
//   };

//   // Filter and pagination logic
//   const filteredUsers = useMemo(() => {
//     if (!searchValue.trim()) {
//       return users;
//     }
    
//     const searchTerm = searchValue.toLowerCase().trim();
//     return users.filter(user => {
//       return (
//         user.id.toString().includes(searchTerm) ||
//         (user.username && user.username.toLowerCase().includes(searchTerm)) ||
//         (user.email && user.email.toLowerCase().includes(searchTerm))
//       );
//     });
//   }, [users, searchValue]);

//   const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const paginatedUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage);

//   const handleSearchChange = (value) => {
//     setSearchValue(value);
//     setCurrentPage(1);
//   };

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };

//   const handleEditToggle = () => {
//     setEditMode(!editMode);
//   };

//   const handleInputChange = (field, value) => {
//     setEditedUser({ ...editedUser, [field]: value });
//   };

//   const handleRefresh = () => {
//     fetchUsersWithSessions();
//   };

//   const formatDate = (dateString) => {
//     if (!dateString) return 'Never';
//     return new Date(dateString).toLocaleString();
//   };

//   return (
//     <div className="p-6 bg-white rounded-xl shadow-lg">
//       <AlertModal
//         isOpen={alert.isOpen}
//         onClose={closeAlert}
//         title={alert.title}
//         message={alert.message}
//         type={alert.type}
//         confirmText={alert.confirmText}
//         cancelText={alert.cancelText}
//         showCancel={alert.showCancel}
//         onConfirm={alert.onConfirm}
//       />

//       {showUserTable ? (
//         <>
//           <div className="flex items-center justify-between mb-6">
//             <h2 className="text-3xl font-semibold text-gray-800 flex items-center">
//               <User className="mr-3" />
//               Manage Users
//             </h2>
            
//             <div className="flex items-center space-x-3">
//               <button
//                 onClick={handleRefresh}
//                 disabled={loading}
//                 className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-50"
//               >
//                 <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
//                 Refresh
//               </button>
              
//               <Filter className="w-5 h-5 text-gray-600" />
//               <input
//                 type="text"
//                 placeholder="Search by ID, Username, or Email..."
//                 value={searchValue}
//                 onChange={(e) => handleSearchChange(e.target.value)}
//                 className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-64"
//               />
              
//               {searchValue && (
//                 <button
//                   onClick={() => handleSearchChange('')}
//                   className="px-3 py-2 text-xs font-semibold text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
//                 >
//                   Clear
//                 </button>
//               )}
//             </div>
//           </div>
          
//           {loading ? (
//             <div className="flex items-center justify-center py-12">
//               <RefreshCw className="w-8 h-8 animate-spin text-blue-500" />
//               <span className="ml-2 text-gray-600">Loading users...</span>
//             </div>
//           ) : (
//             <div className="overflow-x-auto">
//               <table className="min-w-full bg-white border border-gray-200 rounded-xl overflow-hidden">
//                 <thead>
//                   <tr className="bg-gray-50 border-b border-gray-200">
//                     <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">S.No</th>
//                     <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">ID</th>
//                     <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Username</th>
//                     <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Email</th>
//                     <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Auth Type</th>
//                     <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
//                     <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Last Login</th>
//                     <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {paginatedUsers.length > 0 ? (
//                     paginatedUsers.map((user, index) => (
//                       <tr key={user.id} className="hover:bg-gray-50 transition-colors">
//                         <td className="px-4 py-2.5 whitespace-nowrap text-sm font-medium text-gray-900">
//                           {startIndex + index + 1}
//                         </td>
//                         <td className="px-4 py-2.5 whitespace-nowrap text-sm font-medium text-gray-900">
//                           <div className="flex items-center">
//                             <Hash className="w-4 h-4 mr-1 text-gray-600" />
//                             {user.id}
//                           </div>
//                         </td>
//                         <td className="px-4 py-2.5 whitespace-nowrap text-sm font-medium text-gray-900">
//                           {user.username || 'N/A'}
//                         </td>
//                         <td className="px-4 py-2.5 whitespace-nowrap text-sm font-medium text-gray-900">
//                           <div className="flex items-center">
//                             <Mail className="w-4 h-4 mr-1 text-gray-600" />
//                             {user.email || 'N/A'}
//                           </div>
//                         </td>
//                         <td className="px-4 py-2.5 whitespace-nowrap text-sm">
//                           {user.auth_type || 'N/A'}
//                         </td>
//                         <td className="px-4 py-2.5 whitespace-nowrap text-sm font-semibold">
//                           <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
//                             user.is_blocked 
//                               ? 'bg-red-100 text-red-800' 
//                               : 'bg-green-100 text-green-800'
//                           }`}>
//                             {user.is_blocked ? 'Blocked' : 'Active'}
//                           </span>
//                         </td>
//                         <td className="px-4 py-2.5 whitespace-nowrap text-sm text-gray-900">
//                           {formatDate(user.last_login_at)}
//                         </td>
//                         <td className="px-4 py-2.5 whitespace-nowrap text-sm font-medium">
//                           <div className="flex space-x-2">
//                             <button
//                               onClick={() => handleViewUser(user)}
//                               className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs leading-4 font-semibold rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
//                             >
//                               <Eye className="w-4 h-4 mr-1" />
//                               View
//                             </button>
//                             <button
//                               onClick={() => handleBlockUser(user.id)}
//                               className={`inline-flex items-center px-3 py-1.5 border text-xs leading-4 font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors ${
//                                 user.is_blocked 
//                                   ? 'border-green-300 text-green-700 bg-green-50 hover:bg-green-100 focus:ring-green-500' 
//                                   : 'border-red-300 text-red-700 bg-red-50 hover:bg-red-100 focus:ring-red-500'
//                               }`}
//                             >
//                               {user.is_blocked ? <Unlock className="w-4 h-4 mr-1" /> : <Lock className="w-4 h-4 mr-1" />}
//                               {user.is_blocked ? 'Unblock' : 'Block'}
//                             </button>
//                           </div>
//                         </td>
//                       </tr>
//                     ))
//                   ) : (
//                     <tr>
//                       <td colSpan="8" className="px-4 py-8 text-center text-gray-500">
//                         No users found matching your filter criteria.
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           )}
          
//           {filteredUsers.length > 0 && (
//             <div className="flex items-center justify-between mt-6 px-2">
//               <div className="text-sm text-gray-700">
//                 Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredUsers.length)} of {filteredUsers.length} entries
//                 {searchValue && (
//                   <span className="text-gray-500"> (filtered from {users.length} total entries)</span>
//                 )}
//               </div>
              
//               <div className="flex items-center space-x-2">
//                 <button
//                   onClick={() => handlePageChange(currentPage - 1)}
//                   disabled={currentPage === 1}
//                   className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-lg border transition-colors ${
//                     currentPage === 1
//                       ? 'border-gray-300 text-gray-400 bg-white cursor-not-allowed'
//                       : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500'
//                   }`}
//                 >
//                   <ChevronLeft className="w-4 h-4 mr-1" />
//                   Previous
//                 </button>
                
//                 <div className="flex space-x-1">
//                   {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
//                     <button
//                       key={page}
//                       onClick={() => handlePageChange(page)}
//                       className={`px-3 py-2 text-sm font-medium rounded-lg border transition-colors ${
//                         currentPage === page
//                           ? 'border-blue-500 text-blue-600 bg-blue-50'
//                           : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500'
//                       }`}
//                     >
//                       {page}
//                     </button>
//                   ))}
//                 </div>
                
//                 <button
//                   onClick={() => handlePageChange(currentPage + 1)}
//                   disabled={currentPage === totalPages}
//                   className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-lg border transition-colors ${
//                     currentPage === totalPages
//                       ? 'border-gray-300 text-gray-400 bg-white cursor-not-allowed'
//                       : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500'
//                   }`}
//                 >
//                   Next
//                   <ChevronRight className="w-4 h-4 ml-1" />
//                 </button>
//               </div>
//             </div>
//           )}
//         </>
//       ) : (
//         <div className="bg-white">
//           <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
//             <h2 className="text-3xl font-semibold text-gray-800 flex items-center">
//               <User className="mr-3" />
//               User Details
//             </h2>
//             <div className="flex items-center space-x-2">
//               <button
//                 onClick={handleBackToTable}
//                 className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-semibold rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
//               >
//                 Back to List
//               </button>
//               {editMode ? (
//                 <>
//                   <button
//                     onClick={handleSaveUser}
//                     className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-semibold rounded-lg text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
//                   >
//                     <Save className="w-4 h-4 mr-2" />
//                     Save
//                   </button>
//                   <button
//                     onClick={handleEditToggle}
//                     className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-semibold rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
//                   >
//                     Cancel
//                   </button>
//                 </>
//               ) : (
//                 <button
//                   onClick={handleEditToggle}
//                   className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-semibold rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
//                 >
//                   <Edit className="w-4 h-4 mr-2" />
//                   Edit
//                 </button>
//               )}
//               {selectedUser?.is_blocked && (
//                 <button
//                   onClick={() => handleUnblockUser(selectedUser.id)}
//                   className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-semibold rounded-lg text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
//                 >
//                   <Unlock className="w-4 h-4 mr-2" />
//                   Unblock User
//                 </button>
//               )}
//             </div>
//           </div>

//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//             <div className="lg:col-span-2 space-y-6">
//               <div className="space-y-4">
//                 <h4 className="text-lg font-medium text-gray-900 border-b pb-2">Basic Information</h4>
                
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">User ID</label>
//                     <div className="flex items-center">
//                       <Hash className="w-4 h-4 mr-2 text-gray-600" />
//                       <span className="text-sm text-gray-900">{selectedUser?.id}</span>
//                     </div>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
//                     {editMode ? (
//                       <input
//                         type="text"
//                         value={editedUser?.username || ''}
//                         onChange={(e) => handleInputChange('username', e.target.value)}
//                         className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 font-medium"
//                       />
//                     ) : (
//                       <p className="text-sm text-gray-900">{selectedUser?.username || 'N/A'}</p>
//                     )}
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
//                     <div className="flex items-center">
//                       <Mail className="w-4 h-4 mr-2 text-gray-600" />
//                       <span className="text-sm text-gray-900">{selectedUser?.email || 'N/A'}</span>
//                     </div>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Authentication Type</label>
//                     <div className="flex items-center">
//                       <Shield className="w-4 h-4 mr-2 text-gray-600" />
//                       <span className="text-sm text-gray-900">{selectedUser?.auth_type || 'N/A'}</span>
//                     </div>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
//                     <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
//                       selectedUser?.is_blocked 
//                         ? 'bg-red-100 text-red-800' 
//                         : 'bg-green-100 text-green-800'
//                     }`}>
//                       {selectedUser?.is_blocked ? 'Blocked' : 'Active'}
//                     </span>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
//                     <span className="text-sm text-gray-900">{selectedUser?.role || 'N/A'}</span>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Created At</label>
//                     <p className="text-sm text-gray-900">{formatDate(selectedUser?.created_at)}</p>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Updated At</label>
//                     <p className="text-sm text-gray-900">{formatDate(selectedUser?.updated_at)}</p>
//                   </div>
//                 </div>

//                 {editMode && selectedUser?.auth_type === 'manual' && (
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
//                     <input
//                       type="password"
//                       value={editedUser?.password || ''}
//                       onChange={(e) => handleInputChange('password', e.target.value)}
//                       placeholder="Enter new password (leave empty to keep current)"
//                       className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 font-medium"
//                     />
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* User Sessions */}
//             <div className="space-y-4">
//               <h4 className="text-lg font-medium text-gray-900 border-b pb-2 flex items-center">
//                 <Clock className="w-5 h-5 mr-2" />
//                 Session History
//               </h4>
              
//               <div className="max-h-96 overflow-y-auto space-y-2">
//                 {userSessions.length > 0 ? (
//                   userSessions.map((session, index) => (
//                     <div key={session.id || index} className="bg-gray-50 rounded-lg p-3 text-sm">
//                       <div className="font-medium text-gray-900">Session #{session.id}</div>
//                       <div className="text-gray-600 mt-1">
//                         <div>Login: {formatDate(session.login_at)}</div>
//                         <div>Logout: {formatDate(session.logout_at)}</div>
//                         <div>Created: {formatDate(session.created_at)}</div>
//                       </div>
//                     </div>
//                   ))
//                 ) : (
//                   <div className="text-center text-gray-500 py-4">
//                     No session history available
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserManagement;

import React, { useState, useMemo, useEffect } from 'react';
import { Eye, Lock, Unlock, Edit, Save, User, Mail, Shield, Hash, Filter, ChevronLeft, ChevronRight, Clock, RefreshCw, X, AlertTriangle, CheckCircle, AlertCircle } from 'lucide-react';

// API base URL - adjust this to your backend URL
const API_BASE_URL = 'http://localhost:3000/api';

// Custom Alert Modal Component (Fixed to stay on same page)
const AlertModal = ({ isOpen, onClose, title, message, type = 'info', confirmText = 'OK', cancelText = 'Cancel', onConfirm, showCancel = false }) => {
  if (!isOpen) return null;

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-12 h-12 text-green-500" />;
      case 'error':
        return <AlertCircle className="w-12 h-12 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="w-12 h-12 text-yellow-500" />;
      default:
        return <AlertCircle className="w-12 h-12 text-blue-500" />;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" style={{ zIndex: 9999 }}>
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="flex flex-col items-center text-center mb-6">
          {getIcon()}
          <p className="mt-4 text-gray-700">{message}</p>
        </div>
        
        <div className="flex justify-end space-x-3">
          {showCancel && (
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              {cancelText}
            </button>
          )}
          <button
            onClick={() => {
              if (onConfirm) onConfirm();
              else onClose();
            }}
            className={`px-4 py-2 text-sm font-medium text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              type === 'error' ? 'bg-red-600 hover:bg-red-700 focus:ring-red-500' :
              type === 'warning' ? 'bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500' :
              type === 'success' ? 'bg-green-600 hover:bg-green-700 focus:ring-green-500' :
              'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
            }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

const UserManagement = () => {
  // State management
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedUser, setEditedUser] = useState(null);
  const [showUserTable, setShowUserTable] = useState(true);
  const [loading, setLoading] = useState(false);
  const [userSessions, setUserSessions] = useState([]);
  
  // Alert modal state
  const [alert, setAlert] = useState({
    isOpen: false,
    title: '',
    message: '',
    type: 'info',
    confirmText: 'OK',
    cancelText: 'Cancel',
    showCancel: false,
    onConfirm: null
  });
  
  // Filter and pagination states
  const [searchValue, setSearchValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Alert helper functions
  const showAlert = (config) => {
    console.log('showAlert triggered:', config.title, config.message);
    setAlert({
      isOpen: true,
      title: config.title || 'Alert',
      message: config.message || '',
      type: config.type || 'info',
      confirmText: config.confirmText || 'OK',
      cancelText: config.cancelText || 'Cancel',
      showCancel: config.showCancel || false,
      onConfirm: config.onConfirm || null
    });
  };

  const closeAlert = () => {
    console.log('closeAlert triggered');
    setAlert(prev => ({ ...prev, isOpen: false }));
  };

  // Get auth token from localStorage
  const getAuthToken = () => {
    return localStorage.getItem('token') || sessionStorage.getItem('token');
  };

  // API helper function
  const apiCall = async (endpoint, options = {}) => {
    const token = getAuthToken();
    
    const defaultHeaders = {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` })
    };

    const config = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers
      }
    };

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API call error:', error);
      throw error;
    }
  };

  // Fetch users with last session info
  const fetchUsersWithSessions = async () => {
    setLoading(true);
    try {
      const data = await apiCall('/users/sessions');
      console.log('Fetched users:', data); // Debug log
      
      // Transform the data to match expected structure
      const transformedUsers = data.map(user => ({
        ...user,
        last_login_at: user.login_time, // Map login_time to last_login_at
        auth_type: user.auth_type || 'manual',
        is_blocked: user.is_blocked || false
      }));
      
      setUsers(transformedUsers);
    } catch (error) {
      console.error('Fetch users error:', error);
      showAlert({
        title: 'Error',
        message: `Failed to fetch users: ${error.message}`,
        type: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  // Fetch specific user sessions
  const fetchUserSessions = async (userId) => {
    try {
      const data = await apiCall(`/users/sessions/${userId}`);
      console.log('Fetched user sessions:', data); // Debug log
      
      // Transform sessions data to match expected structure
      const transformedSessions = data.map((session, index) => ({
        id: index + 1,
        login_at: session.login_time,
        logout_at: session.logout_time,
        created_at: session.login_time
      }));
      
      setUserSessions(transformedSessions);
    } catch (error) {
      console.error('Fetch user sessions error:', error);
      showAlert({
        title: 'Error',
        message: `Failed to fetch user sessions: ${error.message}`,
        type: 'error'
      });
    }
  };

  // Toggle block/unblock user
  const handleBlockUser = async (userId) => {
    const user = users.find(u => u.id === userId);
    const action = user.is_blocked ? 'unblock' : 'block';
    
    showAlert({
      title: `${action.charAt(0).toUpperCase() + action.slice(1)} User`,
      message: `Are you sure you want to ${action} ${user.username}?`,
      type: 'warning',
      confirmText: `Yes, ${action}!`,
      showCancel: true,
      onConfirm: async () => {
        closeAlert();
        try {
          await apiCall(`/users/block/${userId}`, {
            method: 'PUT'
          });

          // Update the user in the local state
          const updatedUsers = users.map(u => 
            u.id === userId 
              ? { ...u, is_blocked: !u.is_blocked }
              : u
          );
          setUsers(updatedUsers);
          
          // Update selected user if it's the same user
          if (selectedUser && selectedUser.id === userId) {
            const updatedUser = updatedUsers.find(u => u.id === userId);
            setSelectedUser(updatedUser);
            setEditedUser(updatedUser);
          }

          showAlert({
            title: 'Success!',
            message: `User ${action}ed successfully!`,
            type: 'success'
          });
        } catch (error) {
          console.error('Block/unblock error:', error);
          showAlert({
            title: 'Error',
            message: `Failed to ${action} user: ${error.message}`,
            type: 'error'
          });
        }
      }
    });
  };

  // Update user
  const handleSaveUser = async () => {
    try {
      const updateData = {
        username: editedUser.username,
        ...(editedUser.password && { password: editedUser.password })
      };

      await apiCall(`/users/edit/${editedUser.id}`, {
        method: 'PUT',
        body: JSON.stringify(updateData)
      });

      const updatedUsers = users.map(user =>
        user.id === editedUser.id ? { ...user, ...editedUser } : user
      );
      setUsers(updatedUsers);
      setSelectedUser(editedUser);
      setEditMode(false);

      showAlert({
        title: 'Success!',
        message: 'User updated successfully!',
        type: 'success'
      });
    } catch (error) {
      console.error('Save user error:', error);
      showAlert({
        title: 'Error',
        message: `Failed to update user: ${error.message}`,
        type: 'error'
      });
    }
  };

  // Unblock specific user
  const handleUnblockUser = async (userId) => {
    const user = users.find(u => u.id === userId);
    
    if (!user.is_blocked) {
      showAlert({
        title: 'Info',
        message: 'User is already unblocked!',
        type: 'info'
      });
      return;
    }

    showAlert({
      title: 'Unblock User',
      message: `Are you sure you want to unblock ${user.username}?`,
      type: 'warning',
      confirmText: 'Yes, unblock!',
      showCancel: true,
      onConfirm: async () => {
        closeAlert();
        try {
          await apiCall(`/users/unblock/${userId}`, {
            method: 'PUT'
          });

          const updatedUsers = users.map(u =>
            u.id === userId
              ? { ...u, is_blocked: false }
              : u
          );
          setUsers(updatedUsers);
          
          if (selectedUser && selectedUser.id === userId) {
            const updatedUser = updatedUsers.find(u => u.id === userId);
            setSelectedUser(updatedUser);
            setEditedUser(updatedUser);
          }

          showAlert({
            title: 'Success!',
            message: 'User unblocked successfully!',
            type: 'success'
          });
        } catch (error) {
          console.error('Unblock error:', error);
          showAlert({
            title: 'Error',
            message: `Failed to unblock user: ${error.message}`,
            type: 'error'
          });
        }
      }
    });
  };

  // Load users on component mount
  useEffect(() => {
    fetchUsersWithSessions();
  }, []);

  const handleViewUser = async (user) => {
    setSelectedUser(user);
    setEditedUser({ ...user });
    setEditMode(false);
    setShowUserTable(false);
    await fetchUserSessions(user.id);
  };

  const handleBackToTable = () => {
    setSelectedUser(null);
    setEditedUser(null);
    setEditMode(false);
    setShowUserTable(true);
    setUserSessions([]);
  };

  // Filter and pagination logic
  const filteredUsers = useMemo(() => {
    if (!searchValue.trim()) {
      return users;
    }
    
    const searchTerm = searchValue.toLowerCase().trim();
    return users.filter(user => {
      return (
        user.id.toString().includes(searchTerm) ||
        (user.username && user.username.toLowerCase().includes(searchTerm)) ||
        (user.email && user.email.toLowerCase().includes(searchTerm))
      );
    });
  }, [users, searchValue]);

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage);

  const handleSearchChange = (value) => {
    setSearchValue(value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleEditToggle = () => {
    setEditMode(!editMode);
  };

  const handleInputChange = (field, value) => {
    setEditedUser({ ...editedUser, [field]: value });
  };

  const handleRefresh = () => {
    fetchUsersWithSessions();
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Never';
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg">
      <AlertModal
        isOpen={alert.isOpen}
        onClose={closeAlert}
        title={alert.title}
        message={alert.message}
        type={alert.type}
        confirmText={alert.confirmText}
        cancelText={alert.cancelText}
        showCancel={alert.showCancel}
        onConfirm={alert.onConfirm}
      />

      {showUserTable ? (
        <>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-semibold text-gray-800 flex items-center">
              <User className="mr-3" />
              Manage Users
            </h2>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={handleRefresh}
                disabled={loading}
                className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </button>
              
              <Filter className="w-5 h-5 text-gray-600" />
              <input
                type="text"
                placeholder="Search by ID, Username, or Email..."
                value={searchValue}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-64"
              />
              
              {searchValue && (
                <button
                  onClick={() => handleSearchChange('')}
                  className="px-3 py-2 text-xs font-semibold text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
          
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <RefreshCw className="w-8 h-8 animate-spin text-blue-500" />
              <span className="ml-2 text-gray-600">Loading users...</span>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200 rounded-xl overflow-hidden">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">S.No</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">ID</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Username</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Email</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Auth Type</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Last Login</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {paginatedUsers.length > 0 ? (
                    paginatedUsers.map((user, index) => (
                      <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-2.5 whitespace-nowrap text-sm font-medium text-gray-900">
                          {startIndex + index + 1}
                        </td>
                        <td className="px-4 py-2.5 whitespace-nowrap text-sm font-medium text-gray-900">
                          <div className="flex items-center">
                            <Hash className="w-4 h-4 mr-1 text-gray-600" />
                            {user.id}
                          </div>
                        </td>
                        <td className="px-4 py-2.5 whitespace-nowrap text-sm font-medium text-gray-900">
                          {user.username || 'N/A'}
                        </td>
                        <td className="px-4 py-2.5 whitespace-nowrap text-sm font-medium text-gray-900">
                          <div className="flex items-center">
                            <Mail className="w-4 h-4 mr-1 text-gray-600" />
                            {user.email || 'N/A'}
                          </div>
                        </td>
                        <td className="px-4 py-2.5 whitespace-nowrap text-sm">
                          {user.auth_type || 'manual'}
                        </td>
                        <td className="px-4 py-2.5 whitespace-nowrap text-sm font-semibold">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            user.is_blocked 
                              ? 'bg-red-100 text-red-800' 
                              : 'bg-green-100 text-green-800'
                          }`}>
                            {user.is_blocked ? 'Blocked' : 'Active'}
                          </span>
                        </td>
                        <td className="px-4 py-2.5 whitespace-nowrap text-sm text-gray-900">
                          {formatDate(user.last_login_at)}
                        </td>
                        <td className="px-4 py-2.5 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleViewUser(user)}
                              className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs leading-4 font-semibold rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
                            >
                              <Eye className="w-4 h-4 mr-1" />
                              View
                            </button>
                            <button
                              onClick={() => handleBlockUser(user.id)}
                              className={`inline-flex items-center px-3 py-1.5 border text-xs leading-4 font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors ${
                                user.is_blocked 
                                  ? 'border-green-300 text-green-700 bg-green-50 hover:bg-green-100 focus:ring-green-500' 
                                  : 'border-red-300 text-red-700 bg-red-50 hover:bg-red-100 focus:ring-red-500'
                              }`}
                            >
                              {user.is_blocked ? <Unlock className="w-4 h-4 mr-1" /> : <Lock className="w-4 h-4 mr-1" />}
                              {user.is_blocked ? 'Unblock' : 'Block'}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="px-4 py-8 text-center text-gray-500">
                        No users found matching your filter criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
          
          {filteredUsers.length > 0 && (
            <div className="flex items-center justify-between mt-6 px-2">
              <div className="text-sm text-gray-700">
                Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredUsers.length)} of {filteredUsers.length} entries
                {searchValue && (
                  <span className="text-gray-500"> (filtered from {users.length} total entries)</span>
                )}
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-lg border transition-colors ${
                    currentPage === 1
                      ? 'border-gray-300 text-gray-400 bg-white cursor-not-allowed'
                      : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500'
                  }`}
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Previous
                </button>
                
                <div className="flex space-x-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`px-3 py-2 text-sm font-medium rounded-lg border transition-colors ${
                        currentPage === page
                          ? 'border-blue-500 text-blue-600 bg-blue-50'
                          : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
                
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-lg border transition-colors ${
                    currentPage === totalPages
                      ? 'border-gray-300 text-gray-400 bg-white cursor-not-allowed'
                      : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500'
                  }`}
                >
                  Next
                  <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="bg-white">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
            <h2 className="text-3xl font-semibold text-gray-800 flex items-center">
              <User className="mr-3" />
              User Details
            </h2>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleBackToTable}
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-semibold rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
              >
                Back to List
              </button>
              {editMode ? (
                <>
                  <button
                    onClick={handleSaveUser}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-semibold rounded-lg text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save
                  </button>
                  <button
                    onClick={handleEditToggle}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-semibold rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={handleEditToggle}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-semibold rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </button>
              )}
              {selectedUser?.is_blocked && (
                <button
                  onClick={() => handleUnblockUser(selectedUser.id)}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-semibold rounded-lg text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
                >
                  <Unlock className="w-4 h-4 mr-2" />
                  Unblock User
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="space-y-4">
                <h4 className="text-lg font-medium text-gray-900 border-b pb-2">Basic Information</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">User ID</label>
                    <div className="flex items-center">
                      <Hash className="w-4 h-4 mr-2 text-gray-600" />
                      <span className="text-sm text-gray-900">{selectedUser?.id}</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                    {editMode ? (
                      <input
                        type="text"
                        value={editedUser?.username || ''}
                        onChange={(e) => handleInputChange('username', e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 font-medium"
                      />
                    ) : (
                      <p className="text-sm text-gray-900">{selectedUser?.username || 'N/A'}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <div className="flex items-center">
                      <Mail className="w-4 h-4 mr-2 text-gray-600" />
                      <span className="text-sm text-gray-900">{selectedUser?.email || 'N/A'}</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Authentication Type</label>
                    <div className="flex items-center">
                      <Shield className="w-4 h-4 mr-2 text-gray-600" />
                      <span className="text-sm text-gray-900">{selectedUser?.auth_type || 'manual'}</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      selectedUser?.is_blocked 
                        ? 'bg-red-100 text-red-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {selectedUser?.is_blocked ? 'Blocked' : 'Active'}
                    </span>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                    <span className="text-sm text-gray-900">{selectedUser?.role || 'N/A'}</span>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Created At</label>
                    <p className="text-sm text-gray-900">{formatDate(selectedUser?.created_at)}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Updated At</label>
                    <p className="text-sm text-gray-900">{formatDate(selectedUser?.updated_at)}</p>
                  </div>
                </div>

                {editMode && selectedUser?.auth_type === 'manual' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                    <input
                      type="password"
                      value={editedUser?.password || ''}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      placeholder="Enter new password (leave empty to keep current)"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 font-medium"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* User Sessions */}
            <div className="space-y-4">
              <h4 className="text-lg font-medium text-gray-900 border-b pb-2 flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                Session History
              </h4>
              
              <div className="max-h-96 overflow-y-auto space-y-2">
                {userSessions.length > 0 ? (
                  userSessions.map((session, index) => (
                    <div key={session.id || index} className="bg-gray-50 rounded-lg p-3 text-sm">
                      <div className="font-medium text-gray-900">Session #{session.id}</div>
                      <div className="text-gray-600 mt-1">
                        <div>Login: {formatDate(session.login_at)}</div>
                        <div>Logout: {formatDate(session.logout_at)}</div>
                        <div>Created: {formatDate(session.created_at)}</div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-gray-500 py-4">
                    No session history available
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;