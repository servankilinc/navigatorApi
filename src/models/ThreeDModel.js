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

const threeDModelSchema = new mongoose.Schema(
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
      floor: { type: Number, required: true },
      name: { type: String },
      source: { type: String, required: true },
      scaleRate: { type: Number, required: true },
      rotateX: { type: Number, required: true },
      rotateY: { type: Number, required: true },
      rotateZ: { type: Number, required: true },
    },
  },
  { timestamps: true } // createdAt ve updatedAt otomatik eklenir
);

export default mongoose.model("ThreeDModel", threeDModelSchema);
