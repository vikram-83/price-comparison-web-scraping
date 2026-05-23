const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const { readJsonFile, writeJsonFile } = require('../utils/storage');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'price_compare_secret';

function createToken(user) {
    return jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });
}

router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ error: 'Name, email and password are required' });
    }

    const store = await readJsonFile('users.json') || { users: [] };
    const existing = store.users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
        return res.status(409).json({ error: 'Email already registered' });
    }

    const hashed = bcrypt.hashSync(password, 10);
    const user = {
        id: uuidv4(),
        name,
        email,
        passwordHash: hashed,
        googleId: null,
        wishlist: [],
        recentViews: [],
        alerts: [],
        createdAt: new Date().toISOString(),
        profileImage: '/assets/avatar.svg'
    };

    store.users.push(user);
    await writeJsonFile('users.json', store);

    const token = createToken(user);
    res.json({ token, user: { id: user.id, name: user.name, email: user.email, profileImage: user.profileImage } });
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    const store = await readJsonFile('users.json') || { users: [] };
    const user = store.users.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (!user || !bcrypt.compareSync(password, user.passwordHash)) {
        return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = createToken(user);
    res.json({ token, user: { id: user.id, name: user.name, email: user.email, profileImage: user.profileImage } });
});

router.get('/google', async (req, res) => {
    const googleUser = {
        id: uuidv4(),
        name: 'Google User',
        email: 'google.user@example.com',
        profileImage: '/assets/avatar.svg'
    };

    const store = await readJsonFile('users.json') || { users: [] };
    let user = store.users.find(u => u.email === googleUser.email);
    if (!user) {
        user = {
            ...googleUser,
            passwordHash: null,
            googleId: googleUser.id,
            wishlist: [],
            recentViews: [],
            alerts: [],
            createdAt: new Date().toISOString()
        };
        store.users.push(user);
        await writeJsonFile('users.json', store);
    }

    const token = createToken(user);
    res.json({ token, user: { id: user.id, name: user.name, email: user.email, profileImage: user.profileImage } });
});

module.exports = router;