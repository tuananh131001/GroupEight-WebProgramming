const mongoose = require('mongoose');
const { Schema } = mongoose;
// Define a Mongoose schema for the product
const productSchema = mongoose.model(
    "productSchema",
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
    data: Buffer, // Store binary data of the image
    contentType: String, // Store the content type (e.g., 'image/jpeg', 'image/png')
    // filename: String,
  },
  description: {
    type: String,
    maxlength: 500,
  },
})
);

module.exports = productSchema;