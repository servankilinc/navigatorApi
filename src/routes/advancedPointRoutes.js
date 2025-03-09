import express from 'express';
import AdvancedPoint from '../models/AdvancedPoint.js';

const router = express.Router();

// GET all advanced points
router.get('/', async (req, res) => {
  try {
    const points = await AdvancedPoint.find();
    res.status(200).json(points);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET single advanced point
router.get('/:id', async (req, res) => {
  try {
    const point = await AdvancedPoint.findById(req.params.id);
    if (!point) {
      throw new Error('Advanced point not found');
    }
    res.status(200).json(point);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST new advanced point
router.post('/', async (req, res) => {
  try {
    const point = new AdvancedPoint(req.body);
    const newPoint = await point.save();
    if (!newPoint) {
      throw new Error('Advanced point not created');
    }
    res.status(201).json(newPoint);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// POST multiple advanced points
router.post('/CreateAll', async (req, res) => {
  try {
    const points = req.body.map(point => new AdvancedPoint(point));
    const newPoints = await AdvancedPoint.insertMany(points);
    if (!newPoints) {
      throw new Error('Advanced points not created');
    }
    res.status(201).json(newPoints);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// POST multiple advanced points
router.post('/UpdateAll', async (req, res) => {
  try {
    const clearedPoints = await AdvancedPoint.deleteMany({});
    if (!clearedPoints) {
      throw new Error('Advanced points not found');
    }
    const points = req.body.map(point => new AdvancedPoint(point));
    const newPoints = await AdvancedPoint.insertMany(points);
    if (!newPoints) {
      throw new Error('Advanced points not updated');
    }
    res.status(201).json(newPoints);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PATCH update advanced point
router.patch('/:id', async (req, res) => {
  try {
    const updatedPoint = await AdvancedPoint.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true }
    );
    if (!updatedPoint) {
      throw new Error('Advanced point not found');
    }
    res.status(200).json(updatedPoint);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE advanced point
router.delete('/:id', async (req, res) => {
  try {
    const deletedPolygon = await AdvancedPoint.findByIdAndDelete(req.params.id);
    if (!deletedPolygon) {
      throw new Error('Advanced point not found');
    }
    res.status(200).json({ message: 'Advanced point deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router; 