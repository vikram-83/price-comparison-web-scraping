const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:3001', 'http://127.0.0.1:3000'],
    credentials: true
}));
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', '..', 'frontend')));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/user', require('./routes/user'));
app.use('/api/products', require('./routes/products'));
app.use('/api/search', require('./routes/search'));

// Serve login page by default
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'frontend', 'login.html'));
});

// Serve any HTML file directly
app.get('/:page.html', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'frontend', `${req.params.page}.html`));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📱 Open http://localhost:${PORT} in your browser`);
    console.log(`\n📝 Test Credentials:`);
    console.log(`   Email: vikramchaudhari834@gmail.com`);
    console.log(`   Password: vikram.81`);
});
