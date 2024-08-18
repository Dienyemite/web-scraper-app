const mongoose = require('mongoose');

const interactionDataSchema = new mongoose.Schema({
    url: String,
    scrapedData: Object,
    userActions: Array,
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('InteractionData', interactionDataSchema);