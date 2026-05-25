const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors({
    origin: 'https://aapka-frontend-vercel-url.vercel.app', // <-- Yahan apna asli Vercel URL daalein
    credentials: true
}));
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', '..', 'frontend')));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/user', require('./routes/user'));
app.use('/api/products', require('./routes/products'));
app.use('/api/search', require('./routes/search'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'frontend', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
