import ScrapCollector from '../models/scrapCollector.models.js';
import { setToken } from '../helper/setToken.js';

export const registerScrapCollector = async (req, res) => {
  const { name, email, password, contactNumber, areaPreference } = req.body;

  try {
    let scrapCollector = await ScrapCollector.findOne({ email });
    if (scrapCollector) {
      return res.status(400).json({ success: false, error: 'ScrapCollector already exists' });
    }

    scrapCollector = new ScrapCollector({
      name,
      email,
      password,
      contactNumber,
      areaPreference
    });

    await scrapCollector.save();

    const { _id } = scrapCollector;

    setToken(res, { _id, role: "scrapCollector" });

    res.status(201).json({ success: true, message: 'Scrap collector registered successfully', userId: _id });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server error', message: error.message });
  }
};

export const loginScrapCollector = async (req, res) => {
  const { email, password } = req.body;

  try {
    const scrapCollector = await ScrapCollector.findOne({ email });
    if (!scrapCollector) {
      return res.status(400).json({ success: false, error: 'Invalid credentials' });
    }

    const isMatch = await scrapCollector.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ success: false, error: 'Invalid credentials' });
    }

    const { _id } = scrapCollector;

    setToken(res, { _id, role: "scrapCollector" });

    res.json({ success: true, message: 'Logged in successfully', userId: _id });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server error', message: error.message });
  }
};

export const getScrapCollectorProfile = async (req, res) => {
  try {
    const scrapCollector = await ScrapCollector.findOne({ username: req.user.username }).select('-password');
    if (!scrapCollector) {
      return res.status(404).json({ success: false, error: 'Scrap collector not found' });
    }

    res.json({ success: true, scrapCollector });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server error', message: error.message });
  }
};

export const logoutScrapCollector = async (req, res) => {
  try {
    res.clearCookie('token');
    res.json({ success: true, message: 'Logged out successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server error', message: error.message });
  }
};
