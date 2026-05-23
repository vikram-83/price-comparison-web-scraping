const express = require('express');
const { readJsonFile, writeJsonFile } = require('../utils/storage');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/profile', auth, async (req, res) => {
    const user = req.user;
    res.json({
        id: user.id,
        name: user.name,
        email: user.email,
        profileImage: user.profileImage,
        wishlist: user.wishlist || [],
        recentViews: user.recentViews || [],
        alerts: user.alerts || []
    });
});

router.get('/wishlist', auth, async (req, res) => {
    res.json({ wishlist: req.user.wishlist || [] });
});

router.post('/wishlist', auth, async (req, res) => {
    const product = req.body.product;
    if (!product || !product.productId) {
        return res.status(400).json({ error: 'Product object is required' });
    }

    const store = await readJsonFile('users.json') || { users: [] };
    const userIndex = store.users.findIndex(u => u.id === req.user.id);
    if (userIndex === -1) {
        return res.status(404).json({ error: 'User not found' });
    }

    const wishlist = store.users[userIndex].wishlist || [];
    if (!wishlist.find(item => item.productId === product.productId)) {
        wishlist.unshift(product);
        store.users[userIndex].wishlist = wishlist.slice(0, 30);
        await writeJsonFile('users.json', store);
    }

    res.json({ wishlist: store.users[userIndex].wishlist });
});

router.delete('/wishlist/:productId', auth, async (req, res) => {
    const productId = req.params.productId;
    const store = await readJsonFile('users.json') || { users: [] };
    const userIndex = store.users.findIndex(u => u.id === req.user.id);
    if (userIndex === -1) {
        return res.status(404).json({ error: 'User not found' });
    }

    store.users[userIndex].wishlist = (store.users[userIndex].wishlist || []).filter(item => item.productId !== productId);
    await writeJsonFile('users.json', store);
    res.json({ wishlist: store.users[userIndex].wishlist });
});

router.get('/recent', auth, async (req, res) => {
    res.json({ recentViews: req.user.recentViews || [] });
});

router.post('/alerts', auth, async (req, res) => {
    const { productId, site, threshold, method } = req.body;
    if (!productId || !threshold || !method) {
        return res.status(400).json({ error: 'Product, threshold and method are required' });
    }

    const store = await readJsonFile('users.json') || { users: [] };
    const userIndex = store.users.findIndex(u => u.id === req.user.id);
    if (userIndex === -1) {
        return res.status(404).json({ error: 'User not found' });
    }

    const alerts = store.users[userIndex].alerts || [];
    alerts.unshift({ productId, site, threshold, method, createdAt: new Date().toISOString() });
    store.users[userIndex].alerts = alerts.slice(0, 20);
    await writeJsonFile('users.json', store);

    res.json({ alerts: store.users[userIndex].alerts });
});

module.exports = router;