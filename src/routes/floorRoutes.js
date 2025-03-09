import express from 'express';
import Floor from '../models/Floor.js';

const router = express.Router();

// GET all floors
router.get('/', async (req, res) => {
  try {
    const floors = await Floor.find();
    res.status(200).json(floors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET single floor
router.get('/:id', async (req, res) => {
  try {
    const floor = await Floor.findById(req.params.id);
    if (!floor) {
      throw new Error('Floor not found');
    }
    res.status(200).json(floor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST new floor
router.post('/', async (req, res) => {  
  try {
    const floor = new Floor(req.body);
    const newFloor = await floor.save();
    if (!newFloor) {
      throw new Error('Floor not created');
    }
    res.status(201).json(newFloor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// POST multiple floors
router.post('/CreateAll', async (req, res) => {
  try {
    const floors = req.body.map(item => new Floor(item));
    const newFloors = await Floor.insertMany(floors);
    if (!newFloors) {
      throw new Error('Floors not created');
    }
    res.status(201).json(newFloors);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post('/UpdateAll', async (req, res) => {
  try {
    var clearedFloors = await Floor.deleteMany({});
    if (!clearedFloors) {
      throw new Error('Entrance points not found');
    }
    const floors = req.body.map(item => new Floor(item));
    const newFloors = await Floor.insertMany(floors);
    if (!newFloors) {
      throw new Error('Floors not updated');
    }
    res.status(201).json(newFloors);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


// PATCH update floor
router.patch('/:id', async (req, res) => {
  try {
    const floor = await Floor.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true }
    );
    if (!floor) {
      throw new Error('Floor point not found');
    }
    res.json(floor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE floor
router.delete('/:id', async (req, res) => {
  try {
    const floor = await Floor.findByIdAndDelete(req.params.id);
    if (!floor) {
      throw new Error('Floor not found');
    }
    res.status(200).json({ message: 'Floor deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router; 