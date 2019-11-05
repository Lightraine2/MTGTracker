const mongoose = require('mongoose');

const PlayerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    wins: {
        type: String,
        required: true,
    },
    losses: {
        type: String,
        required: true,
    },
    draws: {
        type: String,
        required: true,
    }
});

module.exports = Player = mongoose.model('player', PlayerSchema);