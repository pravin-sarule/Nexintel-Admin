const pool = require('../config/db');
const bcrypt = require('bcrypt');

exports.getAllUsers = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT id, username, email, auth_type, google_uid, firebase_uid, profile_image, is_blocked, role, created_at, updated_at
      FROM users
    `);
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

exports.toggleBlockUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await pool.query('SELECT is_blocked FROM users WHERE id = $1', [userId]);
    if (user.rows.length === 0) return res.status(404).json({ error: 'User not found' });

    const newStatus = !user.rows[0].is_blocked;
    await pool.query('UPDATE users SET is_blocked = $1, updated_at = NOW() WHERE id = $2', [newStatus, userId]);
    res.json({ message: `User ${newStatus ? 'blocked' : 'unblocked'} successfully` });
  } catch (err) {
    console.error('Error updating block status:', err);
    res.status(500).json({ error: 'Failed to update user status' });
  }
};

exports.updateUser = async (req, res) => {
  const { userId } = req.params;
  const { username, password } = req.body;
  try {
    const userRes = await pool.query('SELECT * FROM users WHERE id = $1', [userId]);
    if (userRes.rows.length === 0) return res.status(404).json({ error: 'User not found' });

    const user = userRes.rows[0];
    let hashedPassword = null;

    if (password && user.auth_type === 'manual') {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    await pool.query(`
      UPDATE users
      SET username = COALESCE($1, username),
          password = COALESCE($2, password),
          updated_at = NOW()
      WHERE id = $3
    `, [username, hashedPassword || user.password, userId]);

    res.json({ message: 'User updated successfully' });
  } catch (err) {
    console.error('Error updating user:', err);
    res.status(500).json({ error: 'Failed to update user' });
  }
};

// 📍 Unblock specific user
exports.unblockUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await pool.query('SELECT is_blocked FROM users WHERE id = $1', [userId]);
    if (user.rows.length === 0)
      return res.status(404).json({ error: 'User not found' });

    if (!user.rows[0].is_blocked)
      return res.status(400).json({ message: 'User is already unblocked' });

    await pool.query('UPDATE users SET is_blocked = false, updated_at = NOW() WHERE id = $1', [userId]);
    res.json({ message: 'User unblocked successfully' });
  } catch (err) {
    console.error('Error unblocking user:', err);
    res.status(500).json({ error: 'Failed to unblock user' });
  }
};