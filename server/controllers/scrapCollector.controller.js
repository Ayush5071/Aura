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

  console.log(email);

  try {
    const scrapCollector = await ScrapCollector.findOne({ email });
    if (!scrapCollector) {
      return res.status(400).json({ success: false, error: 'Invalid credentials' });
    }
    console.log("ayaaa");

    const isMatch = await scrapCollector.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ success: false, error: 'Invalid credentials' });
    }
    console.log("a");

    const { _id } = scrapCollector;

    setToken(res, { _id, role: "scrapCollector" });

    console.log("yha tk aya");

    res.status(200).json({ success: true, message: 'Logged in successfully', userId: _id });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server error', message: error.message });
  }
};

export const getScrapCollectorProfile = async (req, res) => {
  try {
    const scrapCollector = await ScrapCollector.findOne({ username: req.user.username })
      .select('-password') // Exclude password
      .populate('assignedPickups') 
      .populate('historyRequests');

    if (!scrapCollector) {
      return res.status(404).json({ success: false, error: 'Scrap collector not found' });
    }


    console.log(scrapCollector,"ye epopular hai")

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


export const updateScrapCollectorProfile = async (req, res) => {
  try {
    const scrapCollectorId = req.user._id;
    const scrapCollector = await ScrapCollector.findById(scrapCollectorId);

    if (!scrapCollector) {
      return res.status(404).json({ message: "Scrap collector not found" });
    }

    let image = scrapCollector.image;
    if (req.file) {
      image = req.file.path;
    }

    const updatedData = {
      name: req.body.name || scrapCollector.name,
      contactNumber: req.body.contactNumber || scrapCollector.contactNumber,
      areaPreference: req.body.areaPreference || scrapCollector.areaPreference,
      image: image,
    };

    scrapCollector.name = updatedData.name;
    scrapCollector.contactNumber = updatedData.contactNumber;
    scrapCollector.areaPreference = updatedData.areaPreference;
    scrapCollector.image = updatedData.image;

    await scrapCollector.save();

    res.status(200).json({
      message: "Profile updated successfully",
      scrapCollector,
    });
  } catch (error) {
    console.error("Failed to update profile:", error);
    res.status(500).json({
      message: "Failed to update profile",
      error: error.message,
    });
  }
};

