// models/scrapPrice.models.js
import mongoose from 'mongoose';

const ScrapPriceSchema = new mongoose.Schema({
  type: { type: String, required: true, unique: true },
  pricePerKg: { type: Number, required: true }
});

const ScrapPrice = mongoose.model('ScrapPrice', ScrapPriceSchema);
export default ScrapPrice;
