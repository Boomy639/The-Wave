const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// In-memory "database" for demo purposes
const users = [];

// Sign up endpoint
app.post('/api/signup', (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ message: 'All fields are required.' });
    }
    // Check if user already exists
    if (users.find(u => u.email === email)) {
        return res.status(409).json({ message: 'Email already registered.' });
    }
    users.push({ username, email, password }); // In real app, hash password!
    res.json({ message: 'Sign up successful!' });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});