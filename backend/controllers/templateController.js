// const Template = require('../models/template');
// const UserTemplateUsage = require('../models/userTemplateUsage');
// const { bucket } = require('../middleware/upload');
// const { Op } = require('sequelize');

// // POST /admin/templates
// exports.createTemplate = async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ message: 'No file uploaded.' });
//     }

//     const { name, category, type, status = 'active' } = req.body;
//     const gcs_path = req.file.gcsUrl;

//     const template = await Template.create({
//       name,
//       category,
//       type,
//       status,
//       gcs_path,
//     });

//     res.status(201).json({
//       message: 'Template uploaded and added successfully',
//       template,
//     });
//   } catch (error) {
//     console.error('Error creating template:', error);
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };

// // GET /admin/templates
// exports.getAllTemplates = async (req, res) => {
//   try {
//     const templates = await Template.findAll({
//       include: [{
//         model: UserTemplateUsage,
//         attributes: [],
//         duplicating: false,
//       }],
//       attributes: {
//         include: [
//           [
//             Template.sequelize.literal(`(
//               SELECT COUNT(*)
//               FROM user_template_usage AS usage
//               WHERE usage.template_id = "Template"."id"
//             )`),
//             'usageCount'
//           ]
//         ]
//       },
//       order: [['created_at', 'DESC']],
//     });

//     res.status(200).json(templates);
//   } catch (error) {
//     console.error('Error fetching templates:', error);
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };

// // GET /admin/templates/:id
// exports.getTemplateById = async (req, res) => {
//   try {
//     const template = await Template.findByPk(req.params.id, {
//       include: [{
//         model: UserTemplateUsage,
//         attributes: [],
//         duplicating: false,
//       }],
//       attributes: {
//         include: [
//           [
//             Template.sequelize.literal(`(
//               SELECT COUNT(*)
//               FROM user_template_usage AS usage
//               WHERE usage.template_id = "Template"."id"
//             )`),
//             'usageCount'
//           ]
//         ]
//       },
//     });

//     if (!template) {
//       return res.status(404).json({ message: 'Template not found' });
//     }

//     res.status(200).json(template);
//   } catch (error) {
//     console.error('Error fetching template by ID:', error);
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };

// // PUT /admin/templates/:id
// exports.updateTemplate = async (req, res) => {
//   try {
//     const { name, category, type, status } = req.body;
//     const template = await Template.findByPk(req.params.id);

//     if (!template) {
//       return res.status(404).json({ message: 'Template not found' });
//     }

//     template.name = name || template.name;
//     template.category = category || template.category;
//     template.type = type || template.type;
//     template.status = status || template.status;
//     template.updated_at = new Date();

//     await template.save();

//     res.status(200).json({
//       message: 'Template updated successfully',
//       template,
//     });
//   } catch (error) {
//     console.error('Error updating template:', error);
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };

// // DELETE /admin/templates/:id
// exports.deleteTemplate = async (req, res) => {
//   try {
//     const template = await Template.findByPk(req.params.id);

//     if (!template) {
//       return res.status(404).json({ message: 'Template not found' });
//     }

//     // Extract filename
//     const gcsFileName = template.gcs_path.split('/').slice(-2).join('/');
//     const file = bucket.file(gcsFileName);

//     // Delete from GCS
//     await file.delete().catch(err => {
//       console.warn('GCS file not found or already deleted:', err.message);
//     });

//     await template.destroy();

//     res.status(200).json({ message: 'Template deleted successfully' });
//   } catch (error) {
//     console.error('Error deleting template:', error);
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };
const Template = require('../models/template');
const UserTemplateUsage = require('../models/userTemplateUsage');
const { bucket } = require('../middleware/upload');
const { Op } = require('sequelize');

// POST /admin/templates
exports.createTemplate = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded.' });
    }

    const { name, category, type, status = 'active' } = req.body;
    const gcs_path = req.file.gcsUrl;

    const template = await Template.create({
      name,
      category,
      type,
      status,
      gcs_path,
    });

    res.status(201).json({
      message: 'Template uploaded and added successfully',
      template,
    });
  } catch (error) {
    console.error('Error creating template:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// GET /admin/templates
exports.getAllTemplates = async (req, res) => {
  try {
    const templates = await Template.findAll({
      include: [{
        model: UserTemplateUsage,
        attributes: [],
        duplicating: false,
      }],
      attributes: {
        include: [
          [
            Template.sequelize.literal(`(
              SELECT COUNT(*)
              FROM user_template_usage AS usage
              WHERE usage.template_id = "Template"."id"
            )`),
            'usageCount'
          ]
        ]
      },
      order: [['created_at', 'DESC']],
    });

    res.status(200).json(templates);
  } catch (error) {
    console.error('Error fetching templates:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// GET /admin/templates/:id
exports.getTemplateById = async (req, res) => {
  try {
    const template = await Template.findByPk(req.params.id, {
      include: [{
        model: UserTemplateUsage,
        attributes: [],
        duplicating: false,
      }],
      attributes: {
        include: [
          [
            Template.sequelize.literal(`(
              SELECT COUNT(*)
              FROM user_template_usage AS usage
              WHERE usage.template_id = "Template"."id"
            )`),
            'usageCount'
          ]
        ]
      },
    });

    if (!template) {
      return res.status(404).json({ message: 'Template not found' });
    }

    res.status(200).json(template);
  } catch (error) {
    console.error('Error fetching template by ID:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// PUT /admin/templates/:id
exports.updateTemplate = async (req, res) => {
  try {
    const { name, category, type, status } = req.body;
    const template = await Template.findByPk(req.params.id);

    if (!template) {
      return res.status(404).json({ message: 'Template not found' });
    }

    template.name = name || template.name;
    template.category = category || template.category;
    template.type = type || template.type;
    template.status = status || template.status;
    template.updated_at = new Date();

    await template.save();

    res.status(200).json({
      message: 'Template updated successfully',
      template,
    });
  } catch (error) {
    console.error('Error updating template:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// DELETE /admin/templates/:id
exports.deleteTemplate = async (req, res) => {
  try {
    const template = await Template.findByPk(req.params.id);

    if (!template) {
      return res.status(404).json({ message: 'Template not found' });
    }

    // Extract filename
    const gcsFileName = template.gcs_path.split('/').slice(-2).join('/');
    const file = bucket.file(gcsFileName);

    // Delete from GCS
    await file.delete().catch(err => {
      console.warn('GCS file not found or already deleted:', err.message);
    });

    await template.destroy();

    res.status(200).json({ message: 'Template deleted successfully' });
  } catch (error) {
    console.error('Error deleting template:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};