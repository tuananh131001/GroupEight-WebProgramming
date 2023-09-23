/* <!-- // RMIT University Vietnam
// Course: COSC2430 Web Programming
// Semester: 2023B
// Assessment: Full-stack Web Application
// Author: Team Eight
// Acknowledgement: Google , Stackoverflow, w3schools --> */

const mongoose = require('mongoose');

const hubSchema = new mongoose.Schema({
    name: { type: String, unique: true, required: true },
    address: { type: String, unique: true, required: true }
});

const Hub = mongoose.model('Hub', hubSchema);
module.exports = Hub;