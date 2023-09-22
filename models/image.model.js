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