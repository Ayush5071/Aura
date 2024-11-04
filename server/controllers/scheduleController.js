import PickupSchedule from "../models/pickupSchedule.models";

export const createPickupSchedule = async (req, res) => {
  const { customerId, scrapDetails, pickupDate, location } = req.body;

  try {
    const schedule = new PickupSchedule({
      customerId,
      scrapDetails,
      pickupDate,
      location,
      status: 'pending',
    });

    await schedule.save();
    res.status(201).json({ msg: 'Pickup schedule created successfully', schedule });
  } catch (error) {
    res.status(500).json({ error: 'Server error', error });
  }
};

export const getAllSchedules = async (req, res) => {
  try {
    const schedules = await PickupSchedule.find().populate('customerId', 'name contactNumber').populate('collectorId', 'name contactNumber');
    res.json(schedules);
  } catch (error) {
    res.status(500).json({ error: 'Server error', error });
  }
};

export const getSchedulesByStatus = async (req, res) => {
  const { status } = req.params;
  
  try {
    const schedules = await PickupSchedule.find({ status }).populate('customerId', 'name contactNumber').populate('collectorId', 'name contactNumber');
    res.json(schedules);
  } catch (error) {
    res.status(500).json({ error: 'Server error', error });
  }
};
