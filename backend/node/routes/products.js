const express = require('express');
const fs = require('fs/promises');
const path = require('path');
const { readJsonFile, writeJsonFile } = require('../utils/storage');
const auth = require('../middleware/auth');

const router = express.Router();

const sentimentWords = {
    positive: ['excellent', 'fast', 'smooth', 'awesome', 'great', 'perfect', 'love', 'best', 'fantastic', 'reliable'],
    negative: ['bad', 'slow', 'poor', 'disappointed', 'horrible', 'fake', 'expensive', 'flawed', 'cheap', 'lag']
};

function analyzeSentiment(text) {
    const normalized = text.toLowerCase();
    let score = 0;
    sentimentWords.positive.forEach(word => { if (normalized.includes(word)) score += 1; });
    sentimentWords.negative.forEach(word => { if (normalized.includes(word)) score -= 1; });
    if (score >= 1) return 'Positive';
    if (score <= -1) return 'Negative';
    return 'Neutral';
}

function detectFakeReview(text) {
    const lower = text.toLowerCase();
    if (lower.split(' ').filter((w, i, arr) => arr.indexOf(w) !== i).length > 2) return true;
    return [ 'best ever', 'worth every penny', 'amazing product', 'five stars', 'must buy' ].some(phrase => lower.includes(phrase));
}

router.get('/recommendations', async (req, res) => {
    const budget = parseInt(req.query.budget || '50000', 10);
    const suggestions = [
        {
            title: `Best laptop under ₹${budget.toLocaleString()}`,
            description: `AI recommends top value laptops with fast processors, 8GB RAM, and at least 256GB SSD storage — all matched to your budget.`,
            callouts: ['Smart price alert', 'Fast delivery options', '4.5+ rating products'],
            action: 'Search now'
        }
    ];
    res.json({ recommendations: suggestions });
});

router.get('/reviews/:productId', async (req, res) => {
    const productId = req.params.productId;
    const store = await readJsonFile('reviews.json') || { reviews: [] };
    let reviews = store.reviews.filter(review => review.productId === productId);
    if (!reviews.length) {
        reviews = [
            { author: 'Ananya', rating: 5, comment: 'Excellent build quality and battery life.', date: '2026-04-20' },
            { author: 'Rahul', rating: 4, comment: 'Fast performance, good purchase for the price.', date: '2026-04-22' },
            { author: 'Sneha', rating: 3, comment: 'Nice display but heating under heavy load.', date: '2026-04-24' }
        ];
    }

    const enhanced = reviews.map(review => ({
        ...review,
        sentiment: analyzeSentiment(review.comment),
        fake: detectFakeReview(review.comment)
    }));
    res.json({ productId, reviews: enhanced });
});

router.post('/reviews', auth, async (req, res) => {
    const { productId, rating, comment } = req.body;
    if (!productId || !rating || !comment) {
        return res.status(400).json({ error: 'productId, rating and comment are required' });
    }

    const store = await readJsonFile('reviews.json') || { reviews: [] };
    const review = {
        productId,
        author: req.user.name,
        rating: Number(rating),
        comment,
        date: new Date().toISOString().split('T')[0]
    };

    store.reviews.unshift(review);
    await writeJsonFile('reviews.json', store);

    res.json({ review: { ...review, sentiment: analyzeSentiment(comment), fake: detectFakeReview(comment) } });
});

router.get('/history/:productId', async (req, res) => {
    res.json({ productId: req.params.productId, history: [] });
});

module.exports = router;