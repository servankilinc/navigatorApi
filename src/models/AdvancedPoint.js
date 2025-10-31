import mongoose from "mongoose";

// GeoJSON Point Schema
const pointSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["Point"],
    required: true,
    default: "Point",
  },
  coordinates: {
    type: [Number], // [longitude, latitude]
    required: true,
  },
});

// AdvancedPoint Schema
const advancedPointSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["Feature"],
      required: true,
      default: "Feature",
    },
    geometry: {
      type: pointSchema, // GeoJSON Point
      required: true,
    },
    properties: {
      layerId: { type: Number },
      id: { type: String, required: true },
      groupId: { type: String, required: true },
      type: { type: String },
      directionType: { type: String }, // "1", "2", "3"
      floor: { type: Number, required: true },
      name: { type: String },
      popupContent: { type: String },
    },
  },
  { timestamps: true }
);

export default mongoose.model("AdvancedPoint", advancedPointSchema);
