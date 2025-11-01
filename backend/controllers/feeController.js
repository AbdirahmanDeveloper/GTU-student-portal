import { getFeesByRegNumber } from '../models/feeModel.js';

export const getFees = async (req, res) => {
  try {
    const { reg_number } = req.params;
    const fees = await getFeesByRegNumber(reg_number);

    if (!fees || fees.length === 0) {
      return res.status(404).json({ message: 'No fee records found for this student.' });
    }

    res.status(200).json({
      message: 'Fees retrieved successfully.',
      fees,
    });
  } catch (error) {
    console.error('❌ Error fetching fees:', error);
    res.status(500).json({ message: 'Server error fetching fees.' });
  }
};
