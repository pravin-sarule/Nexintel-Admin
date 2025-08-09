// const { Pool } = require('pg');
// require('dotenv').config();

// const connectDB = async () => {
//   try {
//     const pool = new Pool({
//       connectionString: process.env.DATABASE_URL,
//     });
//     await pool.connect();
//     console.log('PostgreSQL connected...');
//     return pool;
//   } catch (err) {
//     console.error(err.message);
//     // Exit process with failure
//     process.exit(1);
//   }
// };

// module.exports = connectDB;
// db.js
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on('connect', () => {
  console.log('PostgreSQL connected...');
});

// Add error handling for the pool
pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1); // Exit the process if a database error occurs
});

module.exports = pool;
