// import React, { useState, useMemo, useEffect } from 'react';
// import { Eye, Edit, Save, FileText, Mail, Code, Hash, Filter, ChevronLeft, ChevronRight, Trash2, Copy, Calendar, User, PlusCircle } from 'lucide-react';
// import axios from 'axios';
// import Swal from 'sweetalert2';
// import withReactContent from 'sweetalert2-react-content';

// const MySwal = withReactContent(Swal);

// const TemplateManagement = () => {
//   const [templates, setTemplates] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const [selectedTemplate, setSelectedTemplate] = useState(null);
//   const [editMode, setEditMode] = useState(false);
//   const [editedTemplate, setEditedTemplate] = useState(null);
//   const [showTemplateTable, setShowTemplateTable] = useState(true);
//   const [showCreateForm, setShowCreateForm] = useState(false); // New state for create form
//   const [newTemplate, setNewTemplate] = useState({
//     name: '',
//     category: '',
//     type: '',
//     description: '',
//     subject: '',
//     content: '',
//     templateFile: null, // For file upload
//   });
  
//   // Search and pagination states
//   const [searchValue, setSearchValue] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 5;

//   const fetchTemplates = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await axios.get('/api/admin/templates'); // Adjust API endpoint as needed
//       setTemplates(response.data);
//     } catch (err) {
//       console.error('Error fetching templates:', err);
//       setError('Failed to fetch templates.');
//       MySwal.fire({
//         icon: 'error',
//         title: 'Error!',
//         text: 'Failed to fetch templates. Please try again later.',
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchTemplates();
//   }, []);

//   const handleViewTemplate = (template) => {
//     setSelectedTemplate(template);
//     setEditedTemplate({ ...template });
//     setEditMode(false);
//     setShowTemplateTable(false);
//   };

//   const handleBackToTable = () => {
//     setSelectedTemplate(null);
//     setEditedTemplate(null);
//     setEditMode(false);
//     setShowTemplateTable(true);
//   };

//   const handleEditToggle = () => {
//     setEditMode(!editMode);
//   };

//   const handleSaveTemplate = async () => {
//     try {
//       const response = await axios.put(`/api/admin/templates/${editedTemplate.id}`, editedTemplate);
//       setTemplates(templates.map(t => t.id === editedTemplate.id ? response.data.template : t));
//       setSelectedTemplate(response.data.template);
//       setEditMode(false);
//       MySwal.fire({
//         icon: 'success',
//         title: 'Success!',
//         text: 'Template updated successfully.',
//       });
//     } catch (err) {
//       console.error('Error updating template:', err);
//       MySwal.fire({
//         icon: 'error',
//         title: 'Error!',
//         text: 'Failed to update template. Please try again.',
//       });
//     }
//   };

//   const handleInputChange = (field, value) => {
//     setEditedTemplate({ ...editedTemplate, [field]: value });
//   };

//   const handleStatusToggle = (templateId) => {
//     const updatedTemplates = templates.map(template => 
//       template.id === templateId 
//         ? { ...template, status: template.status === 'Active' ? 'Draft' : 'Active' }
//         : template
//     );
//     setTemplates(updatedTemplates);
    
//     // Update selectedTemplate if it's currently viewing the modified template
//     if (selectedTemplate && selectedTemplate.id === templateId) {
//       const updatedTemplate = updatedTemplates.find(t => t.id === templateId);
//       setSelectedTemplate(updatedTemplate);
//       setEditedTemplate(updatedTemplate);
//     }
//   };

//   const handleDuplicateTemplate = (template) => {
//     const newTemplate = {
//       ...template,
//       id: Math.max(...templates.map(t => t.id)) + 1,
//       name: `${template.name} (Copy)`,
//       createdAt: new Date().toISOString().split('T')[0],
//       lastModified: new Date().toISOString().split('T')[0],
//       usageCount: 0,
//       status: 'Draft'
//     };
//     setTemplates([...templates, newTemplate]);
//   };

//   // Search and pagination logic
//   const filteredTemplates = useMemo(() => {
//     if (!searchValue.trim()) {
//       return templates;
//     }
    
//     const searchTerm = searchValue.toLowerCase().trim();
//     return templates.filter(template => {
//       return (
//         template.id.toString().includes(searchTerm) ||
//         template.name.toLowerCase().includes(searchTerm) ||
//         template.type.toLowerCase().includes(searchTerm) ||
//         template.category.toLowerCase().includes(searchTerm) ||
//         template.createdBy.toLowerCase().includes(searchTerm)
//       );
//     });
//   }, [templates, searchValue]);

//   const totalPages = Math.ceil(filteredTemplates.length / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const paginatedTemplates = filteredTemplates.slice(startIndex, startIndex + itemsPerPage);

//   const handleSearchChange = (value) => {
//     setSearchValue(value);
//     setCurrentPage(1);
//   };

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };

//   const getTypeIcon = (type) => {
//     switch (type) {
//       case 'Email': return <Mail className="w-4 h-4 mr-1 text-gray-600" />;
//       case 'Document': return <FileText className="w-4 h-4 mr-1 text-gray-600" />;
//       case 'SMS': return <Code className="w-4 h-4 mr-1 text-gray-600" />;
//       default: return <FileText className="w-4 h-4 mr-1 text-gray-600" />;
//     }
//   };

//   const getStatusColor = (status) => {
//     return status === 'Active' ? 'text-green-600' : 'text-orange-600';
//   };

//   const getCategoryColor = (category) => {
//     const colors = {
//       'Onboarding': 'text-blue-600 bg-blue-50',
//       'Billing': 'text-green-600 bg-green-50',
//       'Security': 'text-red-600 bg-red-50',
//       'Legal': 'text-purple-600 bg-purple-50',
//       'Alerts': 'text-orange-600 bg-orange-50',
//       'Scheduling': 'text-indigo-600 bg-indigo-50'
//     };
//     return colors[category] || 'text-gray-600 bg-gray-50';
//   };

//   return (
//     <div className="p-6 bg-white rounded-xl shadow-lg font-inter">
//       {showTemplateTable ? (
//         <>
//           <div className="flex items-center justify-between mb-6">
//             <h2 className="text-3xl font-semibold text-gray-800 flex items-center">
//               <FileText className="mr-3" />
//               Template Management
//             </h2>
            
//             {/* Search Section */}
//             <div className="flex items-center space-x-3">
//               <Filter className="w-5 h-5 text-gray-600" />
//               <input
//                 type="text"
//                 placeholder="Search by ID, Name, Type, Category, or Creator..."
//                 value={searchValue}
//                 onChange={(e) => handleSearchChange(e.target.value)}
//                 className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-80"
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
//                     Template Name
//                   </th>
//                   <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                     Type
//                   </th>
//                   <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                     Category
//                   </th>
//                   <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                     Status
//                   </th>
//                   <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                     Usage
//                   </th>
//                   <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {paginatedTemplates.length > 0 ? (
//                   paginatedTemplates.map((template, index) => (
//                     <tr key={template.id} className="hover:bg-gray-50 transition-colors">
//                       <td className="px-4 py-2.5 whitespace-nowrap text-sm font-medium text-gray-900">
//                         {startIndex + index + 1}
//                       </td>
//                       <td className="px-4 py-2.5 whitespace-nowrap text-sm font-medium text-gray-900 flex items-center">
//                         <Hash className="w-4 h-4 mr-1 text-gray-600" />
//                         {template.id}
//                       </td>
//                       <td className="px-4 py-2.5 whitespace-nowrap text-sm font-medium text-gray-900">
//                         {template.name}
//                       </td>
//                       <td className="px-4 py-2.5 whitespace-nowrap text-sm font-medium text-gray-900 flex items-center">
//                         {getTypeIcon(template.type)}
//                         {template.type}
//                       </td>
//                       <td className="px-4 py-2.5 whitespace-nowrap text-sm">
//                         <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${getCategoryColor(template.category)}`}>
//                           {template.category}
//                         </span>
//                       </td>
//                       <td className={`px-4 py-2.5 whitespace-nowrap text-sm font-semibold ${getStatusColor(template.status)}`}>
//                         {template.status}
//                       </td>
//                       <td className="px-4 py-2.5 whitespace-nowrap text-sm font-medium text-gray-900">
//                         {template.usageCount}
//                       </td>
//                       <td className="px-4 py-2.5 whitespace-nowrap text-sm font-medium">
//                         <div className="flex space-x-1">
//                           <button
//                             onClick={() => handleViewTemplate(template)}
//                             className="inline-flex items-center px-2 py-1.5 border border-gray-300 text-xs leading-4 font-semibold rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
//                           >
//                             <Eye className="w-3 h-3 mr-1" />
//                             View
//                           </button>
//                           <button
//                             onClick={() => handleStatusToggle(template.id)}
//                             className="inline-flex items-center px-2 py-1.5 border border-gray-300 text-xs leading-4 font-semibold rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
//                           >
//                             {template.status === 'Active' ? 'Deactivate' : 'Activate'}
//                           </button>
//                           <button
//                             onClick={() => handleDuplicateTemplate(template)}
//                             className="inline-flex items-center px-2 py-1.5 border border-gray-300 text-xs leading-4 font-semibold rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
//                           >
//                             <Copy className="w-3 h-3 mr-1" />
//                             Copy
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan="8" className="px-4 py-8 text-center text-gray-500">
//                       No templates found matching your search criteria.
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
          
//           {/* Pagination */}
//           {filteredTemplates.length > 0 && (
//             <div className="flex items-center justify-between mt-6 px-2">
//               <div className="text-sm text-gray-700">
//                 Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredTemplates.length)} of {filteredTemplates.length} entries
//                 {searchValue && (
//                   <span className="text-gray-500"> (filtered from {templates.length} total entries)</span>
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
//         /* Template Detail View */
//         <div className="bg-white">
//           <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
//             <h2 className="text-3xl font-semibold text-gray-800 flex items-center">
//               <FileText className="mr-3" />
//               Template Details
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
//                     onClick={handleSaveTemplate}
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
//               <h4 className="text-lg font-medium text-gray-900 border-b pb-2">Template Information</h4>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Template ID</label>
//                 <div className="flex items-center">
//                   <Hash className="w-4 h-4 mr-2 text-gray-600" />
//                   <span className="text-sm text-gray-900">{selectedTemplate.id}</span>
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Template Name</label>
//                 {editMode ? (
//                   <input
//                     type="text"
//                     value={editedTemplate.name}
//                     onChange={(e) => handleInputChange('name', e.target.value)}
//                     className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 font-medium"
//                   />
//                 ) : (
//                   <p className="text-sm text-gray-900">{selectedTemplate.name}</p>
//                 )}
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
//                 {editMode ? (
//                   <select
//                     value={editedTemplate.type}
//                     onChange={(e) => handleInputChange('type', e.target.value)}
//                     className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 font-medium"
//                   >
//                     <option value="Email">Email</option>
//                     <option value="Document">Document</option>
//                     <option value="SMS">SMS</option>
//                   </select>
//                 ) : (
//                   <div className="flex items-center">
//                     {getTypeIcon(selectedTemplate.type)}
//                     <span className="text-sm text-gray-900">{selectedTemplate.type}</span>
//                   </div>
//                 )}
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
//                 {editMode ? (
//                   <select
//                     value={editedTemplate.category}
//                     onChange={(e) => handleInputChange('category', e.target.value)}
//                     className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 font-medium"
//                   >
//                     <option value="Onboarding">Onboarding</option>
//                     <option value="Billing">Billing</option>
//                     <option value="Security">Security</option>
//                     <option value="Legal">Legal</option>
//                     <option value="Alerts">Alerts</option>
//                     <option value="Scheduling">Scheduling</option>
//                   </select>
//                 ) : (
//                   <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${getCategoryColor(selectedTemplate.category)}`}>
//                     {selectedTemplate.category}
//                   </span>
//                 )}
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
//                 <span className={`text-sm font-medium ${getStatusColor(selectedTemplate.status)}`}>
//                   {selectedTemplate.status}
//                 </span>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Usage Count</label>
//                 <p className="text-sm text-gray-900">{selectedTemplate.usageCount} times used</p>
//               </div>
//             </div>

//             {/* Content Information */}
//             <div className="space-y-4">
//               <h4 className="text-lg font-medium text-gray-900 border-b pb-2">Content & Metadata</h4>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
//                 {editMode ? (
//                   <textarea
//                     value={editedTemplate.description}
//                     onChange={(e) => handleInputChange('description', e.target.value)}
//                     rows={2}
//                     className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 font-medium"
//                   />
//                 ) : (
//                   <p className="text-sm text-gray-900">{selectedTemplate.description}</p>
//                 )}
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Subject/Title</label>
//                 {editMode ? (
//                   <input
//                     type="text"
//                     value={editedTemplate.subject}
//                     onChange={(e) => handleInputChange('subject', e.target.value)}
//                     className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 font-medium"
//                   />
//                 ) : (
//                   <p className="text-sm text-gray-900">{selectedTemplate.subject}</p>
//                 )}
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Created By</label>
//                 <div className="flex items-center">
//                   <User className="w-4 h-4 mr-2 text-gray-600" />
//                   <span className="text-sm text-gray-900">{selectedTemplate.createdBy}</span>
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Created At</label>
//                 <div className="flex items-center">
//                   <Calendar className="w-4 h-4 mr-2 text-gray-600" />
//                   <span className="text-sm text-gray-900">{selectedTemplate.createdAt}</span>
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Last Modified</label>
//                 <div className="flex items-center">
//                   <Calendar className="w-4 h-4 mr-2 text-gray-600" />
//                   <span className="text-sm text-gray-900">{selectedTemplate.lastModified}</span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Template Content Section */}
//           <div className="mt-6 pt-6 border-t border-gray-200">
//             <h4 className="text-lg font-medium text-gray-900 mb-4">Template Content</h4>
//             {editMode ? (
//               <textarea
//                 value={editedTemplate.content}
//                 onChange={(e) => handleInputChange('content', e.target.value)}
//                 rows={8}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
//                 placeholder="Enter template content with variables like {{variable_name}}..."
//               />
//             ) : (
//               <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm text-gray-800 whitespace-pre-wrap">
//                 {selectedTemplate.content}
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TemplateManagement;

