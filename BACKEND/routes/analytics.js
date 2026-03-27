const express = require('express');
const router = express.Router();
// const { protect } = require('../middleware/authMiddleware'); // Uncomment if you have an auth middleware

router.get('/', /* protect, */ async (req, res) => {
  try {
    // MOCK DATA: Replace this section with actual MongoDB aggregations
    // Example: const quotesPerDay = await Quote.aggregate([...]);
    
    const analyticsData = {
      stats: {
        totalRevenue: 145250.50,
        conversionRate: 68.4
      },
      quotesPerDay: [
        { date: "Oct 01", quotes: 12 },
        { date: "Oct 02", quotes: 24 },
        { date: "Oct 03", quotes: 15 },
        { date: "Oct 04", quotes: 18 },
        { date: "Oct 05", quotes: 22 },
        { date: "Oct 06", quotes: 30 },
        { date: "Oct 07", quotes: 28 },
      ],
      itemDistribution: [
        { name: "Standard Rate", value: 400 },
        { name: "Premium Rate", value: 300 },
        { name: "Discounted Rate", value: 150 }
      ]
    };

    res.json(analyticsData);
  } catch (error) {
    console.error("Analytics Error:", error);
    res.status(500).json({ message: "Failed to fetch analytics data" });
  }
});

module.exports = router;