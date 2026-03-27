const express = require('express');
const router = express.Router();
const Quotation = require('../models/Quotation');
const { protect } = require('../middleware/authMiddleware'); // Assuming this middleware exists and attaches user to req

/**
 * @desc    Save a new quotation
 * @route   POST /api/quotations
 * @access  Private
 */
router.post('/', protect, async (req, res) => {
  try {
    const { items, grandTotal, discount } = req.body;

    if (!items || items.length === 0 || grandTotal === undefined) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const quotation = new Quotation({
      userId: req.user.id,
      items,
      grandTotal,
      discount,
    });

    const savedQuotation = await quotation.save();
    res.status(201).json(savedQuotation);
  } catch (error) {
    console.error('Error saving quotation:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

/**
 * @desc    Get user's saved quotations (or all for admin)
 * @route   GET /api/quotations
 * @access  Private
 */
router.get('/', protect, async (req, res) => {
  try {
    const query = req.user.role === 'admin' ? {} : { userId: req.user.id };
    const quotations = await Quotation.find(query).sort({ createdAt: -1 });
    res.json(quotations);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

/**
 * @desc    Delete a quotation
 * @route   DELETE /api/quotations/:id
 * @access  Private
 */
router.delete('/:id', protect, async (req, res) => {
  try {
    const quotation = await Quotation.findById(req.params.id);

    if (!quotation) return res.status(404).json({ message: 'Quotation not found' });

    if (quotation.userId.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await quotation.deleteOne();
    res.json({ message: 'Quotation removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;