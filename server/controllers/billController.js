
import Bill from '../models/bill.models.js';
import PickupSchedule from '../models/pickupSchedule.models.js';
import ScrapPrice from '../models/scrapPrice.models.js';


export const createBill = async (req, res) => {
  const { requestId } = req.body;
  const { userId } = req.user;
  console.log("yha ya ")

  try {
    const request = await PickupSchedule.findById(requestId).populate('customerId');
    console.log(request);
    if (!request || request.status !== 'completed') {
      return res.status(404).json({ error: 'Request not found or not completed' });
    }

    const scrapDetails = await Promise.all(request.scrapDetails.map(async (scrap) => {
      const scrapPrice = await ScrapPrice.findOne({ type: scrap.type });
      const amount = scrap.weight * scrapPrice.pricePerKg;

      return {
        ...scrap,
        pricePerKg: scrapPrice.pricePerKg,
        amount,
      };
    }));
    console.log("yooooooooo")

    const totalAmount = scrapDetails.reduce((sum, item) => sum + item.amount, 0);

    const bill = new Bill({
      customerId: request.customerId,
      collectorId: request.collectorId,
      totalAmount,
      scrapDetails,
    });

    await bill.save();
    res.status(201).json({ message: 'Bill created successfully', bill });
  } catch (error) {
    res.status(500).json({ error: 'Server error', error });
  }
};

export const getBillById = async (req, res) => {
  const { id } = req.params;

  try {
    const bill = await Bill.findById(id).populate('customerId').populate('collectorId');
    if (!bill) {
      return res.status(404).json({ error: 'Bill not found' });
    }
    res.json(bill);
  } catch (error) {
    res.status(500).json({ error: 'Server error', error });
  }
};

export const getAllBills = async (req, res) => {
  try {
    const bills = await Bill.find().populate('customerId').populate('collectorId');
    res.json(bills);
  } catch (error) {
    res.status(500).json({ error: 'Server error', error });
  }
};

export const getBillsByCustomerId = async (req, res) => {
  const { userId } = req.user;

  try {
    const bills = await Bill.find({ customerId:userId }).populate('customerId').populate('collectorId');
    res.json(bills);
  } catch (error) {
    res.status(500).json({ error: 'Server error', error });
  }
};

export const getBillsByCollectorId = async (req, res) => {
  const { userId } = req.user;

  try {
    const bills = await Bill.find({ collectorId:userId }).populate('customerId').populate('collectorId');
    res.json(bills);
  } catch (error) {
    res.status(500).json({ error: 'Server error', error });
  }
};
