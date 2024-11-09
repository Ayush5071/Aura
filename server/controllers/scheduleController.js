import PickupSchedule from "../models/pickupSchedule.models.js";
import User from "../models/user.models.js";

export const createPickupSchedule = async (req, res) => {
  const { scrapDetails, pickupDate, location } = req.body;

  try {
    const customerId = req.user.userId;
    const schedule = new PickupSchedule({
      customerId,
      scrapDetails,
      pickupDate,
      location,
      status: 'pending',
    });

    await schedule.save();

    const user = await User.findById(customerId);
    user.mySchedules.push(schedule._id);
    await user.save();

    res.status(201).json({ success: true, message: 'Pickup schedule created successfully', schedule });
  } catch (error) {
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
