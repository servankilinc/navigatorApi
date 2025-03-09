import mongoose from 'mongoose';

// GeoJSON Point Schema (geometry)
const pointSchema = new mongoose.Schema({
  type: {
      type: String,
      enum: ['Point'],   // GeoJSON Point tipi
      required: true
  },
  coordinates: {
      type: [Number],   // [longitude, latitude]
      required: true
  }
});

// EntrancePoint Schema
export const entrancePointSchema = new mongoose.Schema({
  type: {
      type: String,
      enum: ['Feature'],   // GeoJSON Feature tipi
      required: true
  },
  geometry: {
      type: pointSchema,   // GeoJSON Point embedded
      required: true
  },
  properties: {
      layerId: { type: Number },
      id: { type: String, required: true },
      floor: { type: Number, required: true },
      name: { type: String },
      popupContent: { type: String },
      isEntrance: { type: Boolean, default: false },
      polygonId: { type: String }
  }
}, { timestamps: true });

export default mongoose.model('EntrancePoint', entrancePointSchema); 