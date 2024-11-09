import PickupSchedule from '../models/pickupSchedule.models.js';
import ScrapCollector from '../models/scrapCollector.models.js';

export const acceptPickupRequest = async (req, res) => {
  const { requestId } = req.params;
  const { userId } = req.user;

  try {
    const request = await PickupSchedule.findOne({ _id: requestId, status: 'pending' });
    if (!request) {
      return res.status(404).json({ success: false, error: 'Request not found or already processed' });
    }

    request.status = 'accepted';
    request.collectorId = userId;
    await request.save();

    await ScrapCollector.findByIdAndUpdate(userId, { $push: { assignedPickups: requestId } });

    res.json({ success: true, message: 'Request accepted successfully', request });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server error', message: error.message });
  }
};

export const getAcceptedRequests = async (req, res) => {
  const { userId } = req.user;

  try {
    const requests = await PickupSchedule.find({ collectorId: userId, status: 'accepted' })
      .populate('customerId', 'name contactNumber')
      .populate('collectorId', 'name contactNumber');
    res.json({ success: true, requests });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server error', message: error.message });
  }
};

export const getRequestsByStatus = async (req, res) => {
  const { status } = req.params;

  try {
    const requests = await PickupSchedule.find({ status })
      .populate('customerId', 'name contactNumber')
      .populate('collectorId', 'name contactNumber');
    res.json({ success: true, requests });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server error', message: error.message });
  }
};

export const updateRequestStatus = async (req, res) => {
  const { requestId } = req.body;
  const { status } = req.params;
  const { userId } = req.user;

  try {
    const request = await PickupSchedule.findOne({ _id: requestId, collectorId: userId });
    if (!request) {
      return res.status(404).json({ success: false, error: 'Request not found' });
    }

    request.status = status;
    await request.save();

    if (status === 'completed') {
      await ScrapCollector.findByIdAndUpdate(userId, {
        $pull: { assignedPickups: requestId },
        $push: { historyRequests: requestId },
      });
    }

    res.json({ success: true, message: 'Status updated successfully', request });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server error', message: error.message });
  }
};
