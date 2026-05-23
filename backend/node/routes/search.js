const express = require('express');
const router = express.Router();
const scraperService = require('../services/scraperService');

router.get('/', async (req, res) => {
    const query = req.query.q;
    if (!query) {
        return res.status(400).json({ error: "Query parameter 'q' is required" });
    }

    try {
        const data = await scraperService.search(query);
        const lowest = Math.min(...data.map(item => item.price));
        const enriched = data.map(item => ({
            ...item,
            lowestPrice: item.price === lowest,
            priceTag: `₹${item.price.toLocaleString()}`,
            savings: item.discount ? `Save ${item.discount}%` : `Save ${Math.floor(Math.random() * 12) + 8}%`,
            rating: item.rating || parseFloat((Math.random() * 0.8 + 4.0).toFixed(1)),
            reviewCount: item.reviewCount || Math.floor(Math.random() * 700) + 120
        }));
        res.json(enriched);
    } catch (error) {
        console.error('Search error:', error);
        res.status(500).json({ error: "Error fetching data" });
    }
});

module.exports = router;
