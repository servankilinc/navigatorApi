import mongoose from 'mongoose';
// GeoJSON LineString Schema
const lineStringSchema = new mongoose.Schema({
  type: {
      type: String,
      enum: ['LineString'], // GeoJSON LineString
      required: true
  },
  coordinates: {
      type: [[Number]], // Array of [longitude, latitude]
      required: true
  }
});

// Path Schema
const pathSchema = new mongoose.Schema({
  type: {
      type: String,
      enum: ['Feature'], // GeoJSON Feature tipi
      required: true
  },
  geometry: {
      type: lineStringSchema, // Geometry kısmı GeoJSON LineString olacak
      required: true
  },
  properties: {
      layerId: { type: Number },
      id: { type: String, required: true }, // Zorunlu
      floor: { type: Number, required: true }, // Zorunlu
      name: { type: String }, // Opsiyonel
      popupContent: { type: String } // Opsiyonel
  }
}, { timestamps: true });

export default mongoose.model('Path', pathSchema); 