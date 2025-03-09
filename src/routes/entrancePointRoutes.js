import express from 'express';
import EntrancePoint from '../models/EntrancePoint.js';

const router = express.Router();

// GET all entrance points
router.get('/', async (req, res) => {
  try {
    const points = await EntrancePoint.find();
    res.status(200).json(points);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET single entrance point
router.get('/:id', async (req, res) => {
  try {
    const point = await EntrancePoint.findById(req.params.id);
    if (!point) {
      throw new Error('Entrance point not found');
    }
    res.status(200).json(point);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// POST new entrance point
router.post('/', async (req, res) => {  
  try {
    const point = new EntrancePoint(req.body);
    const newPoint = await point.save();
    if (!newPoint) {
      throw new Error('Entrance point not created');
    }
    res.status(201).json(newPoint);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// POST multiple entrance points
router.post('/CreateAll', async (req, res) => {
  try {
    const points = req.body.map(point => new EntrancePoint(point));
    const newPoints = await EntrancePoint.insertMany(points);
    if (!newPoints) {
      throw new Error('Entrance points not created');
    }
    res.status(201).json(newPoints);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// POST multiple entrance points
router.post('/UpdateAll', async (req, res) => {
  try {
    const clearedPoints = await EntrancePoint.deleteMany({});
    if (!clearedPoints) {
      throw new Error('Entrance points not found');
    }
    const points = req.body.map(point => new EntrancePoint(point));
    const newPoints = await EntrancePoint.insertMany(points);
    if (!newPoints) {
      throw new Error('Entrance points not updated');
    }
    res.status(201).json(newPoints);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PATCH update entrance point
router.patch('/:id', async (req, res) => {
  try {
    const updatedPoint = await EntrancePoint.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true }
    );
    if (!updatedPoint) {
      throw new Error('Entrance point not found');
    }
    res.status(200).json(updatedPoint);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE entrance point
router.delete('/:id', async (req, res) => {
  try {
    const point = await EntrancePoint.findByIdAndDelete(req.params.id);
    if (!point) {
      throw new Error('Entrance point not found');
    }
    res.status(200).json({ message: 'Entrance point deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router; 