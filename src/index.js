import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import advancedPointRoutes from './routes/advancedPointRoutes.js';
import entrancePointRoutes from './routes/entrancePointRoutes.js';
import floorRoutes from './routes/floorRoutes.js';
import graphRoutes from './routes/graphRoutes.js';
import pathRoutes from './routes/pathRoutes.js';
import polygonRoutes from './routes/polygonRoutes.js';
import solidRoutes from './routes/solidRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/advancedPoint', advancedPointRoutes);
app.use('/api/entrancePoint', entrancePointRoutes);
app.use('/api/floor', floorRoutes);
app.use('/api/graph', graphRoutes);
app.use('/api/path', pathRoutes);
app.use('/api/polygon', polygonRoutes);
app.use('/api/solid', solidRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 