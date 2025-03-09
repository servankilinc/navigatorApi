import express from 'express';
import Solid from '../models/Solid.js';

const router = express.Router();

// GET all 
router.get('/', async (req, res) => {
  try {
    const solids = await Solid.find();
    res.status(200).json(solids);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET single
router.get('/:id', async (req, res) => {
  try {
    const solid = await Solid.findById(req.params.id);
    if (!solid) {
      throw new Error('Solid not found');
    }
    res.status(200).json(solid);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST new 
router.post('/', async (req, res) => {  
  try {
    const solid = new Solid(req.body);
    const newSolid = await solid.save();
    if (!newSolid) {
      throw new Error('Solid not created');
    }
    res.status(201).json(newSolid);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// POST multiple 
router.post('/CreateAll', async (req, res) => {
  try {
    const solids = req.body.map(item => new Solid(item));
    const newSolids = await Solid.insertMany(solids);
    if (!newSolids) {
      throw new Error('Solids not created');
    }
    res.status(201).json(newSolids);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post('/UpdateAll', async (req, res) => {
  try {
    var clearedSolids = await Solid.deleteMany({});
    if (!clearedSolids) {
      throw new Error('Solids not found');
    }
    const solids = req.body.map(item => new Solid(item));
    const newSolids = await Solid.insertMany(solids);
    if (!newSolids) {
      throw new Error('Solids not updated');
    }
    res.status(201).json(newSolids);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


// PATCH update
router.patch('/:id', async (req, res) => {
  try {
    const solid = await Solid.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true }
    );
    if (!solid) {
      throw new Error('Solid point not found');
    }
    res.json(solid);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE 
router.delete('/:id', async (req, res) => {
  try {
    const solid = await Solid.findByIdAndDelete(req.params.id);
    if (!solid) {
      throw new Error('Solid not found');
    }
    res.status(200).json({ message: 'Solid deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router; 