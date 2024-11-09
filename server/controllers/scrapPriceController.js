import ScrapPrice from "../models/scrapPrice.models.js";

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

    res.status(200).json({ success: true, message: 'Scrap price set successfully', scrapPrice });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server error', message: error.message });
  }
};

export const getScrapPrices = async (req, res) => {
  try {
    const scrapPrices = await ScrapPrice.find();
    res.status(200).json({ success: true, scrapPrices });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server error', message: error.message });
  }
};
