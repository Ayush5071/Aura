import PickupSchedule from "../models/pickupSchedule.models.js";
import User from "../models/user.models.js";



export const createPickupSchedule = async (req, res) => {
  const { scrapDetails, pickupDate, location } = req.body;

  // Check if the image was uploaded
  const imageUrl = req.file ? req.file.path : null;

  console.log("Received Details:", scrapDetails, pickupDate, location);
  console.log("Image URL:", imageUrl);

  if (!imageUrl) {
    return res.status(400).json({ success: false, message: "Image is required." });
  }

  try {
    const customerId = req.user.userId; // Assuming userId is attached to req.user in your auth middleware
    const schedule = new PickupSchedule({
      customerId,
      scrapDetails,
      pickupDate,
      location,
      status: 'pending',
      imageUrl,
    });

    await schedule.save();
    console.log("Pickup schedule saved");

    // Update the user with the new schedule
    const user = await User.findById(customerId);
    user.mySchedules.push(schedule._id);
    await user.save();

    res.status(201).json({ success: true, message: 'Pickup schedule created successfully', schedule });
  } catch (error) {
    console.error('Error creating pickup schedule:', error);
    res.status(500).json({ success: false, error: 'Server error', message: error.message });
  }
};

export const getAllSchedules = async (req, res) => {
  const { userId } = req.user;

  try {
    const schedules = await PickupSchedule.find({
      $or: [{ collectorId: userId }, { customerId: userId }],
    })
      .populate('customerId', 'name contactNumber')
      .populate('collectorId', 'name contactNumber');
    
    res.json({ success: true, schedules });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server error', message: error.message });
  }
};

export const getSchedulesByStatus = async (req, res) => {
  const { status } = req.params;
  const { userId } = req.user;

  try {
    const schedules = await PickupSchedule.find({
      status,
      $or: [{ collectorId: userId }, { customerId: userId }],
    })
      .populate('customerId', 'name contactNumber')
      .populate('collectorId', 'name contactNumber');
    
    res.json({ success: true, schedules });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server error', message: error.message });
  }
};
