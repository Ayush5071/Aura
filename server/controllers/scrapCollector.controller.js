import jwt from 'jsonwebtoken';
import ScrapCollector from '../models/scrapCollector.models.js';
import { setToken } from '../helper/setToken.js';

export const registerScrapCollector = async (req, res) => {
  const { name, email, password, contactNumber, areaPreference } = req.body;

  try {
    let scrapCollector = await ScrapCollector.findOne({ email });
    if (scrapCollector) {
      return res.status(400).json({ error: 'ScrapCollector exists' });
    }

    scrapCollector = new ScrapCollector({
      name,
      email,
      password,
      contactNumber,
      areaPreference
    });

    setToken(res, { id: scrapCollector._id, role: 'scrapCollector' });
    
    res.status(201).json({ msg: 'Scrapcollector registered successfully', userId: scrapCollector._id });
  } catch (error) {
    res.status(500).json({ error: 'Server error', error });
  }
};

export const loginScrapCollector = async (req, res) => {
  const { email, password } = req.body;

  try {
    const scrapCollector = await ScrapCollector.findOne({ email });
    if (!scrapCollector) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const isMatch = await scrapCollector.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    setToken(res, { id: scrapCollector._id, role: 'scrapCollector' });

    res.json({ msg: 'Logged in successfully', userId: scrapCollector._id });
  } catch (error) {
    res.status(500).json({ error: 'Server error', error });
  }
};

export const getScrapCollectorProfile = async (req, res) => {
  try {
    const scrapCollector = await ScrapCollector.findById(req.user.userId).select('-password');
    if (!scrapCollector) {
      return res.status(404).json({ error: 'Scrap collector not found' });
    }

    res.json(scrapCollector);
  } catch (error) {
    res.status(500).json({ error: 'Server error', error });
  }
};

export const logoutScrapCollector = async (req, res) => {
  try {
    res.clearCookie('token');
    res.json({ msg: 'Logged out successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error', error });
  }
};
