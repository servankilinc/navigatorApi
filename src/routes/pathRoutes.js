import express from 'express';
import Path from '../models/Path.js';

const router = express.Router();

// GET all paths
router.get('/', async (req, res) => {
  try {
    const paths = await Path.find();
    res.status(200).json(paths);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// GET single path
router.get('/:id', async (req, res) => {
  try {
    const path = await Path.findById(req.params.id);
    if (!path) {
      throw new Error('Path not found');
    }
    res.status(200).json(path);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST new path
router.post('/', async (req, res) => {
  try {
    const path = new Path(req.body);
    const newPath = await path.save();
    if (!newPath) {
      throw new Error('Path not found');
    }
    res.status(201).json(newPath);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// POST multiple
router.post('/CreateAll', async (req, res) => {
  try {
    const paths = req.body.map(item => new Path(item));
    const newPaths = await Path.insertMany(paths);
    if (!newPaths) {
      throw new Error('Paths not created');
    }
    res.status(201).json(newPaths);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// POST multiple paths
router.post('/UpdateAll', async (req, res) => {
  try {
    const clearedList = await Path.deleteMany({});
    if(!clearedList) {
      throw new Error('Paths not cleared');
    }
    const paths = req.body.map(path => new Path(path));
    const newPaths = await Path.insertMany(paths);
    if (!newPaths) {
      throw new Error('Paths not updated');
    }
    res.status(201).json(newPaths);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PATCH update path
router.patch('/:id', async (req, res) => {
  try {
    const path = await Path.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true }
    );
    if (!path) {
      throw new Error('Path not found');
    } 
    res.json(path);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE path
router.delete('/:id', async (req, res) => {
  try {
    const path = await Path.findByIdAndDelete(req.params.id);
    if (!path) {
      throw new Error('Path not found');
    }
    res.status(200).json({ message: 'Path deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router; 