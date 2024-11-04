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

    await scrapCollector.save();

     const {_id} = scrapCollector;

    setToken(res,{_id,role:"scrapCollector"});

    res.status(201).json({ msg: 'Scrapcollector registered successfully', userId: scrapCollector._id });
  } catch (error) {
    res.status(500).json({ error: 'Server error', error });
  }
};

export const loginScrapCollector = async (req, res) => {
  const { email, password } = req.body;
//   console.log("login -- ",email)

  try {
    const scrapCollector = await ScrapCollector.findOne({ email });
    console.log("login --",scrapCollector);
    if (!scrapCollector) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    
    console.log("yaha tk shi h");

    const isMatch = await scrapCollector.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const {_id} = scrapCollector;

    console.log("id check -->",_id);

    setToken(res,{_id,role:"scrapCollector"});

    res.json({ msg: 'Logged in successfully', userId: scrapCollector._id });
  } catch (error) {
    res.status(500).json({ error: 'Server error', error });
  }
};

export const getScrapCollectorProfile = async (req, res) => {
  try {
    const scrapCollector = await ScrapCollector.findOne({ username: req.user.username }).select('-password');
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
