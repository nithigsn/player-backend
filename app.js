const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const playerRouter = require('./player-routes');

const app = express();

// MongoDB URI
const URI = 'mongodb+srv://nithishgsn000:0SCO5YqWOZ8rUL61@soniquewave.wgzuexb.mongodb.net/?retryWrites=true&w=majority&appName=SoniqueWave';

// Connect to MongoDB
mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB is connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.json());

// Router
app.use('/player', playerRouter);

// Health check endpoint
app.get('/all', (req, res) => {
    res.json({ msg: 'working' });
});

// Handle 404 errors
app.use((req, res, next) => {
    res.status(404).json({ error: 'Not Found' });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Export the app
module.exports = app;
