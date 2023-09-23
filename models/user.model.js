/* <!-- // RMIT University Vietnam
// Course: COSC2430 Web Programming
// Semester: 2023B
// Assessment: Full-stack Web Application
// Author: Team Eight
// Acknowledgement: Google , Stackoverflow, w3schools --> */

const mongoose = require("mongoose");
const { Schema } = mongoose;

const User = mongoose.model(
  "User",
  new Schema({
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: 8,
      maxlength: 15,
      match: /^[a-zA-Z0-9]+$/, // Only letters (lower and upper case) and digits
    },
    passwordHash: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      minlength: 5,
    },
    address: {
      type: String,
      minlength: 5,
    },
    avatar: String,
    businessName: {
      type: String,
      minlength: 5,
    },
    businessAddress: { type: String, minlength: 5 },
    distributionHub: String,
    role: {
      type: String,
      enum: ["customer", "vendor", "shipper"],
      default: "customer",
    },
  }),
);

module.exports = User;
