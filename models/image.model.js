/* <!-- // RMIT University Vietnam
// Course: COSC2430 Web Programming
// Semester: 2023B
// Assessment: Full-stack Web Application
// Author: Team Eight
// Acknowledgement: Google , Stackoverflow, w3schools --> */

const mongoose = require('mongoose');
const { Schema } = mongoose;
const imageSchema = mongoose.model(
    "imageSchema",
    new Schema({
  file: {
    type: Buffer
  }
})
);

module.exports = imageSchema;