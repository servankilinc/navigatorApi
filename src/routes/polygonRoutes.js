import express from 'express';
import * as turf from "@turf/turf";
import Polygon from '../models/Polygon.js';
import Solid from '../models/Solid.js';



const router = express.Router();
 
router.get('/', async (req, res) => {
  try {
    const polygons = await Polygon.find();
    res.status(200).json(polygons);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// GET single
router.get('/:id', async (req, res) => {
  try {
    const polygon = await Polygon.findById(req.params.id);
    if (!polygon) {
      throw new Error('Polygon not found');
    }
    res.status(200).json(polygon);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST new path
router.post('/', async (req, res) => {
  try {
    const polygon = new Polygon(req.body);
    const newPolygon = await polygon.save();
    if (!newPolygon) {
      throw new Error('Polygon not found');
    }
    res.status(201).json(newPolygon);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// POST multiple
router.post('/CreateAll', async (req, res) => {
  try {
    const polygons = req.body.map(item => new Polygon(item));
    const newPolygons = await Polygon.insertMany(polygons);
    if (!newPolygons) {
      throw new Error('Polygons not created');
    }

    // -------------------- Solid Processes --------------------
    const clearedSolidList = await Solid.deleteMany({});
    if(!clearedSolidList) {
      throw new Error('Solids not cleared');
    }

    var solidPolyList = [];
    newPolygons.map(nPoly => {
      // ----- OUTSIDE -------
      const outerPolygon = turf.polygon(nPoly.geometry.coordinates);
      const offsetPolygon = turf.transformScale(outerPolygon, 0.9);
      
      solidPolyList.push({
        type: nPoly.type,
        geometry: offsetPolygon.geometry,
        properties: {
          id: nPoly.properties.id,
          floor: nPoly.properties.floor,
          name: nPoly.properties.name,
          popupContent: nPoly.properties.popupContent,
          base_height: 0,
          height: 3,
          color: "#BCCCDC"
        }
      });
      // ----- OUTSIDE -------
      
      // ----- INSIDE -------
      solidPolyList.push({
        type: nPoly.type,
        geometry: {...nPoly.geometry, coordinates: [nPoly.geometry.coordinates[0], offsetPolygon.geometry.coordinates[0]]},
        properties: {
          id: nPoly.properties.id,
          floor: nPoly.properties.floor,
          name: nPoly.properties.name,
          popupContent: nPoly.properties.popupContent,
          base_height: 0,
          height: 16,
          color: "#9AA6B2"
        }
      });
      // ----- INSIDE -------
    })

    const solidToInsert = new Solid({
      type: "FeatureCollection",
      features: [solidPolyList]
    })
    var newSolids = await Solid.insertMany(solidToInsert);
    if (!newSolids){
      throw new Error('Solids not created');
    }
    // -------------------- Solid Processes --------------------
    
    
    res.status(201).json(newPolygons);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// POST multiple
router.post('/UpdateAll', async (req, res) => {
  try {
    const clearedList = await Polygon.deleteMany({});
    if(!clearedList) {
      throw new Error('Paths not cleared');
    }
    const polygons = req.body.map(polygon => new Polygon(polygon));
    const newPolygons = await Polygon.insertMany(polygons);
    if (!newPolygons) {
      throw new Error('Polygons not updated');
    }

    // -------------------- Solid Processes --------------------
    const clearedSolidList = await Solid.deleteMany({});
    if(!clearedSolidList) {
      throw new Error('Solids not cleared');
    }

    var solidPolyList = [];
    newPolygons.map(nPoly => {

      // ----- OUTSIDE -------
      const outerPolygon = turf.polygon(nPoly.geometry.coordinates);
      const offsetPolygon = turf.transformScale(outerPolygon, 0.9);
      
      solidPolyList.push({
        type: nPoly.type,
        geometry: offsetPolygon.geometry,
        properties: {
          id: nPoly.properties.id,
          floor: nPoly.properties.floor,
          name: nPoly.properties.name,
          popupContent: nPoly.properties.popupContent,
          base_height: 0,
          height: 3,
          color: "#BCCCDC"
        }
      });
      // ----- OUTSIDE -------
      
      // ----- INSIDE -------
      solidPolyList.push({
        type: nPoly.type,
        geometry: {...nPoly.geometry, coordinates: [nPoly.geometry.coordinates[0], offsetPolygon.geometry.coordinates[0]]},
        properties: {
          id: nPoly.properties.id,
          floor: nPoly.properties.floor,
          name: nPoly.properties.name,
          popupContent: nPoly.properties.popupContent,
          base_height: 0,
          height: 16,
          color: "#9AA6B2"
        }
      });
      // ----- INSIDE -------
    })
 
    const solidToInsert = new Solid({
      type: "FeatureCollection",
      features: [...solidPolyList]
    })
     
    var newSolids = await Solid.insertMany(solidToInsert);
    if (!newSolids){
      throw new Error('Solids not created');
    }
    // -------------------- Solid Processes --------------------
    
    res.status(201).json(newPolygons);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PATCH update path
router.patch('/:id', async (req, res) => {
  try {
    const polygon = await Polygon.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true }
    );
    if (!polygon) {
      throw new Error('Polygon not found');
    } 
    res.json(polygon);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE path
router.delete('/:id', async (req, res) => {
  try {
    const polygon = await Polygon.findByIdAndDelete(req.params.id);
    if (!polygon) {
      throw new Error('Polygon not found');
    }
    res.status(200).json({ message: 'Polygon deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router; 