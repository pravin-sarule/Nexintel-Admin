// models/adminModel.js
const pool = require('../config/db');

exports.findByEmail = async (email) => {
  const res = await pool.query('SELECT * FROM admins WHERE email = $1', [email]);
  return res.rows[0];
};
