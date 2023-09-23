/* <!-- // RMIT University Vietnam
// Course: COSC2430 Web Programming
// Semester: 2023B
// Assessment: Full-stack Web Application
// Author: Team Eight
// Acknowledgement: Google , Stackoverflow, w3schools --> */

const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    products: Array,
    total: Number,
    address: String,
    status: {
        type: String,
        enum: ['active', 'delivered', 'canceled'],
        default: 'active'
    },
    distributionHub: String
});

module.exports = mongoose.model('Order', orderSchema);
