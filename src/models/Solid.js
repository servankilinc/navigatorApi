import mongoose from "mongoose";

const solidPolygonSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["Polygon"],
    required: true,
  },
  coordinates: {
    type: [[[Number]]],
    required: true,
  },
});

const solidFeatureSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["Feature"],
    required: true,
  },
  geometry: {
    type: solidPolygonSchema,
    required: true,
  },
  properties: {
    id: { type: String, required: true },
    floor: { type: Number, required: true },
    name: { type: String },
    popupContent: { type: String },
    base_height: { type: Number, required: true },
    height: { type: Number, required: true },
    color: { type: String, required: true },
  },
});

const featureCollectionSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["FeatureCollection"],
      required: true,
    },
    features: {
      type: [solidFeatureSchema],
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Solid", featureCollectionSchema);
