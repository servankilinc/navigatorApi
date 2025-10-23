import express from 'express';
import Sketch from '../models/Sketch.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const router = express.Router();

// ======= Multer Config =======
const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// ======= Public Uploads Folder =======
router.use('/uploads', express.static(uploadDir));


// POST /api/sketch/upload
router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const fileUrl = `uploads/${req.file.filename}`;
  
    res.status(200).json({ url: fileUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Upload failed', error });
  }
});


// GET all Sketchs
router.get('/', async (req, res) => {
  try {
    const points = await Sketch.find();
    res.status(200).json(points);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET single Sketch
router.get('/:id', async (req, res) => {
  try {
    const point = await Sketch.findById(req.params.id);
    if (!point) {
      throw new Error('Sketch not found');
    }
    res.status(200).json(point);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST new Sketch
router.post('/', async (req, res) => {
  try {
    const point = new Sketch(req.body);
    const newPoint = await point.save();
    if (!newPoint) {
      throw new Error('Sketch not created');
    }
    res.status(201).json(newPoint);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// POST multiple Sketchs
router.post('/CreateAll', async (req, res) => {
  try {
    const points = req.body.map(point => new Sketch(point));
    const newPoints = await Sketch.insertMany(points);
    if (!newPoints) {
      throw new Error('Sketchs not created');
    }
    res.status(201).json(newPoints);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// POST multiple Sketchs
router.post('/UpdateAll', async (req, res) => {
  try {
    const clearedPoints = await Sketch.deleteMany({});
    if (!clearedPoints) {
      throw new Error('Sketchs not found');
    }
    const points = req.body.map(point => new Sketch(point));
    const newPoints = await Sketch.insertMany(points);
    if (!newPoints) {
      throw new Error('Sketchs not updated');
    }
    res.status(201).json(newPoints);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PATCH update Sketch
router.patch('/:id', async (req, res) => {
  try {
    const updatedPoint = await Sketch.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true }
    );
    if (!updatedPoint) {
      throw new Error('Sketch not found');
    }
    res.status(200).json(updatedPoint);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE Sketch
router.delete('/:id', async (req, res) => {
  try {
    const deletedSketch = await Sketch.findOneAndDelete({ id: req.params.id });
    if (!deletedSketch) {
      throw new Error('Sketch not found');
    }
    res.status(200).json({ message: 'Sketch deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router; 