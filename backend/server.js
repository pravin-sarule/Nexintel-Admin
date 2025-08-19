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
// const express = require('express');
// const cors = require('cors');
// require('dotenv').config();

// const pool = require('./config/db'); // ✅ Import shared pool
// const sequelize = require('./config/sequelize'); // Import Sequelize instance
// const Template = require('./models/template'); // Import Template model
// const UserTemplateUsage = require('./models/userTemplateUsage'); // Import UserTemplateUsage model

// const authRoutes = require('./routes/authRoutes');
// const userRoutes = require('./routes/userRoutes');
// const adminTemplateRoutes = require('./routes/adminTemplateRoutes'); // Import admin template routes
// const planRoutes = require('./routes/plan.routes'); // Import plan routes

// const app = express();

// app.use('/api/admin/plans', planRoutes);

// app.use(cors({
//   origin: 'http://localhost:3001',
// }));

// app.use(express.json());

// // Logging middleware to see all incoming requests
// app.use((req, res, next) => {
//   console.log(`Incoming Request: ${req.method} ${req.originalUrl}`);
//   next();
// });

// // ✅ Pass pool to route module
// app.use('/api/auth', authRoutes(pool));
// app.use('/api/users', userRoutes (pool));
// app.use('/admin/templates', adminTemplateRoutes(pool)); // Pass pool to admin template routes

// // Sync Sequelize models with the database and start server
// (async () => {
//   try {
//     await sequelize.sync({ alter: true }); // `alter: true` will update tables to match models
//     console.log('Database & tables synced!');

//     const PORT = 5000; // Explicitly set PORT to 5000

//     const server = app.listen(PORT, () => {
//       console.log(`Server running on port ${PORT}`);
//       // Keep the process alive for demonstration/debugging if it's exiting unexpectedly
//       // In a real application, app.listen() should keep the process alive.
//       setInterval(() => {
//         console.log('Server is still running (interval check)...'); // Log more frequently
//       }, 5 * 1000); // Log every 5 seconds
//     });

//     // Graceful error handling for unhandled promise rejections
//     process.on('unhandledRejection', (err) => {
//       console.error('Unhandled Rejection (Promise):', err); // Log full error object for more details
//       server.close(() => {
//         pool.end().then(() => console.log('PostgreSQL pool closed.')).catch(e => console.error('Error closing pool:', e));
//         process.exit(1);
//       });
//     });

//     // Graceful error handling for uncaught synchronous exceptions
//     process.on('uncaughtException', (err) => {
//       console.error('Uncaught Exception (Synchronous):', err); // Log full error object for more details
//       server.close(() => {
//         pool.end().then(() => console.log('PostgreSQL pool closed.')).catch(e => console.error('Error closing pool:', e));
//         process.exit(1);
//       });
//     });

//     // Log process exit for debugging
//     process.on('exit', (code) => {
//       console.log(`Process exited with code: ${code}`);
//     });

//   } catch (err) {
//     console.error('Fatal Error during startup (database sync or server listen):', err);
//     process.exit(1);
//   }
// })();

// // Catch-all for 404 Not Found errors - MUST be after all other routes
// app.use((req, res, next) => {
//   res.status(404).json({ message: 'API Endpoint Not Found' });
// });
// const express = require('express');
// const cors = require('cors');
// require('dotenv').config();

// // --- Database & Model Imports ---
// const pool = require('./config/db'); // PostgreSQL pool
// const sequelize = require('./config/sequelize'); // Sequelize instance
// // Note: It's good practice to ensure models are imported, even if not directly used here,
// // so Sequelize is aware of them for the .sync() call.
// require('./models/template'); 
// require('./models/userTemplateUsage');

// // --- Route Imports ---
// const authRoutes = require('./routes/authRoutes');
// const userRoutes = require('./routes/userRoutes');
// const adminTemplateRoutes = require('./routes/adminTemplateRoutes');
// const planRoutes = require('./routes/planRoutes');

// // --- Express App Initialization ---
// const app = express();

// // --- Core Middleware (Order is CRITICAL) ---

// // 1. CORS Middleware: Handle cross-origin requests first.
// app.use(cors({
//   origin: 'http://localhost:3001', // Allow requests from your frontend
// }));

// // 2. JSON Body Parser: To parse `req.body` from JSON requests.
// app.use(express.json());

// // 3. Logging Middleware: To see all incoming requests.
// app.use((req, res, next) => {
//   console.log(`Incoming Request: ${req.method} ${req.originalUrl}`);
//   next();
// });

// // --- API Routes ---
// // All routes are defined AFTER the core middleware has been set up.
// app.use('/api/auth', authRoutes(pool));
// app.use('/api/users', userRoutes(pool));
// app.use('/api/admin/templates', adminTemplateRoutes(pool)); // Corrected path prefix
// app.use('/api/admin', planRoutes); // This now works correctly

// // --- Catch-all 404 Handler ---
// // This MUST be the last route handler.
// app.use((req, res, next) => {
//   res.status(404).json({ message: 'API Endpoint Not Found' });
// });

// // --- Server Startup and Database Sync ---
// const startServer = async () => {
//   try {
//     // Sync Sequelize models with the database
//     await sequelize.sync({ alter: true }); // `alter: true` updates tables to match models
//     console.log('Database & tables synced successfully!');

//     const PORT = process.env.PORT || 5000;

//     const server = app.listen(PORT, () => {
//       console.log(`Server running on port ${PORT}`);
//     });

//     // --- Graceful Shutdown Logic ---
//     const shutdown = (signal) => {
//       console.log(`\n${signal} received. Shutting down gracefully...`);
//       server.close(() => {
//         console.log('HTTP server closed.');
//         pool.end().then(() => {
//           console.log('PostgreSQL pool has been closed.');
//           process.exit(0);
//         }).catch(e => {
//           console.error('Error closing PostgreSQL pool:', e);
//           process.exit(1);
//         });
//       });
//     };

//     process.on('SIGINT', () => shutdown('SIGINT'));
//     process.on('SIGTERM', () => shutdown('SIGTERM'));

//     process.on('unhandledRejection', (err) => {
//       console.error('Unhandled Rejection:', err);
//       // In a real production app, you might want a more robust logger here
//     });

//     process.on('uncaughtException', (err) => {
//       console.error('Uncaught Exception:', err);
//       // It's generally advised to shut down on uncaught exceptions
//       shutdown('Uncaught Exception');
//     });

//   } catch (err) {
//     console.error('Fatal Error during startup:', err);
//     process.exit(1);
//   }
// };

// startServer();




const express = require('express');
const cors = require('cors');
require('dotenv').config();

// --- Database & Model Imports ---
const pool = require('./config/db'); // PostgreSQL pool
const sequelize = require('./config/sequelize'); // Sequelize instance
require('./models/template');
require('./models/userTemplateUsage');

// --- Route Imports ---
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const adminTemplateRoutes = require('./routes/adminTemplateRoutes');
const planRoutes = require('./routes/planRoutes');

// --- Express App Initialization ---
const app = express();

// --- CORS Configuration ---
const allowedOrigins = [
  'http://localhost:3001',
  'https://nexinteladmin.netlify.app'
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS blocked for origin: ${origin}`));
    }
  },
  credentials: true
}));

// Enable pre-flight requests across the board
// app.options('*', cors());

// --- Middleware ---
app.use(express.json());

app.use((req, res, next) => {
  console.log(`Incoming Request: ${req.method} ${req.originalUrl}`);
  next();
});

// --- API Routes ---
app.use('/api/auth', authRoutes(pool));
app.use('/api/users', userRoutes(pool));
app.use('/api/admin/templates', adminTemplateRoutes(pool));
app.use('/api/admin', planRoutes);

// --- 404 Handler ---
app.use((req, res) => {
  res.status(404).json({ message: 'API Endpoint Not Found' });
});

// --- Server Start ---
const startServer = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('Database synced!');

    const PORT = process.env.PORT || 5000;
    const server = app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

    // Graceful Shutdown
    const shutdown = (signal) => {
      console.log(`\n${signal} received. Closing server...`);
      server.close(() => {
        console.log('HTTP server closed.');
        pool.end().then(() => {
          console.log('PostgreSQL pool closed.');
          process.exit(0);
        }).catch(e => {
          console.error('Error closing PostgreSQL pool:', e);
          process.exit(1);
        });
      });
    };

    process.on('SIGINT', () => shutdown('SIGINT'));
    process.on('SIGTERM', () => shutdown('SIGTERM'));

    process.on('unhandledRejection', err => {
      console.error('Unhandled Rejection:', err);
    });

    process.on('uncaughtException', err => {
      console.error('Uncaught Exception:', err);
      shutdown('Uncaught Exception');
    });

  } catch (err) {
    console.error('Startup Error:', err);
    process.exit(1);
  }
};

startServer();

