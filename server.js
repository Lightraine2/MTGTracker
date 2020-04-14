const express = require('express');
const connectDB = require('./config/db');

const app = express();
// Connect DB
connectDB();

// Init Middleware

app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('App Running'));

// Define Routes

app.use('/api/players', require('./routes/api/players'));
app.use('/api/scores', require('./routes/api/scores'));
app.use('/api/auth', require('./routes/api/auth'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
