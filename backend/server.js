const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();

// ✅ CORS Configuration - Allow frontend (port 5173)
app.use(cors({
  origin: ['https://temp-feature-1.onrender.com'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✅ MongoDB Connected Successfully');
    console.log('📊 Database:', process.env.MONGODB_URI);
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error.message);
    process.exit(1);
  }
};

connectDB();

// Import Routes
const serviceRoutes = require('./routes/serviceRoutes');

// Use Routes
app.use('/api/services', serviceRoutes);

// Test Route
app.get('/', (req, res) => {
  res.json({
    message: '🚀 Centennial Infotech Services API',
    status: 'running',
    endpoints: {
      getAllServices: 'GET /api/services',
      getServiceById: 'GET /api/services/:id',
      createService: 'POST /api/services/create'
    }
  });
});

// 404 Handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Error Handler
app.use((err, req, res, next) => {
  console.error('❌ Server Error:', err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`🔗 Frontend URL: http://localhost:5173`);
  console.log(`📝 API URL: http://localhost:${PORT}/api/services`);
});
