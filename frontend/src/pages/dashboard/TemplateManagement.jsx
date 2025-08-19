

// import React, { useState, useMemo, useEffect } from 'react';
// import { Eye, Edit, Save, FileText, Mail, Code, Hash, Filter, ChevronLeft, ChevronRight, Trash2, Copy, Calendar, User, PlusCircle, X, Upload } from 'lucide-react';
// import axios from 'axios';
// import Swal from 'sweetalert2';
// import withReactContent from 'sweetalert2-react-content';

// // Helper function to decode JWT token
// const decodeToken = (token) => {
//   try {
//     if (!token) return null;
//     const base64Url = token.split('.')[1];
//     const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
//     const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
//       return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
//     }).join(''));
//     return JSON.parse(jsonPayload);
//   } catch (error) {
//     console.error('Error decoding token:', error);
//     return null;
//   }
// };

// const MySwal = withReactContent(Swal);

// const TemplateManagement = () => {
//   const [templates, setTemplates] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [userInfo, setUserInfo] = useState(null);

//   const [selectedTemplate, setSelectedTemplate] = useState(null);
//   const [editMode, setEditMode] = useState(false);
//   const [editedTemplate, setEditedTemplate] = useState(null);
//   const [showTemplateTable, setShowTemplateTable] = useState(true);
//   const [showCreateForm, setShowCreateForm] = useState(false);
//   const [newTemplate, setNewTemplate] = useState({
//     name: '',
//     category: 'Onboarding',
//     type: 'Email',
//     status: 'active',
//     templateFile: null,
//   });
  
//   // Search and pagination states
//   const [searchValue, setSearchValue] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 5;

//   // Loading states
//   const [createLoading, setCreateLoading] = useState(false);
//   const [updateLoading, setUpdateLoading] = useState(false);

//   // API Base URL - adjust according to your setup
//   const API_BASE_URL = 'http://localhost:5000';

//   // Get user info from token
//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       const decoded = decodeToken(token);
//       if (decoded) {
//         setUserInfo({
//           userId: decoded.id || decoded.userId || decoded.user_id,
//           role: decoded.role || decoded.userRole || decoded.user_role,
//           email: decoded.email,
//           name: decoded.name || decoded.username
//         });
//         console.log('User Info:', decoded); // For debugging
//       } else {
//         // Invalid token
//         MySwal.fire({
//           icon: 'error',
//           title: 'Authentication Error',
//           text: 'Invalid token. Please login again.',
//           confirmButtonColor: '#3085d6',
//         }).then(() => {
//           localStorage.removeItem('token');
//           // Redirect to login or handle as needed
//         });
//       }
//     } else {
//       MySwal.fire({
//         icon: 'warning',
//         title: 'Authentication Required',
//         text: 'Please login to access this page.',
//         confirmButtonColor: '#3085d6',
//       });
//     }
//   }, []);

//   const fetchTemplates = async () => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       setError('No authentication token found');
//       setLoading(false);
//       return;
//     }

//     setLoading(true);
//     setError(null);
//     try {
//       console.log('Fetching templates with token:', token.substring(0, 20) + '...'); // For debugging
//       const response = await axios.get(`${API_BASE_URL}/admin/templates`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//       });
      
//       // Transform the data to match your component expectations
//       const transformedData = response.data.map(template => ({
//         id: template.id,
//         name: template.name,
//         type: template.type,
//         category: template.category,
//         status: template.status === 'active' ? 'Active' : 'Draft',
//         usageCount: template.usageCount || 0,
//         description: template.description || 'No description available',
//         subject: template.subject || template.name,
//         content: template.content || 'Template content will be loaded from file.',
//         createdBy: userInfo?.name || template.created_by || 'Admin',
//         createdAt: new Date(template.created_at).toLocaleDateString(),
//         lastModified: new Date(template.updated_at).toLocaleDateString(),
//         gcs_path: template.gcs_path,
//       }));
      
//       setTemplates(transformedData);
//     } catch (err) {
//       console.error('Error fetching templates:', err);
//       console.error('Error details:', err.response?.data);
//       setError('Failed to fetch templates.');
      
//       if (err.response?.status === 401) {
//         MySwal.fire({
//           icon: 'error',
//           title: 'Authentication Error',
//           text: 'Your session has expired. Please login again.',
//           confirmButtonColor: '#3085d6',
//         }).then(() => {
//           localStorage.removeItem('token');
//           // Redirect to login
//         });
//       } else {
//         MySwal.fire({
//           icon: 'error',
//           title: 'Error!',
//           text: err.response?.data?.message || 'Failed to fetch templates. Please try again later.',
//           confirmButtonColor: '#3085d6',
//         });
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     // Only fetch templates if user info is available
//     if (userInfo) {
//       fetchTemplates();
//     }
//   }, [userInfo]);

//   const handleCreateTemplate = async () => {
//     if (!newTemplate.name.trim()) {
//       MySwal.fire({
//         icon: 'warning',
//         title: 'Validation Error',
//         text: 'Please enter a template name.',
//         confirmButtonColor: '#3085d6',
//       });
//       return;
//     }

//     if (!newTemplate.templateFile) {
//       MySwal.fire({
//         icon: 'warning',
//         title: 'Validation Error',
//         text: 'Please select a template file.',
//         confirmButtonColor: '#3085d6',
//       });
//       return;
//     }

//     setCreateLoading(true);
//     try {
//       const token = localStorage.getItem('token');
//       const formData = new FormData();
//       formData.append('name', newTemplate.name);
//       formData.append('category', newTemplate.category);
//       formData.append('type', newTemplate.type);
//       formData.append('status', newTemplate.status);
//       formData.append('templateFile', newTemplate.templateFile);

//       const response = await axios.post(`${API_BASE_URL}/admin/templates`, formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       MySwal.fire({
//         icon: 'success',
//         title: 'Success!',
//         text: 'Template created successfully.',
//         confirmButtonColor: '#3085d6',
//       });

//       // Reset form
//       setNewTemplate({
//         name: '',
//         category: 'Onboarding',
//         type: 'Email',
//         status: 'active',
//         templateFile: null,
//       });
//       setShowCreateForm(false);
      
//       // Refresh templates list
//       fetchTemplates();
//     } catch (err) {
//       console.error('Error creating template:', err);
//       MySwal.fire({
//         icon: 'error',
//         title: 'Error!',
//         text: err.response?.data?.message || 'Failed to create template. Please try again.',
//         confirmButtonColor: '#3085d6',
//       });
//     } finally {
//       setCreateLoading(false);
//     }
//   };

//   const handleViewTemplate = async (template) => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.get(`${API_BASE_URL}/admin/templates/${template.id}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
      
//       const fullTemplate = {
//         ...template,
//         ...response.data,
//         status: response.data.status === 'active' ? 'Active' : 'Draft',
//         usageCount: response.data.usageCount || 0,
//       };
      
//       setSelectedTemplate(fullTemplate);
//       setEditedTemplate({ ...fullTemplate });
//       setEditMode(false);
//       setShowTemplateTable(false);
//     } catch (err) {
//       console.error('Error fetching template details:', err);
//       MySwal.fire({
//         icon: 'error',
//         title: 'Error!',
//         text: 'Failed to load template details.',
//         confirmButtonColor: '#3085d6',
//       });
//     }
//   };

//   const handleBackToTable = () => {
//     setSelectedTemplate(null);
//     setEditedTemplate(null);
//     setEditMode(false);
//     setShowTemplateTable(true);
//     setShowCreateForm(false);
//   };

//   const handleEditToggle = () => {
//     setEditMode(!editMode);
//   };

//   const handleSaveTemplate = async () => {
//     setUpdateLoading(true);
//     try {
//       const token = localStorage.getItem('token');
//       const updateData = {
//         name: editedTemplate.name,
//         category: editedTemplate.category,
//         type: editedTemplate.type,
//         status: editedTemplate.status === 'Active' ? 'active' : 'draft',
//       };

//       const response = await axios.put(
//         `${API_BASE_URL}/admin/templates/${editedTemplate.id}`,
//         updateData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           },
//         }
//       );

//       // Update the templates list
//       const updatedTemplate = {
//         ...editedTemplate,
//         status: response.data.template.status === 'active' ? 'Active' : 'Draft',
//       };
      
//       setTemplates(templates.map(t => t.id === editedTemplate.id ? updatedTemplate : t));
//       setSelectedTemplate(updatedTemplate);
//       setEditMode(false);
      
//       MySwal.fire({
//         icon: 'success',
//         title: 'Success!',
//         text: 'Template updated successfully.',
//         confirmButtonColor: '#3085d6',
//       });
//     } catch (err) {
//       console.error('Error updating template:', err);
//       MySwal.fire({
//         icon: 'error',
//         title: 'Error!',
//         text: err.response?.data?.message || 'Failed to update template. Please try again.',
//         confirmButtonColor: '#3085d6',
//       });
//     } finally {
//       setUpdateLoading(false);
//     }
//   };

//   const handleInputChange = (field, value) => {
//     setEditedTemplate({ ...editedTemplate, [field]: value });
//   };

//   const handleNewTemplateChange = (field, value) => {
//     setNewTemplate({ ...newTemplate, [field]: value });
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     setNewTemplate({ ...newTemplate, templateFile: file });
//   };

//   const handleStatusToggle = async (template) => {
//     try {
//       const token = localStorage.getItem('token');
//       const newStatus = template.status === 'Active' ? 'draft' : 'active';
      
//       await axios.put(
//         `${API_BASE_URL}/admin/templates/${template.id}`,
//         { status: newStatus },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           },
//         }
//       );

//       const updatedTemplates = templates.map(t =>
//         t.id === template.id
//           ? { ...t, status: newStatus === 'active' ? 'Active' : 'Draft' }
//           : t
//       );
//       setTemplates(updatedTemplates);
      
//       // Update selectedTemplate if it's currently viewing the modified template
//       if (selectedTemplate && selectedTemplate.id === template.id) {
//         const updatedTemplate = updatedTemplates.find(t => t.id === template.id);
//         setSelectedTemplate(updatedTemplate);
//         setEditedTemplate(updatedTemplate);
//       }

//       MySwal.fire({
//         icon: 'success',
//         title: 'Success!',
//         text: `Template ${newStatus === 'active' ? 'activated' : 'deactivated'} successfully.`,
//         confirmButtonColor: '#3085d6',
//       });
//     } catch (err) {
//       console.error('Error toggling template status:', err);
//       MySwal.fire({
//         icon: 'error',
//         title: 'Error!',
//         text: 'Failed to update template status.',
//         confirmButtonColor: '#3085d6',
//       });
//     }
//   };

//   const handleDeleteTemplate = async (template) => {
//     const result = await MySwal.fire({
//       title: 'Are you sure?',
//       text: `This will permanently delete the template "${template.name}".`,
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#d33',
//       cancelButtonColor: '#3085d6',
//       confirmButtonText: 'Yes, delete it!',
//       cancelButtonText: 'Cancel'
//     });

//     if (result.isConfirmed) {
//       try {
//         const token = localStorage.getItem('token');
//         await axios.delete(`${API_BASE_URL}/admin/templates/${template.id}`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         setTemplates(templates.filter(t => t.id !== template.id));
        
//         MySwal.fire({
//           icon: 'success',
//           title: 'Deleted!',
//           text: 'Template has been deleted successfully.',
//           confirmButtonColor: '#3085d6',
//         });
//       } catch (err) {
//         console.error('Error deleting template:', err);
//         MySwal.fire({
//           icon: 'error',
//           title: 'Error!',
//           text: 'Failed to delete template.',
//           confirmButtonColor: '#3085d6',
//         });
//       }
//     }
//   };

//   const handleDuplicateTemplate = (template) => {
//     const newTemplate = {
//       ...template,
//       id: Math.max(...templates.map(t => t.id)) + 1,
//       name: `${template.name} (Copy)`,
//       createdAt: new Date().toLocaleDateString(),
//       lastModified: new Date().toLocaleDateString(),
//       usageCount: 0,
//       status: 'Draft'
//     };
//     setTemplates([...templates, newTemplate]);
    
//     MySwal.fire({
//       icon: 'success',
//       title: 'Success!',
//       text: 'Template duplicated successfully.',
//       confirmButtonColor: '#3085d6',
//     });
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

//   if (loading) {
//     return (
//       <div className="p-6 bg-white rounded-xl shadow-lg font-inter">
//         <div className="flex items-center justify-center h-64">
//           <div className="text-lg text-gray-600">Loading templates...</div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 bg-white rounded-xl shadow-lg font-inter">
//       {showCreateForm ? (
//         /* Create Template Form */
//         <div className="bg-white">
//           <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
//             <h2 className="text-3xl font-semibold text-gray-800 flex items-center">
//               <PlusCircle className="mr-3" />
//               Add New Template
//             </h2>
//             <button
//               onClick={handleBackToTable}
//               className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-semibold rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
//             >
//               <X className="w-4 h-4 mr-2" />
//               Cancel
//             </button>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Template Name *</label>
//                 <input
//                   type="text"
//                   value={newTemplate.name}
//                   onChange={(e) => handleNewTemplateChange('name', e.target.value)}
//                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 font-medium"
//                   placeholder="Enter template name"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Type *</label>
//                 <select
//                   value={newTemplate.type}
//                   onChange={(e) => handleNewTemplateChange('type', e.target.value)}
//                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 font-medium"
//                 >
//                   <option value="Email">Email</option>
//                   <option value="Document">Document</option>
//                   <option value="SMS">SMS</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
//                 <select
//                   value={newTemplate.category}
//                   onChange={(e) => handleNewTemplateChange('category', e.target.value)}
//                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 font-medium"
//                 >
//                   <option value="Onboarding">Onboarding</option>
//                   <option value="Billing">Billing</option>
//                   <option value="Security">Security</option>
//                   <option value="Legal">Legal</option>
//                   <option value="Alerts">Alerts</option>
//                   <option value="Scheduling">Scheduling</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
//                 <select
//                   value={newTemplate.status}
//                   onChange={(e) => handleNewTemplateChange('status', e.target.value)}
//                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 font-medium"
//                 >
//                   <option value="active">Active</option>
//                   <option value="draft">Draft</option>
//                 </select>
//               </div>
//             </div>

//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Template File *</label>
//                 <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
//                   <div className="space-y-1 text-center">
//                     <Upload className="mx-auto h-12 w-12 text-gray-400" />
//                     <div className="flex text-sm text-gray-600">
//                       <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
//                         <span>Upload a file</span>
//                         <input
//                           id="file-upload"
//                           name="file-upload"
//                           type="file"
//                           className="sr-only"
//                           onChange={handleFileChange}
//                           accept=".doc,.docx,.pdf,.txt,.html"
//                         />
//                       </label>
//                       <p className="pl-1">or drag and drop</p>
//                     </div>
//                     <p className="text-xs text-gray-500">
//                       DOC, DOCX, PDF, TXT, HTML up to 10MB
//                     </p>
//                     {newTemplate.templateFile && (
//                       <p className="text-sm text-green-600 mt-2">
//                         Selected: {newTemplate.templateFile.name}
//                       </p>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="mt-6 pt-6 border-t border-gray-200 flex justify-end space-x-3">
//             <button
//               onClick={handleBackToTable}
//               className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-semibold rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
//             >
//               Cancel
//             </button>
//             <button
//               onClick={handleCreateTemplate}
//               disabled={createLoading}
//               className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-semibold rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               {createLoading ? 'Creating...' : (
//                 <>
//                   <Save className="w-4 h-4 mr-2" />
//                   Create Template
//                 </>
//               )}
//             </button>
//           </div>
//         </div>
//       ) : showTemplateTable ? (
//         <>
//           {/* Header with user info */}
//           <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
//             <div className="flex items-center justify-between">
//               <div className="flex items-center space-x-4">
//                 <div className="flex items-center">
//                   <User className="w-5 h-5 text-blue-600 mr-2" />
//                   <span className="text-sm font-medium text-blue-800">
//                     Welcome, {userInfo?.name || userInfo?.email || 'Admin'}
//                   </span>
//                 </div>
//                 <div className="flex items-center">
//                   <span className="text-sm text-blue-600">Role: </span>
//                   <span className="ml-1 px-2 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded">
//                     {userInfo?.role || 'Unknown'}
//                   </span>
//                 </div>
//                 <div className="text-sm text-blue-600">
//                   User ID: {userInfo?.userId || 'N/A'}
//                 </div>
//               </div>
//               <div className="text-xs text-blue-500">
//                 Total Templates: {templates.length}
//               </div>
//             </div>
//           </div>

//           <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 space-y-4 lg:space-y-0">
//             <h2 className="text-3xl font-semibold text-gray-800 flex items-center">
//               <FileText className="mr-3" />
//               Template Management
//             </h2>
            
//             <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
//               {/* Search Section */}
//               <div className="flex items-center space-x-3">
//                 <Filter className="w-5 h-5 text-gray-600" />
//                 <input
//                   type="text"
//                   placeholder="Search templates..."
//                   value={searchValue}
//                   onChange={(e) => handleSearchChange(e.target.value)}
//                   className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full sm:w-64"
//                 />
                
//                 {searchValue && (
//                   <button
//                     onClick={() => handleSearchChange('')}
//                     className="px-3 py-2 text-xs font-semibold text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors whitespace-nowrap"
//                   >
//                     Clear
//                   </button>
//                 )}
//               </div>

//               {/* Add Template Button - Now more prominent */}
//               <button
//                 onClick={() => setShowCreateForm(true)}
//                 className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-sm font-semibold rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105"
//               >
//                 <PlusCircle className="w-5 h-5 mr-2" />
//                 Add New Template
//               </button>
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
//                             onClick={() => handleStatusToggle(template)}
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
//                           <button
//                             onClick={() => handleDeleteTemplate(template)}
//                             className="inline-flex items-center px-2 py-1.5 border border-red-300 text-xs leading-4 font-semibold rounded-lg text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
//                           >
//                             <Trash2 className="w-3 h-3 mr-1" />
//                             Delete
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
//                     disabled={updateLoading}
//                     className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-semibold rounded-lg text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                   >
//                     {updateLoading ? 'Saving...' : (
//                       <>
//                         <Save className="w-4 h-4 mr-2" />
//                         Save
//                       </>
//                     )}
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

//               {selectedTemplate.gcs_path && (
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">File Path</label>
//                   <p className="text-sm text-gray-600 break-all">{selectedTemplate.gcs_path}</p>
//                 </div>
//               )}
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

import React, { useState, useMemo, useEffect } from 'react';
import { Eye, Edit, Save, FileText, Mail, Code, Hash, Filter, ChevronLeft, ChevronRight, Trash2, Copy, Calendar, User, PlusCircle, X, Upload } from 'lucide-react';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

// Helper function to decode JWT token
const decodeToken = (token) => {
  try {
    if (!token) return null;
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

const MySwal = withReactContent(Swal);

const TemplateManagement = () => {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedTemplate, setEditedTemplate] = useState(null);
  const [showTemplateTable, setShowTemplateTable] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newTemplate, setNewTemplate] = useState({
    name: '',
    category: 'Onboarding',
    type: 'Email',
    status: 'active',
    templateFile: null,
  });
  
  // Search and pagination states
  const [searchValue, setSearchValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Loading states
  const [createLoading, setCreateLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);

  // API Base URL - adjust according to your setup
  const API_BASE_URL = 'https://nexintel-admin.onrender.com/api';

  // Get user info from token
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = decodeToken(token);
      if (decoded) {
        setUserInfo({
          userId: decoded.id || decoded.userId || decoded.user_id,
          role: decoded.role || decoded.userRole || decoded.user_role,
          email: decoded.email,
          name: decoded.name || decoded.username
        });
        console.log('User Info:', decoded); // For debugging
      } else {
        // Invalid token
        MySwal.fire({
          icon: 'error',
          title: 'Authentication Error',
          text: 'Invalid token. Please login again.',
          confirmButtonColor: '#3085d6',
        }).then(() => {
          localStorage.removeItem('token');
          // Redirect to login or handle as needed
        });
      }
    } else {
      MySwal.fire({
        icon: 'warning',
        title: 'Authentication Required',
        text: 'Please login to access this page.',
        confirmButtonColor: '#3085d6',
      });
    }
  }, []);

  const fetchTemplates = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('No authentication token found');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      console.log('Fetching templates with token:', token.substring(0, 20) + '...'); // For debugging
      const response = await axios.get(`${API_BASE_URL}/admin/templates`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      
      // Transform the data to match your component expectations
      const transformedData = response.data.map(template => ({
        id: template.id,
        name: template.name,
        type: template.type,
        category: template.category,
        status: template.status === 'active' ? 'Active' : 'Draft',
        usageCount: template.usageCount || 0,
        description: template.description || 'No description available',
        subject: template.subject || template.name,
        content: template.content || 'Template content will be loaded from file.',
        createdBy: userInfo?.name || template.created_by || 'Admin',
        createdAt: new Date(template.created_at).toLocaleDateString(),
        lastModified: new Date(template.updated_at).toLocaleDateString(),
        gcs_path: template.gcs_path,
      }));
      
      setTemplates(transformedData);
    } catch (err) {
      console.error('Error fetching templates:', err);
      console.error('Error details:', err.response?.data);
      setError('Failed to fetch templates.');
      
      if (err.response?.status === 401) {
        MySwal.fire({
          icon: 'error',
          title: 'Authentication Error',
          text: 'Your session has expired. Please login again.',
          confirmButtonColor: '#3085d6',
        }).then(() => {
          localStorage.removeItem('token');
          // Redirect to login
        });
      } else {
        MySwal.fire({
          icon: 'error',
          title: 'Error!',
          text: err.response?.data?.message || 'Failed to fetch templates. Please try again later.',
          confirmButtonColor: '#3085d6',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Only fetch templates if user info is available
    if (userInfo) {
      fetchTemplates();
    }
  }, [userInfo]);

  const handleCreateTemplate = async () => {
    if (!newTemplate.name.trim()) {
      MySwal.fire({
        icon: 'warning',
        title: 'Validation Error',
        text: 'Please enter a template name.',
        confirmButtonColor: '#3085d6',
      });
      return;
    }

    if (!newTemplate.templateFile) {
      MySwal.fire({
        icon: 'warning',
        title: 'Validation Error',
        text: 'Please select a template file.',
        confirmButtonColor: '#3085d6',
      });
      return;
    }

    setCreateLoading(true);
    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('name', newTemplate.name);
      formData.append('category', newTemplate.category);
      formData.append('type', newTemplate.type);
      formData.append('status', newTemplate.status);
      formData.append('templateFile', newTemplate.templateFile);

      const response = await axios.post(`${API_BASE_URL}/admin/templates`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      MySwal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Template created successfully.',
        confirmButtonColor: '#3085d6',
      });

      // Reset form
      setNewTemplate({
        name: '',
        category: 'Onboarding',
        type: 'Email',
        status: 'active',
        templateFile: null,
      });
      setShowCreateForm(false);
      
      // Refresh templates list
      fetchTemplates();
    } catch (err) {
      console.error('Error creating template:', err);
      MySwal.fire({
        icon: 'error',
        title: 'Error!',
        text: err.response?.data?.message || 'Failed to create template. Please try again.',
        confirmButtonColor: '#3085d6',
      });
    } finally {
      setCreateLoading(false);
    }
  };

  const handleViewTemplate = async (template) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_BASE_URL}/admin/templates/${template.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      const fullTemplate = {
        ...template,
        ...response.data,
        status: response.data.status === 'active' ? 'Active' : 'Draft',
        usageCount: response.data.usageCount || 0,
      };
      
      setSelectedTemplate(fullTemplate);
      setEditedTemplate({ ...fullTemplate });
      setEditMode(false);
      setShowTemplateTable(false);
    } catch (err) {
      console.error('Error fetching template details:', err);
      MySwal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to load template details.',
        confirmButtonColor: '#3085d6',
      });
    }
  };

  const handleBackToTable = () => {
    setSelectedTemplate(null);
    setEditedTemplate(null);
    setEditMode(false);
    setShowTemplateTable(true);
    setShowCreateForm(false);
  };

  const handleEditToggle = () => {
    setEditMode(!editMode);
  };

  const handleSaveTemplate = async () => {
    setUpdateLoading(true);
    try {
      const token = localStorage.getItem('token');
      const updateData = {
        name: editedTemplate.name,
        category: editedTemplate.category,
        type: editedTemplate.type,
        status: editedTemplate.status === 'Active' ? 'active' : 'draft',
      };

      const response = await axios.put(
        `${API_BASE_URL}/admin/templates/${editedTemplate.id}`,
        updateData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      // Update the templates list
      const updatedTemplate = {
        ...editedTemplate,
        status: response.data.template.status === 'active' ? 'Active' : 'Draft',
      };
      
      setTemplates(templates.map(t => t.id === editedTemplate.id ? updatedTemplate : t));
      setSelectedTemplate(updatedTemplate);
      setEditMode(false);
      
      MySwal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Template updated successfully.',
        confirmButtonColor: '#3085d6',
      });
    } catch (err) {
      console.error('Error updating template:', err);
      MySwal.fire({
        icon: 'error',
        title: 'Error!',
        text: err.response?.data?.message || 'Failed to update template. Please try again.',
        confirmButtonColor: '#3085d6',
      });
    } finally {
      setUpdateLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setEditedTemplate({ ...editedTemplate, [field]: value });
  };

  const handleNewTemplateChange = (field, value) => {
    setNewTemplate({ ...newTemplate, [field]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setNewTemplate({ ...newTemplate, templateFile: file });
  };

  const handleStatusToggle = async (template) => {
    try {
      const token = localStorage.getItem('token');
      const newStatus = template.status === 'Active' ? 'draft' : 'active';
      
      await axios.put(
        `${API_BASE_URL}/admin/templates/${template.id}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const updatedTemplates = templates.map(t =>
        t.id === template.id
          ? { ...t, status: newStatus === 'active' ? 'Active' : 'Draft' }
          : t
      );
      setTemplates(updatedTemplates);
      
      // Update selectedTemplate if it's currently viewing the modified template
      if (selectedTemplate && selectedTemplate.id === template.id) {
        const updatedTemplate = updatedTemplates.find(t => t.id === template.id);
        setSelectedTemplate(updatedTemplate);
        setEditedTemplate(updatedTemplate);
      }

      MySwal.fire({
        icon: 'success',
        title: 'Success!',
        text: `Template ${newStatus === 'active' ? 'activated' : 'deactivated'} successfully.`,
        confirmButtonColor: '#3085d6',
      });
    } catch (err) {
      console.error('Error toggling template status:', err);
      MySwal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to update template status.',
        confirmButtonColor: '#3085d6',
      });
    }
  };

  const handleDeleteTemplate = async (template) => {
    const result = await MySwal.fire({
      title: 'Are you sure?',
      text: `This will permanently delete the template "${template.name}".`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    });

    if (result.isConfirmed) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`${API_BASE_URL}/admin/templates/${template.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setTemplates(templates.filter(t => t.id !== template.id));
        
        MySwal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'Template has been deleted successfully.',
          confirmButtonColor: '#3085d6',
        });
      } catch (err) {
        console.error('Error deleting template:', err);
        MySwal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Failed to delete template.',
          confirmButtonColor: '#3085d6',
        });
      }
    }
  };

  const handleDuplicateTemplate = (template) => {
    const newTemplate = {
      ...template,
      id: Math.max(...templates.map(t => t.id)) + 1,
      name: `${template.name} (Copy)`,
      createdAt: new Date().toLocaleDateString(),
      lastModified: new Date().toLocaleDateString(),
      usageCount: 0,
      status: 'Draft'
    };
    setTemplates([...templates, newTemplate]);
    
    MySwal.fire({
      icon: 'success',
      title: 'Success!',
      text: 'Template duplicated successfully.',
      confirmButtonColor: '#3085d6',
    });
  };

  // Search and pagination logic
  const filteredTemplates = useMemo(() => {
    if (!searchValue.trim()) {
      return templates;
    }
    
    const searchTerm = searchValue.toLowerCase().trim();
    return templates.filter(template => {
      return (
        template.id.toString().includes(searchTerm) ||
        template.name.toLowerCase().includes(searchTerm) ||
        template.type.toLowerCase().includes(searchTerm) ||
        template.category.toLowerCase().includes(searchTerm) ||
        template.createdBy.toLowerCase().includes(searchTerm)
      );
    });
  }, [templates, searchValue]);

  const totalPages = Math.ceil(filteredTemplates.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTemplates = filteredTemplates.slice(startIndex, startIndex + itemsPerPage);

  const handleSearchChange = (value) => {
    setSearchValue(value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'Email': return <Mail className="w-4 h-4 mr-1 text-gray-600" />;
      case 'Document': return <FileText className="w-4 h-4 mr-1 text-gray-600" />;
      case 'SMS': return <Code className="w-4 h-4 mr-1 text-gray-600" />;
      default: return <FileText className="w-4 h-4 mr-1 text-gray-600" />;
    }
  };

  const getStatusColor = (status) => {
    return status === 'Active' ? 'text-green-600' : 'text-orange-600';
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Onboarding': 'text-blue-600 bg-blue-50',
      'Billing': 'text-green-600 bg-green-50',
      'Security': 'text-red-600 bg-red-50',
      'Legal': 'text-purple-600 bg-purple-50',
      'Alerts': 'text-orange-600 bg-orange-50',
      'Scheduling': 'text-indigo-600 bg-indigo-50'
    };
    return colors[category] || 'text-gray-600 bg-gray-50';
  };

  if (loading) {
    return (
      <div className="p-6 bg-white rounded-xl shadow-lg font-inter">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg text-gray-600">Loading templates...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg font-inter">
      {showCreateForm ? (
        /* Create Template Form */
        <div className="bg-white">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
            <h2 className="text-3xl font-semibold text-gray-800 flex items-center">
              <PlusCircle className="mr-3" />
              Add New Template
            </h2>
            <button
              onClick={handleBackToTable}
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-semibold rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
            >
              <X className="w-4 h-4 mr-2" />
              Cancel
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Template Name *</label>
                <input
                  type="text"
                  value={newTemplate.name}
                  onChange={(e) => handleNewTemplateChange('name', e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 font-medium"
                  placeholder="Enter template name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type *</label>
                <select
                  value={newTemplate.type}
                  onChange={(e) => handleNewTemplateChange('type', e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 font-medium"
                >
                  <option value="Email">Email</option>
                  <option value="Document">Document</option>
                  <option value="SMS">SMS</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                <select
                  value={newTemplate.category}
                  onChange={(e) => handleNewTemplateChange('category', e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 font-medium"
                >
                  <option value="Onboarding">Onboarding</option>
                  <option value="Billing">Billing</option>
                  <option value="Security">Security</option>
                  <option value="Legal">Legal</option>
                  <option value="Alerts">Alerts</option>
                  <option value="Scheduling">Scheduling</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={newTemplate.status}
                  onChange={(e) => handleNewTemplateChange('status', e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 font-medium"
                >
                  <option value="active">Active</option>
                  <option value="draft">Draft</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Template File *</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                  <div className="space-y-1 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                          onChange={handleFileChange}
                          accept=".doc,.docx,.pdf,.txt,.html"
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      DOC, DOCX, PDF, TXT, HTML up to 10MB
                    </p>
                    {newTemplate.templateFile && (
                      <p className="text-sm text-green-600 mt-2">
                        Selected: {newTemplate.templateFile.name}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200 flex justify-end space-x-3">
            <button
              onClick={handleBackToTable}
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-semibold rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleCreateTemplate}
              disabled={createLoading}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-semibold rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {createLoading ? 'Creating...' : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Create Template
                </>
              )}
            </button>
          </div>
        </div>
      ) : showTemplateTable ? (
        <>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 space-y-4 lg:space-y-0">
            <h2 className="text-3xl font-semibold text-gray-800 flex items-center">
              <FileText className="mr-3" />
              Template Management
            </h2>
            
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
              {/* Search Section */}
              <div className="flex items-center space-x-3">
                <Filter className="w-5 h-5 text-gray-600" />
                <input
                  type="text"
                  placeholder="Search templates..."
                  value={searchValue}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full sm:w-64"
                />
                
                {searchValue && (
                  <button
                    onClick={() => handleSearchChange('')}
                    className="px-3 py-2 text-xs font-semibold text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors whitespace-nowrap"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Add Template Button - Now more prominent */}
              <button
                onClick={() => setShowCreateForm(true)}
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-sm font-semibold rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <PlusCircle className="w-5 h-5 mr-2" />
                Add New Template
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    S.No
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Template Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Usage
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedTemplates.length > 0 ? (
                  paginatedTemplates.map((template, index) => (
                    <tr key={template.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-2.5 whitespace-nowrap text-sm font-medium text-gray-900">
                        {startIndex + index + 1}
                      </td>
                      <td className="px-4 py-2.5 whitespace-nowrap text-sm font-medium text-gray-900 flex items-center">
                        <Hash className="w-4 h-4 mr-1 text-gray-600" />
                        {template.id}
                      </td>
                      <td className="px-4 py-2.5 whitespace-nowrap text-sm font-medium text-gray-900">
                        {template.name}
                      </td>
                      <td className="px-4 py-2.5 whitespace-nowrap text-sm font-medium text-gray-900 flex items-center">
                        {getTypeIcon(template.type)}
                        {template.type}
                      </td>
                      <td className="px-4 py-2.5 whitespace-nowrap text-sm">
                        <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${getCategoryColor(template.category)}`}>
                          {template.category}
                        </span>
                      </td>
                      <td className={`px-4 py-2.5 whitespace-nowrap text-sm font-semibold ${getStatusColor(template.status)}`}>
                        {template.status}
                      </td>
                      <td className="px-4 py-2.5 whitespace-nowrap text-sm font-medium text-gray-900">
                        {template.usageCount}
                      </td>
                      <td className="px-4 py-2.5 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-1">
                          <button
                            onClick={() => handleViewTemplate(template)}
                            className="inline-flex items-center px-2 py-1.5 border border-gray-300 text-xs leading-4 font-semibold rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
                          >
                            <Eye className="w-3 h-3 mr-1" />
                            View
                          </button>
                          <button
                            onClick={() => handleStatusToggle(template)}
                            className="inline-flex items-center px-2 py-1.5 border border-gray-300 text-xs leading-4 font-semibold rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
                          >
                            {template.status === 'Active' ? 'Deactivate' : 'Activate'}
                          </button>
                          <button
                            onClick={() => handleDuplicateTemplate(template)}
                            className="inline-flex items-center px-2 py-1.5 border border-gray-300 text-xs leading-4 font-semibold rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
                          >
                            <Copy className="w-3 h-3 mr-1" />
                            Copy
                          </button>
                          <button
                            onClick={() => handleDeleteTemplate(template)}
                            className="inline-flex items-center px-2 py-1.5 border border-red-300 text-xs leading-4 font-semibold rounded-lg text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                          >
                            <Trash2 className="w-3 h-3 mr-1" />
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="px-4 py-8 text-center text-gray-500">
                      No templates found matching your search criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          {filteredTemplates.length > 0 && (
            <div className="flex items-center justify-between mt-6 px-2">
              <div className="text-sm text-gray-700">
                Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredTemplates.length)} of {filteredTemplates.length} entries
                {searchValue && (
                  <span className="text-gray-500"> (filtered from {templates.length} total entries)</span>
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
        /* Template Detail View */
        <div className="bg-white">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
            <h2 className="text-3xl font-semibold text-gray-800 flex items-center">
              <FileText className="mr-3" />
              Template Details
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
                    onClick={handleSaveTemplate}
                    disabled={updateLoading}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-semibold rounded-lg text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {updateLoading ? 'Saving...' : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Save
                      </>
                    )}
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
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h4 className="text-lg font-medium text-gray-900 border-b pb-2">Template Information</h4>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Template ID</label>
                <div className="flex items-center">
                  <Hash className="w-4 h-4 mr-2 text-gray-600" />
                  <span className="text-sm text-gray-900">{selectedTemplate.id}</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Template Name</label>
                {editMode ? (
                  <input
                    type="text"
                    value={editedTemplate.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 font-medium"
                  />
                ) : (
                  <p className="text-sm text-gray-900">{selectedTemplate.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                {editMode ? (
                  <select
                    value={editedTemplate.type}
                    onChange={(e) => handleInputChange('type', e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 font-medium"
                  >
                    <option value="Email">Email</option>
                    <option value="Document">Document</option>
                    <option value="SMS">SMS</option>
                  </select>
                ) : (
                  <div className="flex items-center">
                    {getTypeIcon(selectedTemplate.type)}
                    <span className="text-sm text-gray-900">{selectedTemplate.type}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                {editMode ? (
                  <select
                    value={editedTemplate.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 font-medium"
                  >
                    <option value="Onboarding">Onboarding</option>
                    <option value="Billing">Billing</option>
                    <option value="Security">Security</option>
                    <option value="Legal">Legal</option>
                    <option value="Alerts">Alerts</option>
                    <option value="Scheduling">Scheduling</option>
                  </select>
                ) : (
                  <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${getCategoryColor(selectedTemplate.category)}`}>
                    {selectedTemplate.category}
                  </span>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <span className={`text-sm font-medium ${getStatusColor(selectedTemplate.status)}`}>
                  {selectedTemplate.status}
                </span>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Usage Count</label>
                <p className="text-sm text-gray-900">{selectedTemplate.usageCount} times used</p>
              </div>
            </div>

            {/* Content Information */}
            <div className="space-y-4">
              <h4 className="text-lg font-medium text-gray-900 border-b pb-2">Content & Metadata</h4>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                {editMode ? (
                  <textarea
                    value={editedTemplate.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    rows={2}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 font-medium"
                  />
                ) : (
                  <p className="text-sm text-gray-900">{selectedTemplate.description}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject/Title</label>
                {editMode ? (
                  <input
                    type="text"
                    value={editedTemplate.subject}
                    onChange={(e) => handleInputChange('subject', e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 font-medium"
                  />
                ) : (
                  <p className="text-sm text-gray-900">{selectedTemplate.subject}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Created By</label>
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-2 text-gray-600" />
                  <span className="text-sm text-gray-900">{selectedTemplate.createdBy}</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Created At</label>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2 text-gray-600" />
                  <span className="text-sm text-gray-900">{selectedTemplate.createdAt}</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Modified</label>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2 text-gray-600" />
                  <span className="text-sm text-gray-900">{selectedTemplate.lastModified}</span>
                </div>
              </div>

              {selectedTemplate.gcs_path && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">File Path</label>
                  <p className="text-sm text-gray-600 break-all">{selectedTemplate.gcs_path}</p>
                </div>
              )}
            </div>
          </div>

          {/* Template Content Section */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h4 className="text-lg font-medium text-gray-900 mb-4">Template Content</h4>
            {editMode ? (
              <textarea
                value={editedTemplate.content}
                onChange={(e) => handleInputChange('content', e.target.value)}
                rows={8}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
                placeholder="Enter template content with variables like {{variable_name}}..."
              />
            ) : (
              <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm text-gray-800 whitespace-pre-wrap">
                {selectedTemplate.content}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TemplateManagement;
