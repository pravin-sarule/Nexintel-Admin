const pool = require('../config/db');
const { uploadTemplateToGCS, deleteFromGCS } = require('../services/gcsService');

// Upload Template
exports.uploadTemplate = async (req, res) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ error: 'No file uploaded' });

    const { path, url } = await uploadTemplateToGCS(file.originalname, file.buffer);
    await pool.query(`
      INSERT INTO templates (name, gcs_path, file_url, uploaded_by)
      VALUES ($1, $2, $3, $4)
    `, [file.originalname, path, url, req.admin.id]);

    res.json({ message: 'Template uploaded successfully', url });
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ error: 'Template upload failed' });
  }
};

// List Templates
exports.getTemplates = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM templates ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('Fetch error:', err);
    res.status(500).json({ error: 'Failed to fetch templates' });
  }
};

// Delete Template
exports.deleteTemplate = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM templates WHERE id = $1', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Template not found' });

    const template = result.rows[0];
    await deleteFromGCS(template.gcs_path);
    await pool.query('DELETE FROM templates WHERE id = $1', [id]);

    res.json({ message: 'Template deleted successfully' });
  } catch (err) {
    console.error('Delete error:', err);
    res.status(500).json({ error: 'Failed to delete template' });
  }
};
