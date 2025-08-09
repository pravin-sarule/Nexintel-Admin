// const pool = require('../config/db');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

// const loginAdmin = async (req, res) => {
//   const { email, password } = req.body;
//   console.log('Login attempt for email:', email);

//   try {
//     console.log('Attempting database query for admin with email:', email);
//     const result = await pool.query('SELECT * FROM admins WHERE email = $1', [email]);
//     const admin = result.rows[0];
//     console.log('Database query successful. Admin found:', admin);

//     if (!admin) {
//       console.log('Admin not found for email:', email);
//       return res.status(404).json({ message: 'Admin not found' });
//     }

//     console.log('Attempting to compare password for admin ID:', admin.id);
//     const isMatch = await bcrypt.compare(password, admin.password);
//     console.log('Password comparison result:', isMatch);

//     if (!isMatch) {
//       console.log('Invalid credentials for email:', email);
//       return res.status(401).json({ message: 'Invalid credentials' });
//     }

//     console.log('Attempting to sign JWT token for admin ID:', admin.id);
//     const token = jwt.sign(
//       { id: admin.id, role: admin.role },
//       process.env.JWT_SECRET,
//       { expiresIn: '2h' }
//     );
//     console.log('Token generated for admin ID:', admin.id);

//     res.status(200).json({
//       token,
//       admin: {
//         id: admin.id,
//         email: admin.email,
//         role: admin.role
//       }
//     });
//     console.log('Login successful for admin ID:', admin.id);
//   } catch (error) {
//     console.error('Server error during login:', error.message);
//     console.error('Error stack:', error.stack); // Add stack trace for more details
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };

// const getAdminProfile = async (req, res) => {
//   try {
//     const admin = await pool.query('SELECT id, email, role FROM admins WHERE id = $1', [req.admin.id]);
//     res.json(admin.rows[0]);
//   } catch (err) {
//     console.error('Error fetching admin profile:', err.message);
//     res.status(500).send('Server Error');
//   }
// };

// module.exports = {
//   loginAdmin,
//   getAdminProfile,
// };

// controllers/adminController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (pool) => {
  const loginAdmin = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    try {
      const result = await pool.query('SELECT * FROM admins WHERE email = $1', [email]);
      const admin = result.rows[0];

      if (!admin) {
        return res.status(404).json({ message: 'Admin not found' });
      }

      const isMatch = await bcrypt.compare(password, admin.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const token = jwt.sign(
        { id: admin.id, role: admin.role },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );
      console.log(`JWT token generated for user ID: ${admin.id}, with role: ${admin.role}`); // Log role in token

      res.status(200).json({
        token,
        admin: {
          id: admin.id,
          email: admin.email,
          role: admin.role
        }
      });
    } catch (error) {
      console.error('Login error:', error.message);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };

  return {
    loginAdmin,
  };
};
