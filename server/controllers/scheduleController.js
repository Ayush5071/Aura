import PickupSchedule from "../models/pickupSchedule.models.js";
import User from "../models/user.models.js";



export const createPickupSchedule = async (req, res) => {
  const { scrapDetails, pickupDate, location } = req.body;
  console.log(req.file,"dekha ");

  // Check if the image was uploaded
  const imgUrl = req.file ? req.file.path : null;

  console.log("Received Details:", scrapDetails, pickupDate, location);
  console.log("Image URL:", imgUrl);

  if (!imgUrl) {
    return res.status(400).json({ success: false, message: "Image is required." });
  }

  try {
    const customerId = req.user.userId; // Assuming userId is attached to req.user in your auth middleware

    // Ensure that scrapDetails is an array and if it's a string, parse it into an array of objects
    let parsedScrapDetails;
    if (typeof scrapDetails === 'string') {
      // Check if scrapDetails is a valid JSON string
      try {
        parsedScrapDetails = JSON.parse(scrapDetails);
        if (!Array.isArray(parsedScrapDetails)) {
          throw new Error('scrapDetails should be an array');
        }
      } catch (error) {
        return res.status(400).json({ success: false, message: 'Invalid scrapDetails format' });
      }
    } else if (Array.isArray(scrapDetails)) {
      parsedScrapDetails = scrapDetails; // If it's already an array, use it as is
    } else {
      return res.status(400).json({ success: false, message: 'scrapDetails should be an array' });
    }

    // Create a new PickupSchedule document
    const schedule = new PickupSchedule({
      customerId,
      scrapDetails: parsedScrapDetails, // Use the correctly parsed scrapDetails
      pickupDate,
      location,
      status: 'pending',
      imgUrl,
    });

    // Save the schedule to the database
    await schedule.save();
    console.log("Pickup schedule saved");

    // Update the user with the new schedule
    const user = await User.findById(customerId);
    console.log("aya")
    user.mySchedules.push(schedule._id);
    console.log("ayaaa")
    await user.save();
    console.log("ayaaaaaaaa")


    // Respond with success
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
