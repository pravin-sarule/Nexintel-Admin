const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer(); // memory storage
const controller = require('../controllers/templateController');
const { protect, adminOnly } = require('../middleware/auth');

router.post('/upload', protect, adminOnly, upload.single('file'), controller.uploadTemplate);
router.get('/', protect, adminOnly, controller.getTemplates);
router.delete('/:id', protect, adminOnly, controller.deleteTemplate);

module.exports = router;
