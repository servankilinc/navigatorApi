import mongoose from "mongoose";
 
const threeDModelSchema = new mongoose.Schema(
  {
    source: { type: String, required: true },
    origin: {
      type: [Number], // [lat, lng]
      required: true,
      validate: {
        validator: function (v) {
          return v.length === 2;
        },
        message: 'Origin must be an array of two numbers: [lat, lng]',
      },
    },
    scaleRate: { type: Number, required: true },
    rotateX: { type: Number, required: true },
    rotateY: { type: Number, required: true },
    rotateZ: { type: Number, required: true },
  },
  { timestamps: true } // createdAt ve updatedAt otomatik eklenir
);

export default mongoose.model("ThreeDModel", threeDModelSchema);
