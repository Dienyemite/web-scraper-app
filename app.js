require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
// const PORT = process.env.PORT || 3000;
const PORT = 3000;

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/')
    .then(() => {
        console.log('MongoDB connected');
    })
    .catch((err) => {
        console.error('Connection error:', err);
    });
// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Routes
const indexRouter = require('./routes/index');
app.use('/', indexRouter);

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});