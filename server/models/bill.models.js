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
  scrapDetails: [
    {
      type: {
        type: String,
        required: true,
      },
      weight: {
        type: Number,
        required: true,
      },
      pricePerKg: {
        type: Number,
        required: true,
      },
      amount: {
        type: Number,
        required: true,
      },
    },
  ],
  totalAmount: {
    type: Number,
    required: true,
  },
  transactionDate: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

BillSchema.methods.calculateTotalAmount = function () {
  return this.scrapDetails.reduce((total, item) => total + item.amount, 0);
};

BillSchema.methods.generateBreakdown = function () {
  return this.scrapDetails.map(item => ({
    description: `${item.type}: ${item.pricePerKg} * ${item.weight}kg = ${item.amount}`,
    ...item,
  }));
};

BillSchema.pre('save', function (next) {
  if (this.isModified('scrapDetails')) {
    this.totalAmount = this.calculateTotalAmount();
  }
  next();
});

const Bill = mongoose.model('Bill', BillSchema);

export default Bill;
