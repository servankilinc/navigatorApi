import mongoose from 'mongoose';
import { entrancePointSchema } from './EntrancePoint.js';

// GeoJSON Polygon Schema (geometry)
const polygonGeoJsonSchema = new mongoose.Schema({
  type: {
      type: String,
      enum: ['Polygon'],
      required: true
  },
  coordinates: {
      type: [[[Number]]], // [[[lon, lat], [lon, lat], ...]]
      required: true
  }
});

// Polygon Schema (Ana Model)
const polygonSchema = new mongoose.Schema({
  type: {
      type: String,
      enum: ['Feature'],
      required: true
  },
  geometry: {
      type: polygonGeoJsonSchema,
      required: true
  },
  properties: {
      layerId: { type: Number },
      id: { type: String, required: true },
      floor: { type: Number, required: true },
      name: { type: String },
      popupContent: { type: String },
      entrance: entrancePointSchema // Opsiyonel entrance point
  }
}, { timestamps: true });

export default mongoose.model('Polygon', polygonSchema); 