import mongoose from 'mongoose';

const LatLngSchema = new mongoose.Schema({
  lat: { type: Number, required: true },
  lng: { type: Number, required: true }
}, { _id: false });

const sketchSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  source: { type: String, required: true },
  corners: {
    type: [LatLngSchema],
    required: true
  },
  opacity: { type: Number, default: 0.7 },
  rotation: { type: Number, default: 0 },
  frozen: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model("Sketch", sketchSchema);