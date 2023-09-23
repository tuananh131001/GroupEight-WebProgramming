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
