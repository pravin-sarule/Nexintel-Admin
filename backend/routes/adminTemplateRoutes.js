// console.log('adminTemplateRoutes module loaded.'); // Top-level log

// const express = require('express');
// const { protect, authorize } = require('../middleware/authMiddleware'); // Import protect and authorize
// const { multer, uploadToGCS } = require('../middleware/upload');
// const {
//   createTemplate,
//   getAllTemplates,
//   getTemplateById,
//   updateTemplate,
//   deleteTemplate,
// } = require('../controllers/templateController');

// module.exports = (pool) => { // Accept pool as an argument
//   console.log('Initializing adminTemplateRoutes with pool.');
//   const router = express.Router();

//   // Protect all admin template routes
//   router.use(protect(pool)); // Pass pool to protect middleware
//   router.use(authorize(['admin'])); // No pool argument for authorize

//   router.route('/')
//     .post(multer.single('templateFile'), uploadToGCS, createTemplate) // Removed redundant protect, authorize
//     .get(getAllTemplates);

//   router.route('/:id')
//     .get(getTemplateById)
//     .put(updateTemplate)
//     .delete(deleteTemplate);

//   return router;
// };console.log('adminTemplateRoutes module loaded.');

const express = require('express');
const { protect, authorize } = require('../middleware/authMiddleware');
const { multer, uploadToGCS } = require('../middleware/upload');
const {
  createTemplate,
  getAllTemplates,
  getTemplateById,
  updateTemplate,
  deleteTemplate,
} = require('../controllers/templateController');

module.exports = (pool) => {
  console.log('Initializing adminTemplateRoutes with pool.');
  const router = express.Router();

  // Apply middleware
  router.use(protect(pool));             // Protect with JWT and user loading
  router.use(authorize(['admin']));      // Only allow admin

  router.route('/')
    .post(multer.single('templateFile'), uploadToGCS, createTemplate)
    .get(getAllTemplates);

  router.route('/:id')
    .get(getTemplateById)
    .put(updateTemplate)
    .delete(deleteTemplate);

  return router;
};
