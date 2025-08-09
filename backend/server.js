// const express = require('express');
// const cors = require('cors');
// require('dotenv').config();

// const connectDB = require('./config/db');
// const authRoutes = require('./routes/authRoutes');

// const app = express();

// // Connect Database
// const pool = connectDB();

// app.use(cors({
//   origin: 'http://localhost:3001'
// }));
// app.use(express.json());

// app.use('/api/auth', authRoutes(pool));

// const PORT = process.env.PORT || 5000;

// const server = app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

// // Handle unhandled promise rejections
// process.on('unhandledRejection', (err, promise) => {
//   console.error(`Error: ${err.message}`);
//   // Close server & exit process
//   server.close(() => process.exit(1));
// });
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const pool = require('./config/db'); // ✅ Import shared pool
const sequelize = require('./config/sequelize'); // Import Sequelize instance
const Template = require('./models/template'); // Import Template model
const UserTemplateUsage = require('./models/userTemplateUsage'); // Import UserTemplateUsage model

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const adminTemplateRoutes = require('./routes/adminTemplateRoutes'); // Import admin template routes

const app = express();

app.use(cors({
  origin: 'http://localhost:3001',
}));

app.use(express.json());

// Logging middleware to see all incoming requests
app.use((req, res, next) => {
  console.log(`Incoming Request: ${req.method} ${req.originalUrl}`);
  next();
});

// ✅ Pass pool to route module
app.use('/api/auth', authRoutes(pool));
app.use('/api/users', userRoutes (pool));
app.use('/admin/templates', adminTemplateRoutes(pool)); // Pass pool to admin template routes

// Sync Sequelize models with the database and start server
(async () => {
  try {
    await sequelize.sync({ alter: true }); // `alter: true` will update tables to match models
    console.log('Database & tables synced!');

    const PORT = 5000; // Explicitly set PORT to 5000

    const server = app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      // Keep the process alive for demonstration/debugging if it's exiting unexpectedly
      // In a real application, app.listen() should keep the process alive.
      setInterval(() => {
        console.log('Server is still running (interval check)...'); // Log more frequently
      }, 5 * 1000); // Log every 5 seconds
    });

    // Graceful error handling for unhandled promise rejections
    process.on('unhandledRejection', (err) => {
      console.error('Unhandled Rejection (Promise):', err); // Log full error object for more details
      server.close(() => {
        pool.end().then(() => console.log('PostgreSQL pool closed.')).catch(e => console.error('Error closing pool:', e));
        process.exit(1);
      });
    });

    // Graceful error handling for uncaught synchronous exceptions
    process.on('uncaughtException', (err) => {
      console.error('Uncaught Exception (Synchronous):', err); // Log full error object for more details
      server.close(() => {
        pool.end().then(() => console.log('PostgreSQL pool closed.')).catch(e => console.error('Error closing pool:', e));
        process.exit(1);
      });
    });

    // Log process exit for debugging
    process.on('exit', (code) => {
      console.log(`Process exited with code: ${code}`);
    });

  } catch (err) {
    console.error('Fatal Error during startup (database sync or server listen):', err);
    process.exit(1);
  }
})();

// Catch-all for 404 Not Found errors - MUST be after all other routes
app.use((req, res, next) => {
  res.status(404).json({ message: 'API Endpoint Not Found' });
});
