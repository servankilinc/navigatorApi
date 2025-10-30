import express from 'express';
import ThreeDModel from '../models/ThreeDModel.js';
import multer from 'multer';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import path from 'path';
import fs from 'fs';

const router = express.Router();
 
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Proje ana dizini
const projectRoot = join(__dirname, '..', '..');
const baseDir = join(projectRoot, 'uploads', '3d');

// Static olarak servis et
router.use('/uploads', express.static(baseDir));

router.get('/list', (req, res) => {
  if (!fs.existsSync(baseDir)) return res.json([]);

  const models = fs.readdirSync(baseDir).filter(f => fs.statSync(path.join(baseDir, f)).isDirectory());
  res.json(models); // ["atm", "building1", ...]
});

router.get('/:modelName/:fileName', (req, res) => {
  const { modelName, fileName } = req.params;
  const filePath = path.join(baseDir, modelName, fileName);
  
  if (!fs.existsSync(filePath)) return res.status(404).send('Dosya bulunamadı');

  res.sendFile(filePath);
});

// GET all  
router.get('/', async (req, res) => {
  try {
    const threeDModels = await ThreeDModel.find();
    res.status(200).json(threeDModels);
  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET single  
router.get('/:id', async (req, res) => {
  try {
    const threeDModels = await ThreeDModel.findById(req.params.id);
    if (!threeDModels) {
      throw new Error('ThreeDModel not found');
    }
    res.status(200).json(threeDModels);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST new  
router.post('/', async (req, res) => {  
  try {
    const threeDModels = new ThreeDModel(req.body);
    const newThreeDModel = await threeDModels.save();
    if (!newThreeDModel) {
      throw new Error('ThreeDModel not created');
    }
    res.status(201).json(newThreeDModel);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// POST multiple
router.post('/CreateAll', async (req, res) => {
  try {
    const threeDModels = req.body.map(item => new ThreeDModel(item));
    const newThreeDModels = await ThreeDModel.insertMany(threeDModels);
    if (!newThreeDModels) {
      throw new Error('ThreeDModels not created');
    }
    res.status(201).json(newThreeDModels);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post('/UpdateAll', async (req, res) => {
  try {
    var clearedThreeDModels = await ThreeDModel.deleteMany({});
    if (!clearedThreeDModels) {
      throw new Error('Entrance points not found');
    }
    const threeDModels = req.body.map(item => new ThreeDModel(item));
    const newThreeDModels = await ThreeDModel.insertMany(threeDModels);
    if (!newThreeDModels) {
      throw new Error('ThreeDModels not updated');
    }
    res.status(201).json(newThreeDModels);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


// PATCH update 
router.patch('/:id', async (req, res) => {
  try {
    const threeDModel = await ThreeDModel.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true }
    );
    if (!threeDModel) {
      throw new Error('ThreeDModel not found');
    }
    res.json(threeDModel);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE ThreeDModel
router.delete('/:id', async (req, res) => {
  try {
    const threeDModel = await ThreeDModel.findByIdAndDelete(req.params.id);
    if (!threeDModel) {
      throw new Error('ThreeDModel not found');
    }
    res.status(200).json({ message: 'ThreeDModel deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router; 