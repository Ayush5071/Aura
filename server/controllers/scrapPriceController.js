import ScrapPrice from '../models/scrapPrice.models.js';

export const setScrapPrice = async (req, res) => {
  const { type, pricePerKg } = req.body;

  try {
    let scrapPrice = await ScrapPrice.findOne({ type });

    if (scrapPrice) {
      scrapPrice.pricePerKg = pricePerKg;
      await scrapPrice.save();
    } else {
      scrapPrice = new ScrapPrice({ type, pricePerKg });
      await scrapPrice.save();
    }

    res.status(200).json({ message: 'Scrap price set successfully', scrapPrice });
  } catch (error) {
    res.status(500).json({ error: 'Server error', details: error });
  }
};

export const getScrapPrices = async (req, res) => {
  try {
    const scrapPrices = await ScrapPrice.find();
    res.status(200).json(scrapPrices);
  } catch (error) {
    res.status(500).json({ error: 'Server error', details: error });
  }
};
