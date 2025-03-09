import express from 'express';
import Graph from '../models/Graph.js';


const router = express.Router();

// GET all graphs
router.get('/', async (req, res)=> {
  try {
    const graphs = await Graph.find().populate('nodes edges');
    res.status(200).json(graphs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET single graph
router.get('/:id', async (req, res) => {
  try {
    const graph = await Graph.findById(req.params.id).populate('nodes edges');
    if (!graph) {
      throw new Error('Graph not found');
    }
    res.status(200).json(graph);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


// POST new graph
router.post('/', async (req, res)=> {
  try {
    const graph = new Graph(req.body);
    const newGraph = await graph.save();
    if (!newGraph) {
      throw new Error('Graph not created');
    }
    res.status(201).json(newGraph);
  }
  catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// POST multiple
router.post('/CreateAll', async (req, res)=> {
  try {
    const graphs = req.body.map(item => new Graph(item));
    const newGraphs = await Graph.insertMany(graphs);
    if (!newGraphs) {
      throw new Error('Floors not created');
    }
    res.status(201).json(newGraphs);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


router.post('/UpdateAll', async (req, res)=> {
  try {
    const clearedGraphs = await Graph.deleteMany({});
    if (!clearedGraphs) {
      throw new Error('Graphs not found');
    }
    const graphs = req.body.map(item => new Graph(item));
    const newGraphs = await Graph.insertMany(graphs);
    if (!newGraphs) {
      throw new Error('Graphs not updated');
    }
    res.status(201).json(newGraphs);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


// PATCH update graph
router.patch('/:id', async (req, res)=> {
  try {
    const graph = await Graph.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true }
    );
    if (!graph) {
      throw new Error('Graph not found');
    }
    res.json(graph);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE graph
router.delete('/:id', async (req, res)=> {
  try {
    const graph = await Graph.findByIdAndDelete(req.params.id);
    if (!graph) {
      throw new Error('Graph not found');
    }
    res.json({ message: 'Graph deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router; 