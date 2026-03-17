const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./db');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000', 'http://172.16.154.211:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Connect to MongoDB
connectDB();

// Route imports
const userRoutes = require('./Routes/Routing/userRoutes');
const assignmentRoutes = require('./Routes/Routing/assignmentRoutes');
const submissionRoutes = require('./Routes/Routing/submissionRoutes');
const evaluationRoutes = require('./Routes/Routing/evaluationRoutes');
const aiRoutes = require('./Routes/Routing/aiRoutes');
// const adminRoutes = require('./routes/Routing/adminRoutes'); // optional

// Mount routes
app.use('/api/users', userRoutes);
app.use('/api/assignments', assignmentRoutes);
app.use('/api/submissions', submissionRoutes);
app.use('/api/evaluations', evaluationRoutes);
app.use('/api/ai', aiRoutes);
// app.use('/api/admin', adminRoutes); // if used

// Health check route
app.get('/', (req, res) => {
  res.send('Assignment Evaluator API is Running');
});

// Start server
const config = require('./config');
app.listen(config.PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${config.PORT}`);
});
