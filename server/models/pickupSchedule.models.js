import mongoose from 'mongoose';

const PickupScheduleSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  collectorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ScrapCollector',
    default: null,
  },
  scrapDetails: [{
    weight: { type: Number, required: true },
    type: { type: String, required: true }, 
  }],
  pickupDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected', 'completed'],
    default: 'pending',
  },
  location: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const PickupSchedule = mongoose.model('PickupSchedule', PickupScheduleSchema);

export default PickupSchedule;
