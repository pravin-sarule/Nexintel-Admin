const express = require('express');
const router = express.Router();

const {
  getAllSecrets,
  fetchSecretValueFromGCP,
  createSecretInGCP
} = require('../controllers/secretManagerController');

// 🔍 GET /api/secrets → list all secrets (use ?fetch=true to include secret values)
router.get('/', getAllSecrets);

// 🔐 GET /api/secrets/:id → fetch secret value from GCP using internal UUID
router.get('/:id', fetchSecretValueFromGCP);

// 📥 POST /api/secrets/create → add new secret to GCP + DB
router.post('/create', createSecretInGCP);

module.exports = router;
