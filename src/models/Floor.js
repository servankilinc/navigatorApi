import mongoose from 'mongoose';

const floorSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  index: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

export default mongoose.model('Floor', floorSchema); 