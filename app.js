import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import adminRoutes from './src/routes/adminRoutes.js';

dotenv.config();

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Use admin routes
app.use('/api/admin', adminRoutes);

const PORT = process.env.PORT || 5000; // Changed port to 5000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
