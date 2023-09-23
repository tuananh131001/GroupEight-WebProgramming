const mongoose = require('mongoose');

const hubSchema = new mongoose.Schema({
    name: { type: String, unique: true, required: true },
    address: { type: String, unique: true, required: true }
});

const Hub = mongoose.model('Hub', hubSchema);
module.exports = Hub;