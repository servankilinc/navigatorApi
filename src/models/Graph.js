import mongoose from 'mongoose';

// Node Schema
const nodeSchema = new mongoose.Schema({
  id: { type: Number, required: true },                   // Node id
  coordinate: { type: [Number], required: true }          // [lon, lat]
});

// Edge Schema
const edgeSchema = new mongoose.Schema({
  source: { type: String, required: true },                // Kaynak node id
  sourceCoordinate: { type: [Number], required: true },    // [lon, lat]
  target: { type: String, required: true },                // Hedef node id
  targetCoordinate: { type: [Number], required: true },    // [lon, lat]
  weight: { type: Number, required: true }                  // Mesafe/Ağırlık
});

// Graph Schema
const graphSchema = new mongoose.Schema({
  floor: { type: Number, required: true },                  // Hangi kat
  nodes: [nodeSchema],                                     // Node listesi
  edges: [edgeSchema]                                      // Edge listesi
}, { timestamps: true });

export default mongoose.model('Graph', graphSchema); 