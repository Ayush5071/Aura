import mongoose from 'mongoose';

const ScrapCollectorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String,
  },
  areaPreferences: {
    type: [String], 
    required: true,
  },
  assignedPickups: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PickupSchedule',
  }],
  ratings: {
    averageRating: { type: Number, default: 0 },
    totalRatings: { type: Number, default: 0 },
  },
}, { timestamps: true });

const ScrapCollector = mongoose.model('ScrapCollector', ScrapCollectorSchema);
export default ScrapCollector;
