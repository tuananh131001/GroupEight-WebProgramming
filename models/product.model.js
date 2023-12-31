/* <!-- // RMIT University Vietnam
// Course: COSC2430 Web Programming
// Semester: 2023B
// Assessment: Full-stack Web Application
// Author: Team Eight
// Acknowledgement: Google , Stackoverflow, w3schools --> */

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
    type: String,
  },
  description: {
    type: String,
    maxlength: 500,
  },
  vendor: {
    type: Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model 
    required: true,
  },
})
);

module.exports = productSchema;