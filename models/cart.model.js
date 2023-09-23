const mongoose = require('mongoose');
const { Schema } = mongoose;

const cartSchema = mongoose.model(
    "cartSchema",
    new Schema({
        name: {
            type: String,
            required: true,
            minlength: 10,
            maxlength: 20,
          },
          price: {
            type: Number,
            required: true,
            min: 0,
          },
          image: {
            type: String,
          },
          quantity: {
            type: String,
          },
          customer: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
          },
    })
);

module.exports = cartSchema;