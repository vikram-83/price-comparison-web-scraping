const jwt = require('jsonwebtoken');
const { readJsonFile } = require('../utils/storage');

const JWT_SECRET = process.env.JWT_SECRET || 'price_compare_secret';

module.exports = async (req, res, next) => {
    const header = req.headers.authorization || '';
    const token = header.replace('Bearer ', '').trim();

    if (!token) {
        return res.status(401).json({ error: 'Authentication required' });
    }

    try {
        const payload = jwt.verify(token, JWT_SECRET);
        const store = await readJsonFile('users.json');
        const user = store?.users?.find(u => u.id === payload.userId);

        if (!user) {
            return res.status(401).json({ error: 'Invalid token' });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Invalid or expired token' });
    }
};