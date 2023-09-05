const dbConfig = require("../config/db.config.js");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};

db.mongoDBUrl = dbConfig.mongoDBUrl;

db.users = require("./user.model.js");

db.ROLES = ["customer", "vendor", "shipper"];

db.product = require("./product.model.js")

module.exports = db;