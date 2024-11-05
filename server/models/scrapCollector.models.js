import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const ScrapCollectorSchema = new mongoose.Schema(
  {
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
    areaPreference: {
      type: [String],
      required: true,
    },
    assignedPickups: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PickupSchedule',
      },
    ],
    historyRequests: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PickupSchedule',
      },
    ],
    ratings: {
      averageRating: {
        type: Number,
        default: 0,
      },
      totalRatings: {
        type: Number,
        default: 0,
      },
    },
  },
  { timestamps: true }
);

ScrapCollectorSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

ScrapCollectorSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const ScrapCollector = mongoose.model('ScrapCollector', ScrapCollectorSchema);
export default ScrapCollector;
