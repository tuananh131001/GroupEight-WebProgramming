/* <!-- // RMIT University Vietnam
// Course: COSC2430 Web Programming
// Semester: 2023B
// Assessment: Full-stack Web Application
// Author: Team Eight
// Acknowledgement: Google , Stackoverflow, w3schools --> */

const dbConfig = require("../config/db.config.js");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};

db.mongoDBUrl = dbConfig.mongoDBUrl;

db.users = require("./user.model.js");
db.image = require("./image.model.js");
db.hub = require("./hub.model.js");
db.order = require("./order.model.js");


db.ROLES = ["customer", "vendor", "shipper"];

db.product = require("./product.model.js");
db.cart = require("./cart.model.js");
module.exports = db;
