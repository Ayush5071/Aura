import mongoose from 'mongoose';

const BillSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  collectorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ScrapCollector',
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  scrapDetails: [{
    weight: { type: Number, required: true },
    type: { type: String, required: true }, 
  }],
  transactionDate: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

const Bill = mongoose.model('Bill', BillSchema);
export default Bill;
